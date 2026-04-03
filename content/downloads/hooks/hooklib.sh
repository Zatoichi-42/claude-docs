#!/usr/bin/env bash

set -euo pipefail

STATE_DIR="${CLAUDE_HOOK_STATE_DIR:-.claude/state}"
STATE_FILE="${CLAUDE_HOOK_STATE_FILE:-$STATE_DIR/advanced-hook-state.json}"
RED_TTL_SECONDS="${CLAUDE_RED_TTL_SECONDS:-1200}"

ensure_state_dir() {
  mkdir -p "$STATE_DIR"
}

ensure_state_file() {
  ensure_state_dir
  if [[ ! -f "$STATE_FILE" ]]; then
    cat >"$STATE_FILE" <<'EOF'
{
  "created_at": 0,
  "last_red_at": 0,
  "last_green_at": 0,
  "last_source_edit_at": 0,
  "last_source_edit_path": "",
  "last_test_command": "",
  "last_test_status": "",
  "recent_edits": []
}
EOF
  fi
}

now_ts() {
  date +%s
}

read_hook_input() {
  HOOK_INPUT="$(cat)"
}

hook_json_get() {
  local query="$1"
  printf '%s' "${HOOK_INPUT:-{}}" | jq -r "$query // empty" 2>/dev/null || true
}

state_json_get() {
  local query="$1"
  ensure_state_file
  jq -r "$query // empty" "$STATE_FILE"
}

update_state() {
  ensure_state_file
  local tmp
  tmp="$(mktemp)"
  jq "$@" "$STATE_FILE" >"$tmp"
  mv "$tmp" "$STATE_FILE"
}

tool_name() {
  hook_json_get '.tool_name'
}

hook_event_name() {
  hook_json_get '.hook_event_name'
}

file_path() {
  local path_value
  path_value="$(hook_json_get '.tool_input.file_path')"
  if [[ -n "$path_value" ]]; then
    printf '%s\n' "$path_value"
    return
  fi
  hook_json_get '.tool_input.path'
}

command_string() {
  hook_json_get '.tool_input.command'
}

is_source_path() {
  local path_value="${1:-}"
  local normalized
  normalized="$(printf '%s' "$path_value" | tr '\\' '/' | sed 's#^\./##')"

  [[ -n "$normalized" ]] || return 1

  if printf '%s' "$normalized" | grep -qiE '(^|/)(tests?|spec|__tests__)(/|$)|(\.test\.|\.spec\.)'; then
    return 1
  fi

  if printf '%s' "$normalized" | grep -qiE '^(docs/|\.claude/|\.github/|\.vscode/)'; then
    return 1
  fi

  if printf '%s' "$normalized" | grep -qiE '\.(md|mdx|txt|json|ya?ml|toml|lock|svg|png|jpe?g|gif|webp|ico)$'; then
    return 1
  fi

  if printf '%s' "$normalized" | grep -qiE '\.config\.(js|ts|mjs|cjs)$'; then
    return 1
  fi

  return 0
}

is_test_command() {
  local command_value="${1:-}"
  printf '%s' "$command_value" | grep -qiE '(^|[[:space:]])(pytest|pnpm[[:space:]]+test|npm[[:space:]]+test|yarn[[:space:]]+test|bun[[:space:]]+test|vitest|jest|go[[:space:]]+test|cargo[[:space:]]+test|rspec|mix[[:space:]]+test|phpunit|playwright[[:space:]]+test|cypress)\b'
}

is_dangerous_command() {
  local command_value="${1:-}"
  printf '%s' "$command_value" | grep -qiE '\b(rm[[:space:]]+-rf[[:space:]]+/|drop[[:space:]]+table|truncate[[:space:]]+table|delete[[:space:]]+from[[:space:]]+[A-Za-z0-9_]+[[:space:]]*;|format[[:space:]]+c)\b'
}

recent_red_exists() {
  ensure_state_file
  local current_ts last_red last_green age
  current_ts="$(now_ts)"
  last_red="$(state_json_get '.last_red_at')"
  last_green="$(state_json_get '.last_green_at')"

  [[ "${last_red:-0}" =~ ^[0-9]+$ ]] || last_red=0
  [[ "${last_green:-0}" =~ ^[0-9]+$ ]] || last_green=0

  if (( last_red <= last_green )); then
    return 1
  fi

  age=$(( current_ts - last_red ))
  (( age <= RED_TTL_SECONDS ))
}

record_source_edit() {
  local path_value="$1"
  local current_ts
  current_ts="$(now_ts)"
  update_state \
    --arg path "$path_value" \
    --argjson ts "$current_ts" \
    '.last_source_edit_at = $ts
     | .last_source_edit_path = $path
     | .recent_edits = ((.recent_edits + [{"path": $path, "at": $ts}]) | .[-20:])'
}

record_test_result() {
  local status="$1"
  local command_value="$2"
  local current_ts
  current_ts="$(now_ts)"

  if [[ "$status" == "red" ]]; then
    update_state \
      --arg status "$status" \
      --arg command "$command_value" \
      --argjson ts "$current_ts" \
      '.last_test_status = $status
       | .last_test_command = $command
       | .last_red_at = $ts'
    return
  fi

  update_state \
    --arg status "$status" \
    --arg command "$command_value" \
    --argjson ts "$current_ts" \
    '.last_test_status = $status
     | .last_test_command = $command
     | .last_green_at = $ts'
}

#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Allow writes to test files, docs, config, and non-source paths
if echo "$FILE_PATH" | grep -qE '(test|spec|__tests__|\.test\.|\.spec\.|\.md$|\.json$|\.yaml$|\.yml$|\.toml$|\.lock$|\.config\.)'; then
  exit 0
fi

# Allow writes under infrastructure directories
if echo "$FILE_PATH" | grep -qE '^(tests/|spec/|__tests__/|docs/|\.claude/|\.github/|\.vscode/)'; then
  exit 0
fi

# For source files: check if a RED token exists
STATE_FILE=".claude/state/test-forward.json"
if [ -f "$STATE_FILE" ]; then
  # Check freshness (10 minute TTL)
  if [ "$(uname)" = "Darwin" ]; then
    AGE=$(( $(date +%s) - $(stat -f%m "$STATE_FILE") ))
  else
    AGE=$(( $(date +%s) - $(stat -c%Y "$STATE_FILE") ))
  fi
  if [ "$AGE" -lt 600 ]; then
    exit 0
  fi
fi

echo "BLOCKED: No recent failing test found. Write and run a failing test first." >&2
echo "Run your test command and let it fail to create the RED token." >&2
exit 2

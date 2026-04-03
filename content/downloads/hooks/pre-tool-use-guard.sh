#!/usr/bin/env bash

set -euo pipefail

source .claude/hooks/hooklib.sh

read_hook_input

TOOL_NAME="$(tool_name)"

if [[ "$TOOL_NAME" == "Bash" ]]; then
  COMMAND_VALUE="$(command_string)"
  if is_dangerous_command "$COMMAND_VALUE"; then
    echo "BLOCKED: Destructive command detected: $COMMAND_VALUE" >&2
    echo "Review the command and retry with a safer, narrower alternative." >&2
    exit 2
  fi
  exit 0
fi

if [[ "$TOOL_NAME" =~ ^(Write|Edit|MultiEdit)$ ]]; then
  FILE_PATH_VALUE="$(file_path)"
  if ! is_source_path "$FILE_PATH_VALUE"; then
    exit 0
  fi

  if recent_red_exists; then
    exit 0
  fi

  echo "BLOCKED: No recent RED signal found for a non-test source edit." >&2
  echo "Write and run a failing test first, then return to implementation." >&2
  exit 2
fi

exit 0

#!/usr/bin/env bash

set -euo pipefail

source .claude/hooks/hooklib.sh

read_hook_input

TOOL_NAME="$(tool_name)"
HOOK_EVENT_NAME="$(hook_event_name)"

if [[ "$TOOL_NAME" =~ ^(Write|Edit|MultiEdit)$ ]]; then
  FILE_PATH_VALUE="$(file_path)"
  if is_source_path "$FILE_PATH_VALUE"; then
    record_source_edit "$FILE_PATH_VALUE"
  fi
  exit 0
fi

if [[ "$TOOL_NAME" == "Bash" ]]; then
  COMMAND_VALUE="$(command_string)"

  if ! is_test_command "$COMMAND_VALUE"; then
    exit 0
  fi

  if [[ "$HOOK_EVENT_NAME" == "PostToolUseFailure" ]]; then
    record_test_result "red" "$COMMAND_VALUE"
    exit 0
  fi

  if [[ "$HOOK_EVENT_NAME" == "PostToolUse" ]]; then
    record_test_result "green" "$COMMAND_VALUE"
    exit 0
  fi
fi

exit 0

#!/usr/bin/env bash

set -euo pipefail

source .claude/hooks/hooklib.sh

read_hook_input
ensure_state_file

LAST_SOURCE_EDIT_AT="$(state_json_get '.last_source_edit_at')"
LAST_GREEN_AT="$(state_json_get '.last_green_at')"
LAST_SOURCE_EDIT_PATH="$(state_json_get '.last_source_edit_path')"
LAST_TEST_COMMAND="$(state_json_get '.last_test_command')"

[[ "${LAST_SOURCE_EDIT_AT:-0}" =~ ^[0-9]+$ ]] || LAST_SOURCE_EDIT_AT=0
[[ "${LAST_GREEN_AT:-0}" =~ ^[0-9]+$ ]] || LAST_GREEN_AT=0

if (( LAST_SOURCE_EDIT_AT == 0 )); then
  exit 0
fi

if (( LAST_GREEN_AT >= LAST_SOURCE_EDIT_AT )); then
  exit 0
fi

[[ -n "$LAST_SOURCE_EDIT_PATH" ]] || LAST_SOURCE_EDIT_PATH="the last edited source file"
[[ -n "$LAST_TEST_COMMAND" ]] || LAST_TEST_COMMAND="the relevant passing test command"

jq -n \
  --arg reason "Source edits were recorded after the last passing test run. Re-run $LAST_TEST_COMMAND or another relevant passing verification before finishing. Last edited source file: $LAST_SOURCE_EDIT_PATH." \
  '{decision:"block", reason:$reason}'

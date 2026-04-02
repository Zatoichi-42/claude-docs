#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if echo "$COMMAND" | grep -qE '(deploy|publish|release|migrate)'; then
  echo '{"hookSpecificOutput":{"permissionDecision":"defer","permissionDecisionReason":"Production operation requires human approval"}}'
  exit 0
fi

exit 0

#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Block destructive patterns
if echo "$COMMAND" | grep -iE '\b(rm\s+-rf\s+/|DROP\s+TABLE|DELETE\s+FROM\s+\w+\s*;|TRUNCATE\s+TABLE|FORMAT\s+C)\b' > /dev/null; then
  echo "BLOCKED: Destructive command detected: $COMMAND" >&2
  exit 2  # Exit 2 = BLOCK. Not exit 1!
fi
exit 0

#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Skip non-source files
if echo "$FILE_PATH" | grep -qE '\.(md|json|yaml|yml|toml|lock)$'; then
  exit 0
fi

# Try to find and run related test file
BASE=$(basename "$FILE_PATH" | sed 's/\.[^.]*$//')
TEST_FILE=$(find . -name "${BASE}.test.*" -o -name "${BASE}.spec.*" -o -name "test_${BASE}.*" 2>/dev/null | head -1)

if [ -n "$TEST_FILE" ]; then
  pnpm test -- "$TEST_FILE" 2>&1 || true
fi
exit 0

#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

case "$FILE_PATH" in
  *.ts|*.tsx|*.js|*.jsx|*.json|*.css|*.html|*.md)
    npx prettier --write "$FILE_PATH" 2>/dev/null || true ;;
  *.py)
    python3 -m black "$FILE_PATH" 2>/dev/null || true ;;
  *.go)
    gofmt -w "$FILE_PATH" 2>/dev/null || true ;;
  *.rs)
    rustfmt "$FILE_PATH" 2>/dev/null || true ;;
esac
exit 0

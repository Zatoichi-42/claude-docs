#!/usr/bin/env bash

set -euo pipefail

source .claude/hooks/hooklib.sh

read_hook_input
ensure_state_file

if [[ "$(state_json_get '.created_at')" == "0" ]]; then
  update_state --argjson ts "$(now_ts)" '.created_at = $ts'
fi

#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
failed=0
log=$(mktemp "${TMPDIR:-/tmp}/classify.XXXXXX")
trap 'rm -f "$log"' EXIT

check() {
  local name=$1 expected=$2
  sed 's/^/[16:52:18.636] INFO (#1): /' > "$log"
  local actual
  actual=$(./classify.sh "$log")
  if [ "$actual" = "$expected" ]; then echo "ok   $name -> $actual"; else echo "FAIL $name -> $actual (want $expected)"; failed=1; fi
}

check none none <<'LOG'
Plan: no changes
LOG

check code-only app <<'LOG'
Plan: 1 to update
[site] update
  no declared property changes
LOG

check rebuild app <<'LOG'
Plan: 2 to update
[build] update
  no declared property changes
[site] update
  properties:
    assets:
      directory: ../dist/client
  -     hash: 1111111111111111111111111111111111111111111111111111111111111111
  +     hash: (known after apply)
LOG

check compat-flags infra <<'LOG'
Plan: 1 to update
[site] update
  properties:
    compatibility:
  -     flags:
  -       - nodejs_compat
  +     flags:
  +       - nodejs_compat
  +       - nodejs_als
LOG

check domain infra <<'LOG'
Plan: 1 to update
[site] update
  properties:
  -   domain: nourman.com
  +   domain: www.nourman.com
LOG

check new-resource infra <<'LOG'
Plan: 1 to create
[site] noop
[bucket] create
LOG

exit $failed

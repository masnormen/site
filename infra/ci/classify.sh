#!/usr/bin/env bash
# Prints "none", "app" or "infra" for an `alchemy plan --detailed` log.
# app: only the site Worker's code or assets hash and the build changed. Anything else is infra.
set -euo pipefail

sed -E 's/^\[[0-9:.]+\] [A-Z]+ \(#[0-9]+\): //' "$1" | awk '
  /^\[[^ ]+\] [a-z]+$/ {
    name = substr($1, 2, length($1) - 2); action = $2
    if (name ~ /\//) { if (action != "noop") infra = 1; next }
    if (action == "noop") { current = ""; next }
    current = name
    if (action != "update") infra = 1
    else if (name == "site" || name == "build") app = 1
    else infra = 1
    next
  }
  current != "" && /^  [-+] / && !/^  [-+] +hash: / { infra = 1 }
  END { print infra ? "infra" : app ? "app" : "none" }
'

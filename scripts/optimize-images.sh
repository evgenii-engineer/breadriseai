#!/usr/bin/env bash
#
# One-off image optimisation pass.
#
# For every photo under public/media/<project>/ we emit three WebP
# variants alongside it:
#
#   <stem>-200.webp   thumbnail (References cluster, ~80 px CSS)
#   <stem>-800.webp   default   (3D stack card, mobile gallery columns)
#   <stem>-1280.webp  large     (4-col detail gallery on retina desktop)
#
# Sources may already be WebP — cwebp re-encodes from any decodeable
# input. After regeneration the originals are deleted so the deploy
# artifact only ships the variants the UI actually references.
#
# The script is idempotent: existing variants are skipped, and files
# already named *-200/-800/-1280 are not re-processed.
#
# Requires: cwebp (brew install webp).

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MEDIA="$ROOT/public/media"

if ! command -v cwebp >/dev/null 2>&1; then
  echo "cwebp not found. Install with: brew install webp" >&2
  exit 1
fi

QUALITY=78
METHOD=6

shopt -s nullglob
for project_dir in "$MEDIA"/*/; do
  for src in "$project_dir"*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}; do
    [ -e "$src" ] || continue

    stem="$(basename "$src")"
    name="${stem%.*}"
    case "$name" in *-200|*-800|*-1280) continue;; esac

    for size in 200 800 1280; do
      out="${project_dir}${name}-${size}.webp"
      if [ -f "$out" ]; then
        continue
      fi
      cwebp -quiet -mt -q "$QUALITY" -m "$METHOD" -resize "$size" 0 "$src" -o "$out"
    done

    # Drop the original once the variants exist — the UI never serves it.
    rm -f "$src"
  done
done

echo "Done. Variants written to $MEDIA"

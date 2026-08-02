# Portfolio V3 asset output

This file records the deterministic web-asset derivatives created from the
reference material in the original V3 Codex package. The large raw references
are intentionally not committed; the optimized public assets, dimensions and
verification tests remain in the repository.

## Generation

To regenerate, first restore the package's `references/` directory at
`docs/portfolio-v3/references/`, then run from the repository root:

```powershell
node scripts/optimize-v3-assets.mjs
```

The script:

- processes the 16 reference PNG screenshots;
- writes an AVIF and WebP derivative for every project image;
- writes three purpose-cropped hero fragments in both formats;
- strips the unused opaque alpha channel and source metadata;
- uses sRGB-compatible AVIF/WebP output;
- never enlarges a source image or crop;
- validates source dimensions, crop boundaries, opacity and matching output
  dimensions before writing files;
- overwrites only its explicitly mapped AVIF/WebP targets.

Sharp `0.35.3` and libvips `8.18.3` produced the recorded files. Two
consecutive runs resulted in the same aggregate SHA-256:

```text
6a0da0c9fdf6d80f63405cc216641bba0fe527eb5d8ae36d222651e9cec0029d
```

## Raster targets

| Group | Files per format | Dimensions | AVIF quality | WebP quality |
| --- | ---: | --- | ---: | ---: |
| Adott project media | 9 | 1600×594 | 76 | 80 |
| Alba desktop project media | 3 | native, 1333–1339×740–746 | 76 | 80 |
| Alba mobile configurator | 1 | native, 351×734 | 80 | 82 |
| Sanjiwani project media | 3 | native, 1477–1485×728–735 | 76 | 80 |
| Adott hero fragment | 1 | 1200×473 | 75 | 78 |
| Alba hero fragment | 1 | 1130×746 | 75 | 78 |
| Sanjiwani hero fragment | 1 | 620×735 | 75 | 78 |

Hero source crops:

- Adott: `left 200, top 80, width 1600, height 630`, then constrained to a
  1200 px long edge;
- Alba: `left 205, top 0, width 1130, height 746`; this removes the debug
  overlay while retaining the pool and options panel;
- Sanjiwani: `left 430, top 0, width 620, height 735`; this keeps the complete
  booking form visible with limited page context.

## Output size

| Format | File count | Bytes | Approximate size |
| --- | ---: | ---: | ---: |
| AVIF | 19 | 702,574 | 686.1 KiB |
| WebP | 19 | 618,456 | 604.0 KiB |
| SVG | 3 | 8,796 | 8.6 KiB |
| Total | 41 | 1,329,826 | 1.27 MiB |

The complete AVIF and WebP raster set is 26.1% of the 5,058,930-byte source
PNG set, even though it includes both delivery formats and three additional
hero crops. A browser should receive only one negotiated format for each
rendered image.

AVIF is not uniformly smaller for text-heavy application screenshots. Both
formats remain available as required; image selection should prioritize
visual fidelity and browser negotiation rather than assuming AVIF always wins.

## Diagram assets

The following original, code-native SVG motifs contain no copied dashboard,
invented product screen or unsupported metric:

- `public/portfolio-v3/diagrams/samsung-gate-flow.svg`;
- `public/portfolio-v3/diagrams/adott-workflow.svg`;
- `public/portfolio-v3/diagrams/product-system-blueprint.svg`.

Each root SVG is marked `aria-hidden="true"` and `focusable="false"` so it can
be used as a decorative motif. When embedded through an HTML `img`, consuming
components must also use an empty `alt` value. If a diagram conveys information
in a specific context, the adjacent localized HTML copy must provide the same
meaning.

## Next.js delivery

`next.config.ts` enables AVIF first and WebP second:

```ts
images: {
  formats: ["image/avif", "image/webp"],
}
```

Portfolio components should use the Next.js image pipeline with explicit
intrinsic dimensions and a layout-specific `sizes` value. Only a genuinely
above-the-fold LCP candidate should be preloaded; the remaining project media
must stay lazy-loaded.

# Arnova design system

Source: `src/styles/globals.css` (Tailwind v4 `@theme`).

## Colors — brand (navy)

| Token | Value | Usage |
| --- | --- | --- |
| `--color-brand-50` | `#f4f6fa` | Lightest brand tint |
| `--color-brand-100` | `#e4e8f0` | Soft brand surfaces |
| `--color-brand-200` | `#cbd3e1` | Muted text on dark |
| `--color-brand-300` | `#aebbd1` | Numerals, accents on dark |
| `--color-brand-400` | `#8495b5` | Secondary brand |
| `--color-brand-500` | `#60759b` | Mid brand |
| `--color-brand-600` | `#445d86` | Focus ring, links |
| `--color-brand-700` | `#344a71` | Dark brand |
| `--color-brand-800` | `#2b3d66` | Trust bar background |
| `--color-brand-900` | `#233159` | Hero, headings, primary |

## Colors — neutral

| Token | Value | Usage |
| --- | --- | --- |
| `--color-neutral-50` | `#f9fafb` | Page canvas, section background |
| `--color-neutral-100` | `#f0f2f5` | Alt surface |
| `--color-neutral-200` | `#e6eaef` | Card borders |
| `--color-neutral-300` | `#d3d8de` | Dividers |
| `--color-neutral-400` | `#a5acb6` | Eyebrow text |
| `--color-neutral-500` | `#7b838e` | Secondary text |
| `--color-neutral-600` | `#535a65` | Body text |
| `--color-neutral-700` | `#353b46` | Default text |
| `--color-neutral-800` | `#1d222a` | Strong text |

## Colors — accent (arrow)

| Token | Value | Usage |
| --- | --- | --- |
| `--color-accent-100` | `#fff0e5` | Accent tint |
| `--color-accent-300` | `#ffd3bc` | Accent soft |
| `--color-accent-500` | `#f37021` | Orange, affirmative/identity |
| `--color-accent-700` | `#ed1c24` | Red, identity |
| `--color-action-red-start` | `#ba141a` | Arrow gradient |
| `--color-action-red-end` | `#ed1c24` | Arrow gradient |
| `--color-action-orange-start` | `#f04e23` | Arrow gradient |
| `--color-action-orange-end` | `#f37021` | Arrow gradient |
| `--color-action-yellow` | `#ffd400` | Arrow gradient |
| `--color-on-brand` | `#ffffff` | Text on dark brand |

## Typography

| Token | Value |
| --- | --- |
| `--font-sans` | `"Source Sans 3 Variable", "Source Sans 3", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` |
| `--font-serif` | `"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` |
| `--font-mono` | `"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` |

Section headings: sans semibold, `clamp(26px, 6vw, 34px)`, letter-spacing `-0.02em`, brand-900.

## Shadows

| Token | Value |
| --- | --- |
| `--shadow-brand-md` | `0 2px 8px rgba(35, 49, 89, 0.15)` |
| `--shadow-brand-lg` | `0 20px 40px -12px rgba(35, 49, 89, 0.12), 0 2px 6px rgba(35, 49, 89, 0.05)` |
| `--shadow-brand-xl` | `0 30px 60px -18px rgba(35, 49, 89, 0.35), 0 8px 24px rgba(35, 49, 89, 0.12)` |

## Motion

| Token | Value |
| --- | --- |
| `--ease-out` | `cubic-bezier(0.2, 0.8, 0.2, 1)` |

## Components

- Cards (`.arnova-card`): border neutral-200, bg neutral-50, radius 10px, hover lift.
- Sections: `py-14 md:py-[76px]`, 1280px container.
- Primary button: solid, white on brand-900 / brand-900 on white over dark.

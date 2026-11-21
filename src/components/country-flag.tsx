import type { Country } from '@/stores/country-store'

interface CountryFlagProps {
  country: Country
  /** Rendered width in px; height follows a 7:5 ratio. */
  width?: number
  className?: string
}

/**
 * Simplified inline-SVG flags. Emoji flags are not drawn on Windows (they
 * render as the letters "SV"/"GT"), so every flag in the UI goes through
 * this component. Decorative: the country name is always rendered as text
 * next to it.
 */
export function CountryFlag({ country, width = 28, className }: CountryFlagProps) {
  const w = width
  const h = Math.round((width * 5) / 7)
  const common = {
    width: w,
    height: h,
    viewBox: `0 0 ${w} ${h}`,
    'aria-hidden': true,
    focusable: false,
    className: `shrink-0 rounded-[3px] shadow-[0_0_0_1px_rgba(35,49,89,0.18)] ${className ?? ''}`,
  } as const

  if (country === 'SV') {
    // El Salvador: blue – white – blue horizontal bands.
    return (
      <svg {...common}>
        <rect width={w} height={h / 3} fill="#0f47af" />
        <rect y={h / 3} width={w} height={h / 3} fill="#fff" />
        <rect y={(h * 2) / 3} width={w} height={h / 3} fill="#0f47af" />
        <circle cx={w / 2} cy={h / 2} r={h * 0.14} fill="#f2b705" />
      </svg>
    )
  }

  // Guatemala: blue – white – blue vertical bands.
  return (
    <svg {...common}>
      <rect width={w / 3} height={h} fill="#4997d0" />
      <rect x={w / 3} width={w / 3} height={h} fill="#fff" />
      <rect x={(w * 2) / 3} width={w / 3} height={h} fill="#4997d0" />
      <circle cx={w / 2} cy={h / 2} r={h * 0.14} fill="#5a9a3b" />
    </svg>
  )
}

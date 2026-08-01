import * as sv from '@/data/sv'
import * as gt from '@/data/gt'
import { useCountryStore, type Country } from '@/stores/country-store'
import type { ContentBundle } from '@/types/content.types'

// Module-level constants — evaluated exactly once. `BUNDLES` therefore holds
// exactly two stable object references for the lifetime of the tab, so
// `useContent()` never returns a new object identity on re-render. This is
// load-bearing: downstream `useMemo`/`useEffect` dependencies on `simulator`,
// `contact`, etc. stay referentially stable and only invalidate when
// `country` actually changes.
//
// Do NOT build this object inline inside the hook (`return { hero, stats,
// ... }`) — that allocates a new object every render and breaks every
// downstream memo that depends on it.
const BUNDLES: Record<Country, ContentBundle> = {
  SV: sv.svContent,
  GT: gt.gtContent,
}

/**
 * Returns the content bundle for the currently active country.
 *
 * While `country` is `null` (pre-selection — e.g. during the blocking
 * first-visit modal, or the SSR/hydration gap in a non-SPA context), falls
 * back to SV content so rendering never blocks or throws.
 */
export function useContent(): ContentBundle {
  // Primitive selector only — an object-returning selector
  // (`(s) => ({ country: s.country })`) without `useShallow` causes an
  // infinite re-render loop in Zustand v5.
  const country = useCountryStore((state) => state.country)
  return BUNDLES[country ?? 'SV']
}

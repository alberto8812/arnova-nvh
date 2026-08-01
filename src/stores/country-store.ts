import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type Country = 'SV' | 'GT'

interface CountryState {
  country: Country | null
  isModalOpen: boolean
  isDismissable: boolean
  setCountry: (country: Country) => void
  openCountryModal: () => void
  closeCountryModal: () => void
}

function isValidCountry(value: unknown): value is Country {
  return value === 'SV' || value === 'GT'
}

export const useCountryStore = create<CountryState>()(
  persist(
    (set) => ({
      country: null,
      isModalOpen: false,
      isDismissable: false,
      setCountry: (country) => set({ country, isModalOpen: false }),
      openCountryModal: () => set({ isModalOpen: true, isDismissable: true }),
      closeCountryModal: () =>
        set((state) => (state.isDismissable ? { isModalOpen: false } : state)),
    }),
    {
      name: 'solvia-country',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ country: state.country }),
      // Hard guard against a stale/hand-edited localStorage value: anything
      // that isn't exactly 'SV' or 'GT' resolves to null, never leaking a
      // corrupt string into the runtime state.
      //
      // `localStorage` is a synchronous storage, so zustand's `persist`
      // resolves this `merge` call synchronously while the store is being
      // created (module evaluation time), before any component using
      // `useCountryStore` ever renders. That lets us decide the initial
      // "should the blocking modal be open" state right here — no
      // useEffect/layout orchestration needed downstream to force it open
      // on first visit or on a corrupt persisted value.
      merge: (persisted, current) => {
        const persistedCountry = (persisted as { country?: unknown } | undefined)?.country
        const country = isValidCountry(persistedCountry) ? persistedCountry : null
        return {
          ...current,
          country,
          isModalOpen: country === null ? true : current.isModalOpen,
          isDismissable: country === null ? false : current.isDismissable,
        }
      },
    },
  ),
)

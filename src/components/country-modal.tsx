import { useCallback } from 'react'
import { useCountryStore } from '@/stores/country-store'
import type { Country } from '@/stores/country-store'
import { CountryFlag } from '@/components/country-flag'

const COUNTRY_OPTIONS: { code: Country; label: string; currency: string }[] = [
  { code: 'SV', label: 'El Salvador', currency: 'USD · Dólar' },
  { code: 'GT', label: 'Guatemala', currency: 'GTQ · Quetzal' },
]

export function CountryModal() {
  const isModalOpen = useCountryStore((s) => s.isModalOpen)
  const isDismissable = useCountryStore((s) => s.isDismissable)
  const currentCountry = useCountryStore((s) => s.country)
  const setCountry = useCountryStore((s) => s.setCountry)
  const closeCountryModal = useCountryStore((s) => s.closeCountryModal)

  // Callback ref instead of a ref object + useEffect: React re-invokes this
  // callback with the (already-mounted) <dialog> node on every commit where
  // its identity changes — here, whenever `isModalOpen` changes — which
  // does the same "sync an imperative DOM API to state" job a useEffect
  // would, but happens inline via ref identity during commit instead of a
  // separate effect.
  const dialogRef = useCallback(
    (node: HTMLDialogElement | null) => {
      if (!node) return
      if (isModalOpen) {
        if (!node.open) node.showModal()
      } else if (node.open) {
        node.close()
      }
    },
    [isModalOpen],
  )

  return (
    <dialog
      ref={dialogRef}
      className="country-modal"
      aria-label="Selecciona tu país"
      onClose={closeCountryModal}
      onCancel={(e) => {
        // Blocking (non-dismissable) modal: Escape must not close it — the
        // dialog only closes via setCountry.
        if (!isDismissable) {
          e.preventDefault()
          return
        }
        closeCountryModal()
      }}
      onClick={(e) => {
        if (isDismissable && e.target === e.currentTarget) closeCountryModal()
      }}
    >
      <div
        className="relative bg-white flex flex-col overflow-hidden"
        style={{ borderRadius: '20px', boxShadow: 'var(--shadow-brand-xl)' }}
      >
        {isDismissable && (
          <button
            type="button"
            onClick={closeCountryModal}
            aria-label="Cerrar"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 transition-colors duration-200 hover:bg-neutral-100 hover:text-brand-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        )}

        <div className="pt-9 px-8 pb-6 text-center">
          <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-brand-50">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-brand-700">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9s1.3-6.4 3.8-9Z" />
            </svg>
          </div>
          <h2
            className="font-sans font-semibold text-brand-900"
            style={{ fontSize: '22px', letterSpacing: '-0.01em', margin: 0 }}
          >
            ¿Desde qué país nos visitas?
          </h2>
          <p className="mt-2 text-[14.5px] text-neutral-600" style={{ textWrap: 'balance' }}>
            Selecciona el país de tu ubicación para conocer más información.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 px-8 pb-8">
          {COUNTRY_OPTIONS.map((option) => {
            const isSelected = option.code === currentCountry
            return (
              <button
                key={option.code}
                type="button"
                onClick={() => setCountry(option.code)}
                className={`group relative flex-1 flex flex-col items-center gap-2.5 py-6 px-4 rounded-2xl border bg-neutral-50 text-left transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 ${
                  isSelected
                    ? 'border-accent-700 bg-white shadow-[0_0_0_1px_var(--color-accent-700)]'
                    : 'border-neutral-200 hover:border-brand-300 hover:shadow-brand-sm'
                }`}
              >
                {isSelected && (
                  <span className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent-700 text-white">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
                <CountryFlag country={option.code} width={48} className="rounded" />
                <span className="font-sans font-semibold text-[15px] text-brand-900 text-center">
                  {option.label}
                </span>
                <span className="font-sans text-[13px] font-medium text-neutral-600 tracking-wide text-center">
                  {option.currency}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </dialog>
  )
}

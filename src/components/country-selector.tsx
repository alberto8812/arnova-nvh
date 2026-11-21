import { useEffect, useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { EASE } from '@/components/motion'
import { CountryFlag } from '@/components/country-flag'
import { useCountryStore } from '@/stores/country-store'
import type { Country } from '@/stores/country-store'

const OPTIONS: { code: Country; name: string; currency: string }[] = [
  { code: 'SV', name: 'El Salvador', currency: 'USD · Dólar' },
  { code: 'GT', name: 'Guatemala', currency: 'GTQ · Quetzal' },
]

/**
 * Navbar "País · SV" button with a dropdown listing both countries.
 * Renders nothing until a country is chosen (the blocking first-visit modal
 * covers that gap).
 */
export function CountrySelector() {
  const country = useCountryStore((s) => s.country)
  const setCountry = useCountryStore((s) => s.setCountry)
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const menuId = useId()

  // Focus the current country's item whenever the menu opens.
  useEffect(() => {
    if (!open) return
    const checked = itemRefs.current.find((el) => el?.getAttribute('aria-checked') === 'true')
    ;(checked ?? itemRefs.current[0])?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  if (!country) return null

  const currentName = OPTIONS.find((o) => o.code === country)?.name ?? country

  const close = (returnFocus: boolean) => {
    setOpen(false)
    if (returnFocus) buttonRef.current?.focus()
  }

  const select = (code: Country) => {
    setCountry(code)
    close(true)
  }

  const onButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setOpen(true)
    }
  }

  const onMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const focused = itemRefs.current.findIndex((el) => el === document.activeElement)
    const last = OPTIONS.length - 1
    const move = (index: number) => {
      event.preventDefault()
      itemRefs.current[index]?.focus()
    }
    switch (event.key) {
      case 'ArrowDown':
        return move(focused < 0 || focused >= last ? 0 : focused + 1)
      case 'ArrowUp':
        return move(focused <= 0 ? last : focused - 1)
      case 'Home':
        return move(0)
      case 'End':
        return move(last)
      case 'Escape':
        event.preventDefault()
        event.stopPropagation()
        return close(true)
      case 'Tab':
        // Let focus leave naturally; just dismiss the panel.
        return close(false)
    }
  }

  return (
    <div ref={rootRef} className="sm:relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={`País: ${currentName}. Cambiar país`}
        onClick={() => (open ? close(false) : setOpen(true))}
        onKeyDown={onButtonKeyDown}
        className={`inline-flex h-10 items-center gap-1.5 rounded-full border border-on-brand/45 px-2.5 text-sm font-semibold whitespace-nowrap text-on-brand backdrop-blur-sm transition-colors duration-200 hover:bg-on-brand/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900 sm:gap-2 sm:px-3.5 ${
          open ? 'bg-on-brand/20' : 'bg-on-brand/10'
        }`}
      >
        <span>País</span>
        <span aria-hidden="true" className="opacity-80">·</span>
        <span className="font-bold">{country}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label="País"
            onKeyDown={onMenuKeyDown}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="absolute right-3 top-full z-50 mt-2 w-[300px] max-w-[calc(100vw-24px)] rounded-xl border border-neutral-200 bg-white p-1.5 shadow-[var(--shadow-brand-xl)] sm:right-0 sm:mt-2.5"
          >
            {OPTIONS.map((option, i) => {
              const checked = option.code === country
              return (
                <button
                  key={option.code}
                  ref={(el) => {
                    itemRefs.current[i] = el
                  }}
                  type="button"
                  role="menuitemradio"
                  aria-checked={checked}
                  tabIndex={-1}
                  onClick={() => select(option.code)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors duration-150 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-600 sm:py-2.5 ${
                    checked ? 'bg-brand-50' : ''
                  }`}
                >
                  <CountryFlag country={option.code} width={28} />
                  <span className="flex flex-1 flex-col gap-0.5">
                    <span className="text-[15px] leading-tight font-semibold text-brand-900">
                      {option.name}
                    </span>
                    <span className="text-[13px] leading-tight font-medium text-neutral-600">
                      <b className="font-bold text-brand-900">{option.code}</b> · {option.currency}
                    </span>
                  </span>
                  {checked && (
                    <span
                      aria-hidden="true"
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-700 text-white"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

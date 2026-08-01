export interface HeroContent {
  eyebrow: string
  headline: string
  headlineItalic: string
  subline: string
  ctaPrimary: { label: string; href: string }
  bgVideo: string
}

export interface Stat {
  v: string
  l: string
  d?: string
}

export interface Benefit {
  n: string
  ic: string
  t: string
  d: string
}

export interface SimulatorConfig {
  interestRate: number
  plazoDias: number
  montoMin: number
  montoMax: number
  montoStep: number
  montoDefault: number
  quickAmounts: number[]
  rangeSubtext: string
  waNumber: string
  // Country-scoped presentation fields, sourced from each country's
  // simulator.json — required now that the legacy root `src/data/simulator.json`
  // (which predated these fields) was deleted in Phase 6 (PR4). Presentation
  // formatting (Intl.NumberFormat) wiring is Phase 7 (PR5); `calcCuotaDiaria`
  // itself never reads these.
  currency: 'USD' | 'GTQ'
  locale: string
  // Copy fields swept from hardcoded pt-BR JSX in Phase 7 (PR5). Values are
  // Spanish placeholders pending authentic per-country dialect authoring
  // (Phase 8, non-blocking content track) — see src/data/{sv,gt}/simulator.json.
  simulatorEyebrow: string
  simulatorHeadline: string
  simulatorHeadlineItalic: string
  simulatorSubline: string
  valorLabel: string
  prazoLabel: string
  diasLabel: string
  cuotaLabel: string
  totalLabel: string
  whatsappCta: string
  amountEyebrow: string
  amountHeadline: string
  amountHeadlineItalic: string
  amountHelperText: string
  amountSelectedLabel: string
}

export interface Step {
  n: string
  t: string
  d: string
}

export interface Service {
  ic: string
  t: string
  d: string
}

export interface CoverageContent {
  eyebrow: string
  headline: string
  intro: string
  locations: { city: string; region: string }[]
  requirements: { icon: string; label: string }[]
}

export interface AboutContent {
  eyebrow: string
  headline: string
  body: string
  cta: { label: string; href: string }
  image: string
  values: { icon: string; title: string; text: string }[]
}

export interface Testimonial {
  i: string
  n: string
  q: string
}

export interface VideoItem {
  t: string
  poster: string
  url: string
}

export interface ContactQuestion {
  id: string
  label: string
  type: 'text' | 'boolean'
}

export interface JobOpening {
  title: string
  modality: string
  location: string
  description: string
  active: boolean
  publishedAt: string
  salary?: string
}

// Careers rebuild — jobs.json holds only the fields that vary per city; the
// shared role fields (title/modality/description/salary/active) live in
// `ADVISOR_ROLE` (src/data/index.ts) and get spread over each input.
export type JobOpeningInput = Pick<JobOpening, 'location' | 'publishedAt'>

export interface FaqItem {
  q: string
  a: string
}

export interface JobsPageContent {
  whySolvia: { icon: string; title: string; text: string }[]
  expectations: { icon: string; label: string }[]
  // PR6 corrective fix — fields swept from hardcoded pt-BR JSX in
  // `careers-jobs-section.tsx`, `careers-expectations-section.tsx`, and
  // `careers-hero-section.tsx` that were never wired to content/useContent()
  // during Phase 5 migration. Spanish placeholders pending Phase 8 dialect
  // authoring, same convention as the Phase 7 simulator fields.
  availableJobsHeading: string
  noJobsMessage: string
  noJobsCta: string
  noJobsFallbackTitle: string
  publishedLabel: string
  viewDetailLabel: string
  applyLabel: string
  expectationsHeading: string
  expectationsNote: string
  heroEyebrow: string
  heroHeadline: string
  heroHeadlineItalic: string
  heroParagraph: string
  heroImageAlt: string
}

export interface JobApplicationContent {
  greeting: string
  teaser: string
  waIntroTemplate: string
  waIntroGeneric: string
  questions: ContactQuestion[]
  // PR6 corrective fix — fields swept from hardcoded pt-BR JSX in
  // `floating-chat-widget.tsx` that were never wired to content/useContent()
  // during Phase 5 migration. Spanish placeholders pending Phase 8 dialect
  // authoring, same convention as the Phase 7 simulator fields.
  vacancyQuestionLabel: string
  otherVacancyOption: string
  applicationLabel: string
}

export interface LegalSection {
  heading: string
  body: string
}

export interface LegalDocument {
  id: string
  title: string
  shortTitle?: string
  updatedAt: string
  sections: LegalSection[]
}

export interface LegalContent {
  eyebrow: string
  title: string
  subtitle: string
  documents: LegalDocument[]
  // PR6 corrective fix — field swept from hardcoded pt-BR aria-label in
  // `compliance-modal.tsx` that was never wired to content/useContent().
  // Spanish placeholder pending Phase 8 dialect authoring.
  closeLabel: string
}

// PR6 corrective fix — `videos-section.tsx` was one of the 7 files with
// hardcoded pt-BR JSX never wired to content. Unlike `jobs`/`jobsPage`, the
// `videos` array had no sibling "section chrome" content object, so this new
// bundle key follows that same array + config-object convention.
export interface VideosSectionContent {
  eyebrow: string
  headline: string
  headlineItalic: string
  subline: string
  watchFullLabelTemplate: string
  closeVideoLabel: string
}

// PR7 corrective fix — verify-report #447 found `testimonials-section.tsx`
// still had two hardcoded pt-BR literals (`aria-label="Depoimentos de
// clientes"` on the scroll region, and "Ler mais →" on the read-more
// button) that survived PR6's own text-only correction of this file.
// `testimonials` is a bare array with no sibling "section chrome" object
// (same situation `videos`/`VideosSectionContent` was in), so this follows
// that same array + config-object convention as a new bundle key.
export interface TestimonialsSectionContent {
  ariaLabel: string
  readMoreLabel: string
}

// PR6 corrective fix — `navbar.tsx` was never part of the 20 migrated
// consumers (it only ever consumed `useCountryStore`) but the spec's
// "Consumer Migration Completeness" acceptance scenario greps ALL of
// `src/components/**`, not just the 20. Its own hardcoded pt-BR strings
// (careers nav label, mobile menu aria-labels) need a home; there was no
// existing content bucket for navbar copy, so this is a new bundle key.
export interface NavContent {
  careersLabel: string
  openMenuLabel: string
  closeMenuLabel: string
}

export interface ContactContent {
  eyebrow: string
  headline: string
  headlineItalic: string
  subtext: string
  phone: string
  telHref: string
  waNumber: string
  waIntro: string
  assistantName: string
  assistantRole: string
  greeting: string
  teaser: string
  questions: ContactQuestion[]
  email: string
  social: { instagram: string; facebook: string }
  cnpj?: string
  bcbNotice?: string
  bcbLink?: string
  ombudsmanEmail?: string
  sacPhone?: string
  cetNotice?: string
  // PR6 corrective fix — fields swept from hardcoded pt-BR JSX in
  // `floating-chat-widget.tsx` (chat chrome, always available regardless of
  // loan/application mode) that were never wired to content/useContent().
  // Spanish placeholders pending Phase 8 dialect authoring.
  closeChatLabel: string
  openChatLabel: string
  closeNoticeLabel: string
  reviewAnswersLabel: string
  sendViaWhatsappLabel: string
  answerPlaceholder: string
  sendAnswerLabel: string
  requestedAmountLabel: string
  productLabel: string
  productSummaryTemplate: string
}

// Country-scoped content bundle — originally the 16 keys `src/data/index.ts`
// exported (Phase 4/PR2); `videosSection` and `nav` were added in PR6, and
// `testimonialsSection` was added in PR7, as corrective fixes for hardcoded
// pt-BR JSX that was never wired to content. Both `src/data/sv/index.ts`
// and `src/data/gt/index.ts` validate against this with `satisfies
// ContentBundle`, so structural drift between the two country folders
// fails `tsc`, not runtime.
export interface ContentBundle {
  hero: HeroContent
  stats: Stat[]
  benefits: Benefit[]
  simulator: SimulatorConfig
  steps: Step[]
  services: Service[]
  about: AboutContent
  coverage: CoverageContent
  testimonials: Testimonial[]
  videos: VideoItem[]
  contact: ContactContent
  jobs: JobOpening[]
  faq: FaqItem[]
  jobApplication: JobApplicationContent
  jobsPage: JobsPageContent
  legal: LegalContent
  videosSection: VideosSectionContent
  nav: NavContent
  testimonialsSection: TestimonialsSectionContent
}

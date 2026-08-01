import type {
  HeroContent,
  Stat,
  Benefit,
  SimulatorConfig,
  Step,
  Service,
  AboutContent,
  CoverageContent,
  Testimonial,
  VideoItem,
  ContactContent,
  JobOpening,
  JobOpeningInput,
  JobApplicationContent,
  FaqItem,
  JobsPageContent,
  LegalContent,
  VideosSectionContent,
  NavContent,
  TestimonialsSectionContent,
  ContentBundle,
} from '@/types/content.types'

import heroRaw from './hero.json'
import statsRaw from './stats.json'
import benefitsRaw from './benefits.json'
import simulatorRaw from './simulator.json'
import stepsRaw from './steps.json'
import servicesRaw from './services.json'
import aboutRaw from './about.json'
import coverageRaw from './coverage.json'
import testimonialsRaw from './testimonials.json'
import videosRaw from './videos.json'
import contactRaw from './contact.json'
import jobsRaw from './jobs.json'
import faqRaw from './faq.json'
import jobApplicationRaw from './job-application.json'
import jobsPageRaw from './jobs-page.json'
import legalRaw from './legal.json'
import videosSectionRaw from './videos-section.json'
import navRaw from './nav.json'
import testimonialsSectionRaw from './testimonials-section.json'

export const hero = heroRaw satisfies HeroContent
export const stats = statsRaw satisfies Stat[]
export const benefits = benefitsRaw satisfies Benefit[]
// JSON imports widen string literals to `string`, so `currency`/`locale`
// need an explicit narrow to the literal union `satisfies` expects — the
// rest of the shape is still structurally checked via `satisfies`.
export const simulator = {
  ...simulatorRaw,
  currency: simulatorRaw.currency as SimulatorConfig['currency'],
  locale: simulatorRaw.locale as SimulatorConfig['locale'],
} satisfies SimulatorConfig
export const steps = stepsRaw satisfies Step[]
export const services = servicesRaw satisfies Service[]
export const about = aboutRaw satisfies AboutContent
export const coverage = coverageRaw satisfies CoverageContent
export const testimonials = testimonialsRaw satisfies Testimonial[]
export const videos = videosRaw satisfies VideoItem[]
export const contact = contactRaw as ContactContent

// All open roles are the same "Asesor Comercial" position offered in
// different cities — shared fields live here once and get spread over each
// city-specific entry from jobs.json, so editing the role only touches this
// constant instead of triplicating it across cities.
// GT dialect copy — authored in Phase 8 (PR4), register fixed in PR5 to use
// "usted" consistently with job-application.json/jobs-page.json instead of
// the voseo forms it previously shared with sv/index.ts (verify-report #452
// WARNING).
const ADVISOR_ROLE = {
  title: 'Asesor Comercial',
  modality: 'Presencial',
  description:
    'Busque nuevos clientes en la región. Visite a los comerciantes y presénteles las soluciones de Solvia. Brinde atención consultiva durante todo el proceso. Recolecte la documentación necesaria para el análisis de crédito. Acompañe a los clientes hasta el cierre de la contratación.',
  salary: 'Salario fijo más comisiones por desempeño.',
  active: true,
} as const

export const jobs = (jobsRaw as JobOpeningInput[]).map((input) => ({
  ...ADVISOR_ROLE,
  ...input,
})) satisfies JobOpening[]

export const faq = faqRaw satisfies FaqItem[]
export const jobApplication = jobApplicationRaw as JobApplicationContent
export const jobsPage = jobsPageRaw satisfies JobsPageContent
export const legal = legalRaw satisfies LegalContent
export const videosSection = videosSectionRaw satisfies VideosSectionContent
export const nav = navRaw satisfies NavContent
export const testimonialsSection = testimonialsSectionRaw satisfies TestimonialsSectionContent

export const gtContent = {
  hero,
  stats,
  benefits,
  simulator,
  steps,
  services,
  about,
  coverage,
  testimonials,
  videos,
  contact,
  jobs,
  faq,
  jobApplication,
  jobsPage,
  legal,
  videosSection,
  nav,
  testimonialsSection,
} satisfies ContentBundle

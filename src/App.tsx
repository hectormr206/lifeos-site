import {useEffect, useState} from 'react';
import {motion} from 'motion/react';
import {ArrowUpRight, Github, Heart} from 'lucide-react';

type Locale = 'en' | 'es';

const STORAGE_KEY = 'lifeos.site.locale';
const SITE_URL = 'https://lifeos.hectormr.com/';

const LINKS = {
  github: 'https://github.com/hectormr206/lifeos',
  siteRepo: 'https://github.com/hectormr206/lifeos-site',
  roadmap: 'https://github.com/hectormr206/lifeos/tree/main/docs/strategy',
  branding:
    'https://github.com/hectormr206/lifeos/blob/main/docs/branding/axi-visual-system.md',
  license: 'https://github.com/hectormr206/lifeos/blob/main/LICENSE',
  sponsors: 'https://github.com/sponsors/hectormr206',
};

const COPY = {
  en: {
    meta: {
      title: 'LifeOS | AI-native Linux from Mexico',
      description:
        'LifeOS is an AI-native Linux distribution focused on local-first intelligence, privacy by default, and sovereign personal computing.',
      ogDescription:
        'A local-first, privacy-first Linux operating system exploring private memory, local inference, and sovereign computing.',
      twitterDescription:
        'LifeOS is building a local-first, privacy-first Linux operating system for sovereign personal computing.',
      siteDescription:
        'AI-native Linux from Mexico. Local-first, privacy-first, and built in public.',
      softwareDescription:
        'An AI-native Linux distribution focused on local-first intelligence, privacy by default, and sovereign personal computing.',
      locale: 'en_US',
      htmlLang: 'en',
    },
    nav: {
      vision: 'Vision',
      whatWorks: 'What Works',
      roadmap: 'Roadmap',
      updates: 'Updates',
      support: 'Support LifeOS',
      language: 'Language',
    },
    hero: {
      eyebrow: 'AI-native Linux from Mexico',
      titleBefore: 'AI that lives',
      titleAccent: 'with you',
      titleAfter: 'not above you.',
      body:
        'LifeOS is an AI-native Linux distribution for people who want local inference, private memory, and system automation to belong to their own hardware. Axi, the project’s Mexican axolotl, carries that idea of calm, sovereign computing.',
      primaryCta: 'Get updates',
      secondaryCta: 'View on GitHub',
      chips: ['Local inference', 'Private memory', 'Telegram bridge', 'Open source'],
      signal: 'Axi signal',
      surface: 'Sovereign computing surface',
      prompt: 'life ask "Who owns my data?"',
      response: 'You do. Local by default. Sovereign by design.',
      memoryTitle: 'Memory',
      memoryBody:
        'Context stays on your machine instead of becoming training exhaust for a cloud vendor.',
      operatorTitle: 'Operator loop',
      operatorBody:
        'Voice, automation, remote interaction, and system control are being built as native capabilities.',
      motifLabel: 'Axi / Mexican axolotl',
    },
    proofs: {
      eyebrow: 'Current status',
      title: 'What works today',
      intro:
        'LifeOS is still early, but not imaginary. These are the foundations already present in the project and driving the public direction forward.',
      items: [
        {
          label: 'Runtime',
          title: 'Local inference engine',
          description:
            'LifeOS runs local inference through llama.cpp so intelligence can stay tied to your own hardware.',
          details: ['Local-first responses', 'OS-level integration', 'No cloud dependency by default'],
        },
        {
          label: 'Memory',
          title: 'Encrypted local memory foundations',
          description:
            'Personal context is designed to remain encrypted at rest and anchored to the machine you control.',
          details: ['Private context store', 'Encrypted at rest', 'Built for sovereign recall'],
        },
        {
          label: 'Control',
          title: 'Desktop control plane foundations',
          description:
            'A Rust daemon, local APIs, and operator surfaces form the base for deeper automation and system control.',
          details: ['Rust daemon core', 'System-facing APIs', 'Operator-first surface'],
        },
        {
          label: 'Remote loop',
          title: 'Telegram interaction today',
          description:
            'LifeOS already has a real remote bridge so you can reach your system from outside the desk.',
          details: ['Remote notifications', 'Mobile reach', 'Secure bridge foundations'],
        },
      ],
    },
    principles: {
      eyebrow: 'Why LifeOS',
      title: 'Built for permanence',
      intro:
        'LifeOS exists because we do not want intelligence to become another rented layer of modern computing. The OS itself has to carry the values.',
      items: [
        {
          number: '01',
          title: 'Local-first AI',
          description:
            'LifeOS treats on-device intelligence as the default, not the fallback. Your machine should not depend on someone else’s datacenter to think.',
        },
        {
          number: '02',
          title: 'Privacy by default',
          description:
            'Memory, automation, and context should live under your control. Privacy is not a premium feature layered on later.',
        },
        {
          number: '03',
          title: 'AI-native operating system',
          description:
            'LifeOS is not a chatbot wrapped around Linux. It is an operating system direction where inference, memory, voice, vision, and automation belong in the OS layer.',
        },
      ],
    },
    matters: {
      eyebrow: 'Why this matters',
      title: 'The cloud should not be the owner of your intelligence.',
      body:
        'LifeOS is building a different default: local-first AI, private memory, and automation that answers to the machine you own instead of a platform that rents your future back to you.',
      cloudTitle: 'Cloud default',
      cloudBody:
        'Remote models, vendor lock-in, fragmented memory, and invisible data extraction become the normal shape of computing.',
      directionTitle: 'LifeOS direction',
      directionBody:
        'Open source infrastructure, local inference, auditable control surfaces, and a system that keeps your memory and automation close to your own hardware.',
    },
    roadmap: {
      eyebrow: 'Road to public beta',
      title: 'What comes next',
      intro:
        'The near-term goal is not hype. It is to make the real system more stable, more usable, and easier to follow in public.',
      items: [
        {
          status: 'Active now',
          title: 'Stabilize the public beta foundation',
          description:
            'Keep hardening the everyday install, boot, update, and recovery path so LifeOS feels dependable on real hardware.',
        },
        {
          status: 'In progress',
          title: 'Improve accessible desktop control',
          description:
            'Grow the operator loop around Axi, desktop automation, and remote system control without depending on fragile cloud glue.',
        },
        {
          status: 'Next up',
          title: 'Expand public docs, demos, and onboarding',
          description:
            'Make LifeOS easier to understand, test, and follow in public through clearer guides, demos, and installation paths.',
        },
      ],
    },
    updates: {
      eyebrow: 'Follow the project',
      title: 'Get updates',
      intro:
        'The newsletter and public demo channels are opening next. Until then, GitHub and the roadmap are the honest, canonical places to track LifeOS.',
      comingSoonTitle: 'Coming soon',
      comingSoonBody:
        'Public demos on YouTube and Twitch will be linked here once the first broadcast cadence is live.',
      channels: [
        {
          title: 'Watch the main repo',
          description:
            'GitHub is the canonical place to follow source changes, issues, and milestones right now.',
          href: LINKS.github,
        },
        {
          title: 'Read the roadmap',
          description:
            'The strategy docs are public and already show the real state of the project and what comes next.',
          href: LINKS.roadmap,
        },
        {
          title: 'Inspect the site source',
          description:
            'This landing is also being built in public, separately, so the project message can evolve without hiding the implementation.',
          href: LINKS.siteRepo,
        },
      ],
    },
    support: {
      eyebrow: 'Support LifeOS',
      title: 'Help turn a private prototype into public infrastructure.',
      intro:
        'LifeOS is being built in the open. Early support helps fund the work needed to move from promising foundations to a stable public beta for people who care about sovereign computing.',
      sponsor: 'Sponsor on GitHub',
      star: 'Star the repo',
    },
    footer: {
      description:
        'AI-native Linux from Mexico. Local-first, privacy-first, and built in public around the idea that your intelligence should belong to you.',
      project: 'Project',
      brandAndLicense: 'Brand and license',
      github: 'GitHub',
      roadmap: 'Roadmap',
      siteSource: 'Site source',
      visualSystem: 'Axi visual system',
      license: 'License',
      sponsors: 'GitHub Sponsors',
    },
  },
  es: {
    meta: {
      title: 'LifeOS | Linux nativo para IA desde Mexico',
      description:
        'LifeOS es una distribucion Linux nativa para IA enfocada en inteligencia local-first, privacidad por defecto y computacion personal soberana.',
      ogDescription:
        'Un sistema operativo Linux local-first y privacy-first que explora memoria privada, inferencia local y computacion soberana.',
      twitterDescription:
        'LifeOS esta construyendo un sistema operativo Linux local-first y privacy-first para computacion personal soberana.',
      siteDescription:
        'Linux nativo para IA desde Mexico. Local-first, privacy-first y construido en publico.',
      softwareDescription:
        'Una distribucion Linux nativa para IA enfocada en inteligencia local-first, privacidad por defecto y computacion personal soberana.',
      locale: 'es_MX',
      htmlLang: 'es-MX',
    },
    nav: {
      vision: 'Vision',
      whatWorks: 'Lo real hoy',
      roadmap: 'Roadmap',
      updates: 'Actualizaciones',
      support: 'Apoyar LifeOS',
      language: 'Idioma',
    },
    hero: {
      eyebrow: 'Linux nativo para IA desde Mexico',
      titleBefore: 'IA que vive',
      titleAccent: 'contigo',
      titleAfter: 'no por encima de ti.',
      body:
        'LifeOS es una distribucion Linux nativa para IA para quienes quieren que la inferencia local, la memoria privada y la automatizacion del sistema pertenezcan a su propio hardware. Axi, el ajolote mexicano del proyecto, representa esa idea de computacion soberana y serena.',
      primaryCta: 'Recibir actualizaciones',
      secondaryCta: 'Ver en GitHub',
      chips: ['Inferencia local', 'Memoria privada', 'Puente con Telegram', 'Codigo abierto'],
      signal: 'Senal de Axi',
      surface: 'Superficie de computacion soberana',
      prompt: 'life ask "Quien es dueno de mis datos?"',
      response: 'Tu. Local por defecto. Soberano por diseno.',
      memoryTitle: 'Memoria',
      memoryBody:
        'Tu contexto se queda en tu maquina en vez de convertirse en combustible de entrenamiento para un proveedor en la nube.',
      operatorTitle: 'Bucle operador',
      operatorBody:
        'Voz, automatizacion, interaccion remota y control del sistema se estan construyendo como capacidades nativas.',
      motifLabel: 'Axi / ajolote mexicano',
    },
    proofs: {
      eyebrow: 'Estado actual',
      title: 'Lo que ya funciona hoy',
      intro:
        'LifeOS aun esta temprano, pero no es imaginario. Estas son las bases que ya existen en el proyecto y empujan la direccion publica hacia adelante.',
      items: [
        {
          label: 'Runtime',
          title: 'Motor de inferencia local',
          description:
            'LifeOS corre inferencia local con llama.cpp para que la inteligencia permanezca ligada a tu propio hardware.',
          details: ['Respuestas local-first', 'Integracion al nivel del OS', 'Sin nube por defecto'],
        },
        {
          label: 'Memoria',
          title: 'Bases de memoria local cifrada',
          description:
            'El contexto personal esta pensado para permanecer cifrado en reposo y anclado a la maquina que controlas.',
          details: ['Contexto privado', 'Cifrado en reposo', 'Hecho para recuerdo soberano'],
        },
        {
          label: 'Control',
          title: 'Bases del control plane de escritorio',
          description:
            'Un daemon en Rust, APIs locales y superficies de operacion forman la base para automatizacion y control del sistema mas profundos.',
          details: ['Core en Rust', 'APIs orientadas al sistema', 'Superficie pensada para operar'],
        },
        {
          label: 'Loop remoto',
          title: 'Interaccion por Telegram hoy',
          description:
            'LifeOS ya tiene un puente remoto real para hablar con tu sistema aunque no estes frente al escritorio.',
          details: ['Notificaciones remotas', 'Alcance movil', 'Bases de puente seguro'],
        },
      ],
    },
    principles: {
      eyebrow: 'Por que LifeOS',
      title: 'Construido para permanecer',
      intro:
        'LifeOS existe porque no queremos que la inteligencia se convierta en otra capa rentada de la computacion moderna. El sistema operativo mismo tiene que cargar esos valores.',
      items: [
        {
          number: '01',
          title: 'IA local-first',
          description:
            'LifeOS trata la inteligencia en dispositivo como el default, no como el fallback. Tu maquina no deberia depender del datacenter de alguien mas para pensar.',
        },
        {
          number: '02',
          title: 'Privacidad por defecto',
          description:
            'La memoria, la automatizacion y el contexto deben vivir bajo tu control. La privacidad no es un extra premium agregado al final.',
        },
        {
          number: '03',
          title: 'Sistema operativo nativo para IA',
          description:
            'LifeOS no es un chatbot montado encima de Linux. Es una direccion de sistema operativo donde inferencia, memoria, voz, vision y automatizacion pertenecen a la capa del OS.',
        },
      ],
    },
    matters: {
      eyebrow: 'Por que importa',
      title: 'La nube no deberia ser duena de tu inteligencia.',
      body:
        'LifeOS esta construyendo otro default: IA local-first, memoria privada y automatizacion que responde a la maquina que posees, no a una plataforma que te renta tu propio futuro.',
      cloudTitle: 'Default de la nube',
      cloudBody:
        'Modelos remotos, lock-in de proveedor, memoria fragmentada y extraccion invisible de datos se vuelven la forma normal de la computacion.',
      directionTitle: 'Direccion de LifeOS',
      directionBody:
        'Infraestructura open source, inferencia local, superficies auditables de control y un sistema que mantiene tu memoria y tu automatizacion cerca de tu propio hardware.',
    },
    roadmap: {
      eyebrow: 'Camino a la beta publica',
      title: 'Lo que sigue',
      intro:
        'La meta cercana no es hype. Es volver el sistema real mas estable, mas usable y mas facil de seguir en publico.',
      items: [
        {
          status: 'Activo ahora',
          title: 'Estabilizar la base de la beta publica',
          description:
            'Seguir endureciendo instalacion, arranque, actualizaciones y recuperacion para que LifeOS se sienta confiable en hardware real.',
        },
        {
          status: 'En progreso',
          title: 'Mejorar el control de escritorio accesible',
          description:
            'Hacer crecer el loop de Axi, la automatizacion de escritorio y el control remoto del sistema sin depender de pegamento fragil en la nube.',
        },
        {
          status: 'Lo siguiente',
          title: 'Expandir documentacion publica, demos y onboarding',
          description:
            'Hacer que LifeOS sea mas facil de entender, probar y seguir mediante mejores guias, demos y caminos de instalacion.',
        },
      ],
    },
    updates: {
      eyebrow: 'Sigue el proyecto',
      title: 'Recibe actualizaciones',
      intro:
        'El newsletter y los canales publicos de demos vienen despues. Mientras tanto, GitHub y el roadmap son los lugares canonicos y honestos para seguir LifeOS.',
      comingSoonTitle: 'Proximamente',
      comingSoonBody:
        'Los demos publicos en YouTube y Twitch se enlazaran aqui cuando exista una cadencia real de transmisiones.',
      channels: [
        {
          title: 'Sigue el repo principal',
          description:
            'GitHub es el lugar canonico para seguir cambios de codigo, issues y milestones en este momento.',
          href: LINKS.github,
        },
        {
          title: 'Lee el roadmap',
          description:
            'Los documentos de estrategia son publicos y ya muestran el estado real del proyecto y lo que sigue.',
          href: LINKS.roadmap,
        },
        {
          title: 'Inspecciona el codigo del sitio',
          description:
            'Esta landing tambien se esta construyendo en publico, por separado, para que el mensaje del proyecto evolucione sin ocultar la implementacion.',
          href: LINKS.siteRepo,
        },
      ],
    },
    support: {
      eyebrow: 'Apoya LifeOS',
      title: 'Ayuda a convertir un prototipo privado en infraestructura publica.',
      intro:
        'LifeOS se esta construyendo en abierto. El apoyo temprano ayuda a financiar el trabajo para pasar de bases prometedoras a una beta publica estable para personas que se preocupan por la computacion soberana.',
      sponsor: 'Patrocinar en GitHub',
      star: 'Dar estrella al repo',
    },
    footer: {
      description:
        'Linux nativo para IA desde Mexico. Local-first, privacy-first y construido en publico alrededor de la idea de que tu inteligencia debe pertenecerte.',
      project: 'Proyecto',
      brandAndLicense: 'Marca y licencia',
      github: 'GitHub',
      roadmap: 'Roadmap',
      siteSource: 'Codigo del sitio',
      visualSystem: 'Sistema visual de Axi',
      license: 'Licencia',
      sponsors: 'GitHub Sponsors',
    },
  },
} as const;

function normalizeLocale(value?: string | null): Locale {
  if (!value) return 'en';
  return value.toLowerCase().startsWith('es') ? 'es' : 'en';
}

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en';

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored) return normalizeLocale(stored);

  const browserLocale = window.navigator.languages?.[0] ?? window.navigator.language;
  return normalizeLocale(browserLocale);
}

function setMeta(selector: string, content: string) {
  const element = document.head.querySelector(selector);
  if (element instanceof HTMLMetaElement) {
    element.content = content;
  }
}

function useDocumentMetadata(locale: Locale) {
  useEffect(() => {
    const meta = COPY[locale].meta;
    document.documentElement.lang = meta.htmlLang;
    document.title = meta.title;

    setMeta('meta[name="description"]', meta.description);
    setMeta('meta[name="application-name"]', 'LifeOS');
    setMeta('meta[property="og:title"]', meta.title);
    setMeta('meta[property="og:description"]', meta.ogDescription);
    setMeta('meta[property="og:locale"]', meta.locale);
    setMeta('meta[name="twitter:title"]', meta.title);
    setMeta('meta[name="twitter:description"]', meta.twitterDescription);

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}#website`,
          url: SITE_URL,
          name: 'LifeOS',
          description: meta.siteDescription,
          inLanguage: meta.htmlLang,
        },
        {
          '@type': 'SoftwareSourceCode',
          '@id': `${SITE_URL}#software`,
          name: 'LifeOS',
          description: meta.softwareDescription,
          codeRepository: LINKS.github,
          programmingLanguage: ['Rust', 'TypeScript', 'Shell'],
          runtimePlatform: 'Linux',
          license: LINKS.license,
        },
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}#organization`,
          name: 'LifeOS',
          url: SITE_URL,
          sameAs: [LINKS.github, LINKS.sponsors],
        },
      ],
    };

    const script = document.head.querySelector('script[type="application/ld+json"]');
    if (script) {
      script.textContent = JSON.stringify(structuredData);
    }
  }, [locale]);
}

function SectionEyebrow({children}: {children: string}) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-outline/40 bg-surface/70 px-3 py-1">
      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-primary">
        {children}
      </span>
    </div>
  );
}

function NavLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: string;
  external?: boolean;
}) {
  return (
    <a
      className="text-sm uppercase tracking-[0.18em] text-text-muted transition-colors hover:text-primary"
      href={href}
      {...(external ? {target: '_blank', rel: 'noreferrer'} : {})}
    >
      {children}
    </a>
  );
}

function LanguageSwitcher({
  locale,
  onChange,
  label,
}: {
  locale: Locale;
  onChange: (value: Locale) => void;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-outline/35 bg-surface/55 px-2 py-1">
      <span className="hidden font-mono text-[0.64rem] uppercase tracking-[0.2em] text-text-muted lg:inline">
        {label}
      </span>
      {(['en', 'es'] as const).map((value) => {
        const active = value === locale;
        return (
          <button
            className={`rounded-full px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
              active
                ? 'bg-primary text-background'
                : 'text-text-muted hover:bg-background/80 hover:text-text'
            }`}
            key={value}
            onClick={() => onChange(value)}
            type="button"
          >
            {value}
          </button>
        );
      })}
    </div>
  );
}

function AxiMotif({label}: {label: string}) {
  return (
    <div className="relative mx-auto h-44 w-44">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(0,212,170,0.18)_0%,rgba(0,212,170,0.04)_38%,rgba(15,15,27,0)_72%)] blur-xl" />
      <div className="absolute left-1/2 top-1/2 h-24 w-28 -translate-x-1/2 -translate-y-1/2 rounded-[48%] border border-primary/25 bg-[linear-gradient(180deg,rgba(0,212,170,0.18)_0%,rgba(22,24,48,0.9)_72%)] shadow-[0_0_50px_rgba(0,212,170,0.16)]">
        <span className="absolute left-7 top-8 h-2 w-2 rounded-full bg-primary" />
        <span className="absolute right-7 top-8 h-2 w-2 rounded-full bg-primary" />
        <span className="absolute left-1/2 top-[3.6rem] h-1.5 w-8 -translate-x-1/2 rounded-full bg-secondary/70" />
      </div>
      <span className="absolute left-[0.8rem] top-[2.8rem] h-3 w-14 rounded-full bg-secondary/65 blur-[1px] rotate-[-26deg]" />
      <span className="absolute left-[0.55rem] top-[4.35rem] h-3 w-12 rounded-full bg-secondary/65 blur-[1px]" />
      <span className="absolute left-[0.95rem] top-[5.75rem] h-3 w-14 rounded-full bg-secondary/55 blur-[1px] rotate-[24deg]" />
      <span className="absolute right-[0.8rem] top-[2.8rem] h-3 w-14 rounded-full bg-secondary/65 blur-[1px] rotate-[26deg]" />
      <span className="absolute right-[0.55rem] top-[4.35rem] h-3 w-12 rounded-full bg-secondary/65 blur-[1px]" />
      <span className="absolute right-[0.95rem] top-[5.75rem] h-3 w-14 rounded-full bg-secondary/55 blur-[1px] rotate-[-24deg]" />
      <div className="absolute inset-x-8 bottom-2 rounded-full border border-primary/20 bg-background/85 px-3 py-1 text-center font-mono text-[0.62rem] uppercase tracking-[0.24em] text-text-muted">
        {label}
      </div>
    </div>
  );
}

function Navbar({
  locale,
  onLocaleChange,
}: {
  locale: Locale;
  onLocaleChange: (value: Locale) => void;
}) {
  const copy = COPY[locale];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-outline/20 bg-background/82 backdrop-blur-xl">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-8"
      >
        <a className="font-headline text-xl font-bold tracking-[0.2em] text-primary" href="#top">
          LifeOS
        </a>

        <div className="hidden items-center gap-7 md:flex">
          <NavLink href="#vision">{copy.nav.vision}</NavLink>
          <NavLink href="#what-works">{copy.nav.whatWorks}</NavLink>
          <NavLink href="#roadmap">{copy.nav.roadmap}</NavLink>
          <NavLink href={LINKS.github} external>
            GitHub
          </NavLink>
          <NavLink href="#updates">{copy.nav.updates}</NavLink>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher label={copy.nav.language} locale={locale} onChange={onLocaleChange} />
          <a
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-background transition-transform duration-300 hover:scale-[0.98]"
            href={LINKS.sponsors}
            rel="noreferrer"
            target="_blank"
          >
            {copy.nav.support}
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero({locale}: {locale: Locale}) {
  const copy = COPY[locale];

  return (
    <section className="relative overflow-hidden pt-28" id="top">
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(0,212,170,0.14),rgba(15,15,27,0)_56%)]" />

      <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-16 px-6 pb-20 pt-10 md:px-8 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div
          animate={{opacity: 1, y: 0}}
          initial={{opacity: 0, y: 24}}
          transition={{duration: 0.55}}
        >
          <SectionEyebrow>{copy.hero.eyebrow}</SectionEyebrow>
          <h1 className="max-w-3xl font-headline text-5xl font-bold leading-[0.98] tracking-[-0.04em] text-text md:text-7xl">
            {copy.hero.titleBefore} <span className="text-primary">{copy.hero.titleAccent}</span>,{' '}
            {copy.hero.titleAfter}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-text-muted md:text-xl">
            {copy.hero.body}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-background transition-transform duration-300 hover:scale-[0.98]"
              href="#updates"
            >
              {copy.hero.primaryCta}
            </a>
            <a
              className="inline-flex items-center justify-center gap-2 rounded-full border border-outline/45 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-text transition-colors duration-300 hover:border-primary/50 hover:bg-primary/5"
              href={LINKS.github}
              rel="noreferrer"
              target="_blank"
            >
              <Github className="h-4 w-4" />
              {copy.hero.secondaryCta}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {copy.hero.chips.map((item) => (
              <span
                className="rounded-full border border-outline/35 bg-surface/60 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-text-muted"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          animate={{opacity: 1, y: 0}}
          initial={{opacity: 0, y: 24}}
          transition={{delay: 0.1, duration: 0.55}}
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-outline/25 bg-surface/75 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(255,107,157,0.12),rgba(255,107,157,0)_26%),radial-gradient(circle_at_78%_22%,rgba(0,212,170,0.18),rgba(0,212,170,0)_34%)]" />
            <div className="relative z-10">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full border border-primary/25 bg-background/80 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-primary">
                  {copy.hero.signal}
                </span>
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-text-muted">
                  {copy.hero.surface}
                </span>
              </div>

              <div className="grid items-center gap-6 lg:grid-cols-[220px_1fr]">
                <AxiMotif label={copy.hero.motifLabel} />

                <div className="space-y-4">
                  <div className="rounded-3xl border border-outline/20 bg-background/78 p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-secondary/80" />
                      <span className="h-2 w-2 rounded-full bg-primary/80" />
                      <span className="ml-auto font-mono text-[0.65rem] uppercase tracking-[0.22em] text-text-muted">
                        tty1 / life-shell
                      </span>
                    </div>
                    <div className="space-y-3 font-mono text-sm text-text-muted">
                      <p>
                        <span className="text-primary">$</span> {copy.hero.prompt}
                      </p>
                      <p className="text-text">&gt; {copy.hero.response}</p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-outline/20 bg-background/70 p-4">
                      <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-text-muted">
                        {copy.hero.memoryTitle}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-text">{copy.hero.memoryBody}</p>
                    </div>
                    <div className="rounded-2xl border border-outline/20 bg-background/70 p-4">
                      <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-text-muted">
                        {copy.hero.operatorTitle}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-text">{copy.hero.operatorBody}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Proofs({locale}: {locale: Locale}) {
  const copy = COPY[locale];

  return (
    <section className="scroll-mt-24 py-24" id="what-works">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>{copy.proofs.eyebrow}</SectionEyebrow>
          <h2 className="font-headline text-4xl font-bold tracking-[-0.03em] text-text">
            {copy.proofs.title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-text-muted">{copy.proofs.intro}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {copy.proofs.items.map((proof, index) => (
            <motion.article
              className="group rounded-[1.5rem] border border-outline/20 bg-surface/75 p-6 transition-colors duration-300 hover:border-primary/30 hover:bg-surface/95"
              initial={{opacity: 0, y: 18}}
              key={proof.title}
              transition={{delay: index * 0.05, duration: 0.45}}
              viewport={{once: true, amount: 0.25}}
              whileInView={{opacity: 1, y: 0}}
            >
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-primary">
                {proof.label}
              </p>
              <h3 className="mt-4 font-headline text-2xl font-semibold tracking-[-0.03em] text-text">
                {proof.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-text-muted">{proof.description}</p>
              <div className="mt-6 space-y-2 rounded-2xl border border-outline/20 bg-background/75 p-4">
                {proof.details.map((detail) => (
                  <p
                    className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-text-muted"
                    key={detail}
                  >
                    {detail}
                  </p>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Principles({locale}: {locale: Locale}) {
  const copy = COPY[locale];

  return (
    <section className="scroll-mt-24 border-y border-outline/15 bg-surface/45 py-24" id="vision">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>{copy.principles.eyebrow}</SectionEyebrow>
          <h2 className="font-headline text-4xl font-bold tracking-[-0.03em] text-text">
            {copy.principles.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-text-muted">{copy.principles.intro}</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {copy.principles.items.map((principle, index) => (
            <motion.article
              className="rounded-[1.75rem] border border-outline/20 bg-background/72 p-8"
              initial={{opacity: 0, y: 18}}
              key={principle.title}
              transition={{delay: index * 0.06, duration: 0.45}}
              viewport={{once: true, amount: 0.25}}
              whileInView={{opacity: 1, y: 0}}
            >
              <p className="font-mono text-[0.8rem] uppercase tracking-[0.24em] text-primary">
                {principle.number}
              </p>
              <h3 className="mt-5 font-headline text-2xl font-semibold tracking-[-0.03em] text-text">
                {principle.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-text-muted">{principle.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyItMatters({locale}: {locale: Locale}) {
  const copy = COPY[locale];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-outline/20 bg-surface/75 p-8 md:p-12">
          <SectionEyebrow>{copy.matters.eyebrow}</SectionEyebrow>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-headline text-4xl font-bold leading-tight tracking-[-0.04em] text-text md:text-5xl">
                {copy.matters.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-text-muted">{copy.matters.body}</p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.5rem] border border-secondary/25 bg-secondary/5 p-6">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-secondary">
                  {copy.matters.cloudTitle}
                </p>
                <p className="mt-3 text-sm leading-7 text-text-muted">{copy.matters.cloudBody}</p>
              </div>
              <div className="rounded-[1.5rem] border border-primary/25 bg-primary/5 p-6">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-primary">
                  {copy.matters.directionTitle}
                </p>
                <p className="mt-3 text-sm leading-7 text-text-muted">
                  {copy.matters.directionBody}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Roadmap({locale}: {locale: Locale}) {
  const copy = COPY[locale];

  return (
    <section className="scroll-mt-24 py-24" id="roadmap">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>{copy.roadmap.eyebrow}</SectionEyebrow>
          <h2 className="font-headline text-4xl font-bold tracking-[-0.03em] text-text">
            {copy.roadmap.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-text-muted">{copy.roadmap.intro}</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {copy.roadmap.items.map((item, index) => (
            <motion.article
              className="rounded-[1.75rem] border border-outline/20 bg-surface/70 p-8"
              initial={{opacity: 0, y: 18}}
              key={item.title}
              transition={{delay: index * 0.06, duration: 0.45}}
              viewport={{once: true, amount: 0.25}}
              whileInView={{opacity: 1, y: 0}}
            >
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-primary">
                {item.status}
              </p>
              <h3 className="mt-5 font-headline text-2xl font-semibold tracking-[-0.03em] text-text">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-text-muted">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Updates({locale}: {locale: Locale}) {
  const copy = COPY[locale];

  return (
    <section className="scroll-mt-24 border-y border-outline/15 bg-surface/42 py-24" id="updates">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionEyebrow>{copy.updates.eyebrow}</SectionEyebrow>
            <h2 className="font-headline text-4xl font-bold tracking-[-0.03em] text-text">
              {copy.updates.title}
            </h2>
            <p className="mt-5 text-lg leading-8 text-text-muted">{copy.updates.intro}</p>
            <div className="mt-8 rounded-[1.5rem] border border-outline/20 bg-background/75 p-5">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-text-muted">
                {copy.updates.comingSoonTitle}
              </p>
              <p className="mt-3 text-sm leading-7 text-text-muted">
                {copy.updates.comingSoonBody}
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {copy.updates.channels.map((channel) => (
              <a
                className="group rounded-[1.5rem] border border-outline/20 bg-background/78 p-6 transition-colors duration-300 hover:border-primary/35 hover:bg-background"
                href={channel.href}
                key={channel.title}
                rel="noreferrer"
                target="_blank"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-headline text-2xl font-semibold tracking-[-0.03em] text-text">
                      {channel.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-text-muted">{channel.description}</p>
                  </div>
                  <ArrowUpRight className="mt-1 h-5 w-5 flex-none text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Support({locale}: {locale: Locale}) {
  const copy = COPY[locale];

  return (
    <section className="scroll-mt-24 py-24" id="support">
      <div className="mx-auto max-w-5xl px-6 text-center md:px-8">
        <SectionEyebrow>{copy.support.eyebrow}</SectionEyebrow>
        <h2 className="font-headline text-4xl font-bold tracking-[-0.03em] text-text md:text-5xl">
          {copy.support.title}
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-text-muted">
          {copy.support.intro}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            className="inline-flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-background transition-transform duration-300 hover:scale-[0.98]"
            href={LINKS.sponsors}
            rel="noreferrer"
            target="_blank"
          >
            <Heart className="h-4 w-4" />
            {copy.support.sponsor}
          </a>
          <a
            className="inline-flex items-center justify-center gap-3 rounded-full border border-outline/45 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-text transition-colors duration-300 hover:border-primary/50 hover:bg-primary/5"
            href={LINKS.github}
            rel="noreferrer"
            target="_blank"
          >
            <Github className="h-4 w-4" />
            {copy.support.star}
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer({locale}: {locale: Locale}) {
  const copy = COPY[locale];

  return (
    <footer className="border-t border-outline/20 bg-background/92">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-headline text-2xl font-bold tracking-[0.18em] text-primary">LifeOS</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-text-muted">
            {copy.footer.description}
          </p>
        </div>

        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-text-muted">
            {copy.footer.project}
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a
              className="text-text-muted transition-colors hover:text-primary"
              href={LINKS.github}
              rel="noreferrer"
              target="_blank"
            >
              {copy.footer.github}
            </a>
            <a
              className="text-text-muted transition-colors hover:text-primary"
              href={LINKS.roadmap}
              rel="noreferrer"
              target="_blank"
            >
              {copy.footer.roadmap}
            </a>
            <a
              className="text-text-muted transition-colors hover:text-primary"
              href={LINKS.siteRepo}
              rel="noreferrer"
              target="_blank"
            >
              {copy.footer.siteSource}
            </a>
          </div>
        </div>

        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-text-muted">
            {copy.footer.brandAndLicense}
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a
              className="text-text-muted transition-colors hover:text-primary"
              href={LINKS.branding}
              rel="noreferrer"
              target="_blank"
            >
              {copy.footer.visualSystem}
            </a>
            <a
              className="text-text-muted transition-colors hover:text-primary"
              href={LINKS.license}
              rel="noreferrer"
              target="_blank"
            >
              {copy.footer.license}
            </a>
            <a
              className="text-text-muted transition-colors hover:text-primary"
              href={LINKS.sponsors}
              rel="noreferrer"
              target="_blank"
            >
              {copy.footer.sponsors}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [locale, setLocale] = useState<Locale>(() => getInitialLocale());

  useDocumentMetadata(locale);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  return (
    <div className="min-h-screen bg-background text-text selection:bg-primary/30 selection:text-background">
      <Navbar locale={locale} onLocaleChange={setLocale} />
      <main>
        <Hero locale={locale} />
        <Proofs locale={locale} />
        <Principles locale={locale} />
        <WhyItMatters locale={locale} />
        <Roadmap locale={locale} />
        <Updates locale={locale} />
        <Support locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}

import {useEffect, useState} from 'react';
import {motion} from 'motion/react';
import {ArrowUpRight, Github, Heart} from 'lucide-react';

type Locale = 'en' | 'es';

const STORAGE_KEY = 'lifeos.site.locale';
const SITE_URL = 'https://lifeos.hectormr.com/';

const LINKS = {
  github: 'https://github.com/hectormr206/lifeos',
  siteRepo: 'https://github.com/hectormr206/lifeos-site',
  roadmapEn: 'https://github.com/hectormr206/lifeos/blob/main/docs/PRD-NEXT.md',
  roadmapEs: 'https://github.com/hectormr206/lifeos/blob/main/docs/PRD-NEXT.md',
  branding: 'https://github.com/hectormr206/lifeos/blob/main/README.md',
  license: 'https://github.com/hectormr206/lifeos/blob/main/LICENSE',
  sponsors: 'https://github.com/sponsors/hectormr206',
  installGuide: 'https://github.com/hectormr206/lifeos/blob/main/README.md#install',
};

const COPY = {
  en: {
    meta: {
      title: 'LifeOS | Local-first sovereign life platform — powered by Axi',
      description:
        'LifeOS is a local-first life platform. Install it and talk to Axi — the on-device AI agent with voice, vision, memory, and a real-time interpreter. No cloud, no telemetry.',
      ogDescription:
        'LifeOS is the local-first platform where your life lives. Axi — the on-device AI agent inside it — brings voice, vision, memory, and a real-time interpreter. 100% on your laptop.',
      twitterDescription:
        'Install LifeOS. Talk to Axi. A local-first life platform with an on-device AI agent — voice, vision, memory, and a real-time interpreter, running on your laptop.',
      siteDescription:
        'Local-first sovereign life platform from Mexico. Install LifeOS, talk to Axi. Runs on your laptop. No cloud, no telemetry.',
      softwareDescription:
        'LifeOS is a local-first life platform housing Axi, an on-device AI agent with voice, vision, memory, meeting recorder, and a real-time interpreter — designed to run entirely on a single laptop.',
      locale: 'en_US',
      htmlLang: 'en',
    },
    nav: {
      vision: 'Vision',
      whatWorks: 'What Works',
      install: 'Install',
      roadmap: 'Roadmap',
      updates: 'Updates',
      support: 'Support LifeOS',
      language: 'Language',
    },
    hero: {
      eyebrow: 'Local-first life platform from Mexico',
      titleBefore: 'Your life,',
      titleAccent: 'your machine',
      titleAfter: 'not their cloud.',
      body:
        'LifeOS is the local-first platform where your life lives — encrypted store, life domains, dashboard, and structured intelligence, all on your laptop. Axi is the agent inside it: the Mexican axolotl who sees, listens, remembers, and answers. Install LifeOS. Talk to Axi.',
      primaryCta: 'Install on CachyOS',
      secondaryCta: 'View on GitHub',
      chips: ['Voice + vision', 'Local inference', 'Real-time interpreter', 'Privacy by default'],
      signal: 'Axi · on-device agent',
      surface: 'LifeOS · local-first platform',
      prompt: 'axi> "Who owns my data?"',
      response: 'You do. Local by default. Sovereign by design.',
      memoryTitle: 'Memory',
      memoryBody:
        'Your conversations, facts, and meeting notes stay in SQLite on your disk — never uploaded, never used to train anyone else\'s model.',
      operatorTitle: 'Axi agent loop',
      operatorBody:
        'Voice, screen and camera Q&A, meetings, and a real-time EN→ES interpreter run as native services on your machine.',
      motifLabel: 'Axi / Mexican axolotl',
    },
    install: {
      eyebrow: 'Install',
      title: 'Run Axi on your own machine',
      intro:
        'Axi is open source and installs on top of CachyOS. One idempotent script pulls the system packages, the Python environment, the local models (with consent for the large one), and the systemd services — no cloud account, no telemetry.',
      alpha: 'Alpha · CachyOS + NVIDIA only for now',
      requirements: [
        {
          label: 'OS',
          value:
            'CachyOS (Arch-based) with KDE Plasma + PipeWire — the reference and only tested target today. More Arch-based distros come later.',
        },
        {
          label: 'GPU',
          value:
            'NVIDIA with CUDA and 12 GB+ VRAM. The brain is an MoE model offloaded with --cpu-moe so it fits in 12 GB.',
        },
        {label: 'Disk', value: '~35 GB for the default model set and the Python virtualenv.'},
      ],
      terminalLabel: 'tty1 / install',
      steps: [
        'git clone https://github.com/hectormr206/lifeos.git ~/LifeOS/lifeos',
        'cd ~/LifeOS/lifeos',
        './install.sh',
      ],
      openHint: '# then open http://127.0.0.1:8081 — re-check anytime with ./install.sh --check',
      ctaPrimary: 'Clone on GitHub',
      ctaSecondary: 'Read the install guide',
    },
    proofs: {
      eyebrow: 'Current status',
      title: 'What works today',
      intro:
        'Axi is still early, but not imaginary. These are real capabilities already running on a single laptop, driving the public direction forward.',
      items: [
        {
          label: 'Voice',
          title: 'Axi voice assistant',
          description:
            'Dictation, Q&A with screen, and Q&A with camera — Spanish-first, with voice commands like “Axi, abre el dashboard”.',
          details: ['Whisper turbo on GPU', 'Piper TTS', 'Voice intents to the OS'],
        },
        {
          label: 'Brain',
          title: 'Switchable local LLMs',
          description:
            'Qwen3.6 35B-A3B (MoE) runs locally on 12 GB VRAM via llama.cpp. A catalog of 9 multimodal 2026 models is switchable from the dashboard.',
          details: ['llama.cpp on Blackwell', 'Per-model parameter tweaking', '9-model catalog'],
        },
        {
          label: 'Meetings',
          title: 'Long-meeting recorder',
          description:
            'Incremental transcription, speaker diarization, and hierarchical Qwen-generated summaries — designed for multi-hour sessions.',
          details: ['Resemblyzer + pyannote diarization', 'Screenshot capture with phash dedup', 'Searchable from dashboard'],
        },
        {
          label: 'Memory',
          title: 'Local memory with full-text search',
          description:
            'SQLite + FTS5 stores conversation history, extracted facts, and meeting notes — timezone-aware and searchable from the dashboard.',
          details: ['SQLite + FTS5', 'Facts extraction', 'Stays on your disk'],
        },
        {
          label: 'Interpreter',
          title: 'Real-time EN→ES interpreter',
          description:
            'Chunked Whisper + Qwen translation + Piper TTS. Captures system audio via PipeWire null-sink, plays Spanish out your headphones in under 3 seconds.',
          details: ['Sub-3s latency in fluid mode', 'PipeWire null-sink capture', 'Plays to BT headphones'],
        },
        {
          label: 'Game Guard',
          title: 'One-click VRAM reclaim',
          description:
            'Frees all 12 GB VRAM for demanding games like RE Requiem or Cyberpunk RT. Models stop; the tray stays alive. Restore puts everything back on GPU.',
          details: ['One-click free 12 GB', 'Tray survives reclaim', 'Restore returns to GPU'],
        },
      ],
    },
    principles: {
      eyebrow: 'Why LifeOS',
      title: 'Built for permanence',
      intro:
        'LifeOS exists because we do not want intelligence to become another rented layer of modern computing. The platform has to carry those values — and so does Axi, the agent living inside it.',
      items: [
        {
          number: '01',
          title: 'Local-first AI',
          description:
            'LifeOS treats on-device intelligence as the default, not the fallback. Your laptop should not depend on someone else\'s datacenter to think.',
        },
        {
          number: '02',
          title: 'Privacy by default',
          description:
            'Conversations, audio, meeting recordings, and memory stay on your disk. No cloud APIs, no telemetry, no training exhaust.',
        },
        {
          number: '03',
          title: 'Single user, single laptop',
          description:
            'No multi-tenant servers, no accounts, no auth flows. Modular Python services — voice, brain, memory, dashboard, tray — coordinated by systemd on one machine.',
        },
      ],
    },
    matters: {
      eyebrow: 'Why this matters',
      title: 'The cloud should not be the owner of your intelligence.',
      body:
        'LifeOS is a different default: a sovereign platform where your life domains, memory, and AI agent run entirely on hardware you own — not on a service that rents your future back to you.',
      cloudTitle: 'Cloud default',
      cloudBody:
        'Remote models, vendor lock-in, fragmented memory, and invisible data extraction become the normal shape of computing.',
      directionTitle: 'LifeOS direction',
      directionBody:
        'Open source Python services, local inference on consumer GPUs, auditable surfaces, and Axi — an agent that keeps your voice, vision, and memory on your own laptop.',
    },
    roadmap: {
      eyebrow: 'What comes next',
      title: 'Near-term direction',
      intro:
        'The near-term goal is not hype. It is to make the real assistant more polished, more multilingual, and easier to follow in public.',
      items: [
        {
          status: 'Active now',
          title: 'Streaming model download UI',
          description:
            'Progress-bar UX in the dashboard for pulling new local models from the 9-model catalog, with checksum verification and resume support.',
        },
        {
          status: 'In progress',
          title: 'Side-by-side model evaluation',
          description:
            'Run two local models on the same prompt and compare latency, quality, and VRAM footprint directly from the dashboard.',
        },
        {
          status: 'Next up',
          title: 'Diarization V1 and more voice intents',
          description:
            'Promote pyannote diarization to default, plus a wider set of voice commands and an OCR runtime that activates when tesseract is installed.',
        },
      ],
    },
    updates: {
      eyebrow: 'Follow the project',
      title: 'Get updates',
      intro:
        'The newsletter and public demo channels are opening next. Until then, GitHub and the roadmap are the honest, canonical places to track Axi.',
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
            'The PRD-NEXT doc explains the real state of the assistant, what is active now, and what comes next.',
          href: '',
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
        'LifeOS is being built in the open. Early support helps fund the work needed to move from promising foundations to a polished local-first platform — and a better Axi — for people who care about sovereign computing.',
      sponsor: 'Sponsor on GitHub',
      star: 'Star the repo',
    },
    footer: {
      description:
        'Local-first sovereign life platform from Mexico. Install LifeOS. Talk to Axi. Voice, vision, memory, and a real-time interpreter — running 100% on your laptop, built in public.',
      project: 'Project',
      brandAndLicense: 'Brand and license',
      github: 'GitHub',
      roadmap: 'Roadmap',
      siteSource: 'Site source',
      visualSystem: 'Project README',
      license: 'License',
      sponsors: 'GitHub Sponsors',
    },
  },
  es: {
    meta: {
      title: 'LifeOS | Plataforma de vida local-first — con Axi adentro',
      description:
        'LifeOS es una plataforma de vida local-first. Instalala y habla con Axi — el agente de IA en dispositivo con voz, vision, memoria e interprete en tiempo real. Sin nube, sin telemetria.',
      ogDescription:
        'LifeOS es la plataforma local-first donde vive tu vida. Axi — el agente de IA en dispositivo dentro de ella — trae voz, vision, memoria e interprete en tiempo real. 100% en tu laptop.',
      twitterDescription:
        'Instala LifeOS. Habla con Axi. Una plataforma de vida local-first con agente de IA en dispositivo — voz, vision, memoria e interprete en tiempo real, corriendo en tu laptop.',
      siteDescription:
        'Plataforma de vida soberana local-first desde Mexico. Instala LifeOS, habla con Axi. Corre en tu laptop. Sin nube, sin telemetria.',
      softwareDescription:
        'LifeOS es una plataforma de vida local-first que alberga a Axi, un agente de IA en dispositivo con voz, vision, memoria, grabador de reuniones e interprete en tiempo real — disenado para correr completamente en una sola laptop.',
      locale: 'es_MX',
      htmlLang: 'es-MX',
    },
    nav: {
      vision: 'Vision',
      whatWorks: 'Lo real hoy',
      install: 'Instalar',
      roadmap: 'Roadmap',
      updates: 'Actualizaciones',
      support: 'Apoyar LifeOS',
      language: 'Idioma',
    },
    hero: {
      eyebrow: 'Plataforma de vida local-first desde Mexico',
      titleBefore: 'Tu vida,',
      titleAccent: 'tu maquina',
      titleAfter: 'no su nube.',
      body:
        'LifeOS es la plataforma local-first donde vive tu vida — almacen cifrado, dominios de vida, dashboard e inteligencia estructurada, todo en tu laptop. Axi es el agente adentro: el ajolote mexicano que ve, escucha, recuerda y responde. Instala LifeOS. Habla con Axi.',
      primaryCta: 'Instalar en CachyOS',
      secondaryCta: 'Ver en GitHub',
      chips: ['Voz + vision', 'Inferencia local', 'Interprete en tiempo real', 'Privacidad por defecto'],
      signal: 'Axi · agente en dispositivo',
      surface: 'LifeOS · plataforma local-first',
      prompt: 'axi> "Quien es dueno de mis datos?"',
      response: 'Tu. Local por defecto. Soberano por diseno.',
      memoryTitle: 'Memoria',
      memoryBody:
        'Tus conversaciones, hechos y notas de reuniones se quedan en SQLite en tu disco — nunca se suben, nunca entrenan el modelo de nadie mas.',
      operatorTitle: 'Loop del agente Axi',
      operatorBody:
        'Voz, Q&A con pantalla y camara, reuniones e interprete EN→ES en tiempo real corren como servicios nativos en tu maquina.',
      motifLabel: 'Axi / ajolote mexicano',
    },
    install: {
      eyebrow: 'Instalar',
      title: 'Corre Axi en tu propia maquina',
      intro:
        'Axi es open source y se instala sobre CachyOS. Un script idempotente trae los paquetes del sistema, el entorno de Python, los modelos locales (con consentimiento para el grande) y los servicios de systemd — sin cuenta en la nube, sin telemetria.',
      alpha: 'Alpha · por ahora solo CachyOS + NVIDIA',
      requirements: [
        {
          label: 'SO',
          value:
            'CachyOS (basado en Arch) con KDE Plasma + PipeWire — la referencia y el unico objetivo probado hoy. Mas distros basadas en Arch vienen despues.',
        },
        {
          label: 'GPU',
          value:
            'NVIDIA con CUDA y 12 GB+ de VRAM. El cerebro es un modelo MoE descargado con --cpu-moe para caber en 12 GB.',
        },
        {label: 'Disco', value: '~35 GB para el set de modelos por defecto y el entorno virtual de Python.'},
      ],
      terminalLabel: 'tty1 / install',
      steps: [
        'git clone https://github.com/hectormr206/lifeos.git ~/LifeOS/lifeos',
        'cd ~/LifeOS/lifeos',
        './install.sh',
      ],
      openHint: '# luego abre http://127.0.0.1:8081 — reverifica cuando quieras con ./install.sh --check',
      ctaPrimary: 'Clonar en GitHub',
      ctaSecondary: 'Leer la guia de instalacion',
    },
    proofs: {
      eyebrow: 'Estado actual',
      title: 'Lo que ya funciona hoy',
      intro:
        'Axi aun esta temprano, pero no es imaginario. Estas son capacidades reales corriendo ya en una sola laptop, empujando la direccion publica hacia adelante.',
      items: [
        {
          label: 'Voz',
          title: 'Asistente de voz Axi',
          description:
            'Dictado, Q&A con pantalla y Q&A con camara — primero en espanol, con comandos de voz como “Axi, abre el dashboard”.',
          details: ['Whisper turbo en GPU', 'Piper TTS', 'Intents de voz al sistema'],
        },
        {
          label: 'Cerebro',
          title: 'LLMs locales intercambiables',
          description:
            'Qwen3.6 35B-A3B (MoE) corre localmente en 12 GB de VRAM via llama.cpp. Un catalogo de 9 modelos multimodales 2026 se cambia desde el dashboard.',
          details: ['llama.cpp en Blackwell', 'Tuning de parametros por modelo', 'Catalogo de 9 modelos'],
        },
        {
          label: 'Reuniones',
          title: 'Grabador de reuniones largas',
          description:
            'Transcripcion incremental, diarizacion de hablantes y resumenes jerarquicos generados por Qwen — pensado para sesiones de varias horas.',
          details: ['Diarizacion Resemblyzer + pyannote', 'Capturas de pantalla con dedup phash', 'Buscable desde el dashboard'],
        },
        {
          label: 'Memoria',
          title: 'Memoria local con busqueda full-text',
          description:
            'SQLite + FTS5 guarda historial de conversaciones, hechos extraidos y notas de reuniones — consciente de zona horaria y buscable desde el dashboard.',
          details: ['SQLite + FTS5', 'Extraccion de hechos', 'Vive en tu disco'],
        },
        {
          label: 'Interprete',
          title: 'Interprete EN→ES en tiempo real',
          description:
            'Whisper por chunks + traduccion con Qwen + Piper TTS. Captura audio del sistema via PipeWire null-sink y reproduce espanol en los audifonos en menos de 3 segundos.',
          details: ['Latencia menor a 3s en modo fluido', 'Captura PipeWire null-sink', 'Sale a audifonos BT'],
        },
        {
          label: 'Game Guard',
          title: 'Reclamo de VRAM con un click',
          description:
            'Libera los 12 GB de VRAM para juegos exigentes como RE Requiem o Cyberpunk RT. Los modelos paran; el tray sigue vivo. Restore regresa todo a la GPU.',
          details: ['12 GB liberados con un click', 'El tray sobrevive', 'Restore vuelve a GPU'],
        },
      ],
    },
    principles: {
      eyebrow: 'Por que LifeOS',
      title: 'Construido para permanecer',
      intro:
        'LifeOS existe porque no queremos que la inteligencia se convierta en otra capa rentada de la computacion moderna. La plataforma tiene que cargar esos valores — y Axi, el agente que vive dentro de ella, tambien.',
      items: [
        {
          number: '01',
          title: 'IA local-first',
          description:
            'LifeOS trata la inteligencia en dispositivo como el default, no como el fallback. Tu laptop no deberia depender del datacenter de alguien mas para pensar.',
        },
        {
          number: '02',
          title: 'Privacidad por defecto',
          description:
            'Conversaciones, audio, grabaciones de reuniones y memoria se quedan en tu disco. Sin APIs en la nube, sin telemetria, sin combustible de entrenamiento.',
        },
        {
          number: '03',
          title: 'Un usuario, una laptop',
          description:
            'Sin servidores multi-tenant, sin cuentas, sin flujos de auth. Servicios modulares en Python — voz, cerebro, memoria, dashboard, tray — coordinados por systemd en una sola maquina.',
        },
      ],
    },
    matters: {
      eyebrow: 'Por que importa',
      title: 'La nube no deberia ser duena de tu inteligencia.',
      body:
        'LifeOS es otro default: una plataforma soberana donde tus dominios de vida, tu memoria y tu agente de IA corren completamente en hardware que posees — no en un servicio que te renta tu propio futuro.',
      cloudTitle: 'Default de la nube',
      cloudBody:
        'Modelos remotos, lock-in de proveedor, memoria fragmentada y extraccion invisible de datos se vuelven la forma normal de la computacion.',
      directionTitle: 'Direccion de LifeOS',
      directionBody:
        'Servicios open source en Python, inferencia local en GPUs de consumo, superficies auditables y Axi — un agente que mantiene tu voz, tu vision y tu memoria en tu propia laptop.',
    },
    roadmap: {
      eyebrow: 'Lo que sigue',
      title: 'Direccion cercana',
      intro:
        'La meta cercana no es hype. Es volver al asistente real mas pulido, mas multilingue y mas facil de seguir en publico.',
      items: [
        {
          status: 'Activo ahora',
          title: 'UI de descarga de modelos con streaming',
          description:
            'Barra de progreso en el dashboard para jalar nuevos modelos locales del catalogo de 9, con verificacion de checksum y soporte para reanudar.',
        },
        {
          status: 'En progreso',
          title: 'Evaluacion lado a lado de modelos',
          description:
            'Correr dos modelos locales con el mismo prompt y comparar latencia, calidad y huella de VRAM directamente desde el dashboard.',
        },
        {
          status: 'Lo siguiente',
          title: 'Diarizacion V1 y mas intents de voz',
          description:
            'Promover la diarizacion con pyannote a default, mas un set mas amplio de comandos de voz y un runtime de OCR que se activa cuando tesseract esta instalado.',
        },
      ],
    },
    updates: {
      eyebrow: 'Sigue el proyecto',
      title: 'Recibe actualizaciones',
      intro:
        'El newsletter y los canales publicos de demos vienen despues. Mientras tanto, GitHub y el roadmap son los lugares canonicos y honestos para seguir Axi.',
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
            'El documento PRD-NEXT explica el estado real del asistente, lo que esta activo ahora y lo que sigue.',
          href: '',
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
        'LifeOS se esta construyendo en abierto. El apoyo temprano ayuda a financiar el trabajo para pasar de bases prometedoras a una plataforma local-first pulida — y un Axi mejor — para personas que se preocupan por la computacion soberana.',
      sponsor: 'Patrocinar en GitHub',
      star: 'Dar estrella al repo',
    },
    footer: {
      description:
        'Plataforma de vida soberana local-first desde Mexico. Instala LifeOS. Habla con Axi. Voz, vision, memoria e interprete en tiempo real — corriendo 100% en tu laptop, construido en publico.',
      project: 'Proyecto',
      brandAndLicense: 'Marca y licencia',
      github: 'GitHub',
      roadmap: 'Roadmap',
      siteSource: 'Codigo del sitio',
      visualSystem: 'README del proyecto',
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
          programmingLanguage: ['Python', 'TypeScript', 'Shell'],
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
      <img
        alt="Axi, the Mexican axolotl mascot of LifeOS"
        className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-[58%] drop-shadow-[0_0_24px_rgba(255,107,157,0.28)]"
        src="/axi-mark.svg"
      />
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
        <a
          className="flex items-center gap-3 font-headline text-xl font-bold tracking-[0.2em] text-primary"
          href="#top"
        >
          LifeOS
          <span
            aria-label="LifeOS is in alpha"
            className="rounded-full border border-amber-400/50 bg-amber-400/10 px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-amber-300"
            title="LifeOS is in alpha — expect fast iteration and occasional regressions"
          >
            Alpha
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          <NavLink href="#vision">{copy.nav.vision}</NavLink>
          <NavLink href="#what-works">{copy.nav.whatWorks}</NavLink>
          <NavLink href="#install">{copy.nav.install}</NavLink>
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
              href="#install"
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

function Install({locale}: {locale: Locale}) {
  const copy = COPY[locale].install;

  return (
    <section className="scroll-mt-24 py-24" id="install">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>{copy.eyebrow}</SectionEyebrow>
          <h2 className="font-headline text-4xl font-bold tracking-[-0.03em] text-text">
            {copy.title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-text-muted">{copy.intro}</p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-400/45 bg-amber-400/10 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-amber-300" />
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-amber-300">
              {copy.alpha}
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid content-start gap-3">
            {copy.requirements.map((req) => (
              <div className="rounded-2xl border border-outline/20 bg-surface/70 p-5" key={req.label}>
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-primary">
                  {req.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-text">{req.value}</p>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-outline/25 bg-background/85 shadow-[0_30px_80px_rgba(0,0,0,0.38)]">
            <div className="flex items-center gap-2 border-b border-outline/20 px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-secondary/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-primary/80" />
              <span className="ml-auto font-mono text-[0.64rem] uppercase tracking-[0.22em] text-text-muted">
                {copy.terminalLabel}
              </span>
            </div>
            <div className="space-y-2 p-6 font-mono text-sm leading-7">
              {copy.steps.map((step) => (
                <p className="break-all text-text" key={step}>
                  <span className="select-none text-primary">$</span> {step}
                </p>
              ))}
              <p className="break-all pt-2 text-text-muted">{copy.openHint}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-background transition-transform duration-300 hover:scale-[0.98]"
            href={LINKS.github}
            rel="noreferrer"
            target="_blank"
          >
            <Github className="h-4 w-4" />
            {copy.ctaPrimary}
          </a>
          <a
            className="inline-flex items-center justify-center gap-2 rounded-full border border-outline/45 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-text transition-colors duration-300 hover:border-primary/50 hover:bg-primary/5"
            href={LINKS.installGuide}
            rel="noreferrer"
            target="_blank"
          >
            {copy.ctaSecondary}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
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
  const roadmapHref = locale === 'es' ? LINKS.roadmapEs : LINKS.roadmapEn;
  const channels = copy.updates.channels.map((channel) =>
    channel.title === 'Read the roadmap' || channel.title === 'Lee el roadmap'
      ? {...channel, href: roadmapHref}
      : channel,
  );

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
            {channels.map((channel) => (
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
  const roadmapHref = locale === 'es' ? LINKS.roadmapEs : LINKS.roadmapEn;

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
              href={roadmapHref}
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
        <Install locale={locale} />
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

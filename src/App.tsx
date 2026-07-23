import {useEffect, useRef, useState} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {ArrowUpRight, Github, Heart, Menu, X} from 'lucide-react';

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
  requestAccess: 'mailto:lifeos@hectormr.com?subject=LifeOS%20closed%20alpha%20access',
};

const COPY = {
  en: {
    meta: {
      title: 'LifeOS | Local-first sovereign life platform — powered by Axi',
      description:
        'LifeOS is a local-first life platform with Axi — the on-device AI agent with voice, vision, memory, and a real-time interpreter. Currently in a private, closed alpha (by invitation). No cloud, no telemetry.',
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
      vision: 'Why',
      whatWorks: 'What Works',
      install: 'Install',
      roadmap: 'Roadmap',
      updates: 'Updates',
      support: 'Support LifeOS',
      supportShort: 'Support',
      language: 'Language',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    hero: {
      eyebrow: 'Private closed alpha · local-first life platform from Mexico',
      titleBefore: 'Your life,',
      titleAccent: 'your machine',
      titleAfter: 'not their cloud.',
      body:
        'LifeOS is the local-first platform where your life lives — encrypted store, life domains, dashboard, and structured intelligence, all on your laptop. Axi is the agent inside it: the Mexican axolotl who sees, listens, remembers, and answers. It is in a private, closed alpha for now — access is by invitation while we get it ready for everyone.',
      primaryCta: 'Request access',
      secondaryCta: 'View on GitHub',
      chips: ['Voice + vision', 'Local inference', 'Real-time interpreter', 'Privacy by default'],
      signal: 'Axi · on-device agent',
      surface: 'LifeOS · local-first platform',
      prompt: 'axi> "Who owns my data?"',
      response: 'You do. Local by default. Sovereign by design.',
      memoryTitle: 'Memory (teaser)',
      memoryBody:
        'Facts, conversation history, and meeting notes in SQLite on your disk — recalled by Axi, never uploaded.',
      operatorTitle: 'Axi agent loop',
      operatorBody:
        'Voice, screen and camera Q&A, meetings, and a real-time EN→ES interpreter run as native services on your machine.',
      motifLabel: 'Axi / Mexican axolotl',
    },
    install: {
      eyebrow: 'Private access',
      title: 'Run LifeOS on your own machine',
      intro:
        'LifeOS is in a private, closed alpha. If you are invited, one idempotent script pulls the system packages, the Python environment, the local models (with consent for the large one), and the systemd services — no cloud account, no telemetry.',
      alpha: 'Closed alpha · by invitation · CachyOS + NVIDIA only for now',
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
      terminalLabel: 'axi@lifeos',
      steps: [
        'git clone https://github.com/hectormr206/lifeos.git ~/LifeOS/lifeos',
        'cd ~/LifeOS/lifeos',
        './install.sh',
      ],
      openHint: '# then open http://127.0.0.1:8081 — re-check anytime with ./install.sh --check',
      ctaPrimary: 'Request access',
      ctaSecondary: 'Read the install guide',
    },
    proofs: {
      eyebrow: 'Current status',
      title: 'What works today',
      intro:
        'LifeOS is still early, but not imaginary. These are real capabilities already running on a single laptop, driving the public direction forward.',
      axiGroupHeading: 'Axi — the agent',
      platformGroupHeading: 'LifeOS — the platform',
      axiItems: [
        {
          label: 'Voice',
          title: 'Axi voice assistant',
          description:
            'Dictation, Q&A with screen, and Q&A with camera — in Spanish and English, with a hands-free wake word: just say "Axi, …", no hotkey.',
          details: ['Hands-free wake word', 'Whisper turbo on GPU', 'Piper TTS'],
        },
        {
          label: 'Brain',
          title: 'Switchable local LLMs',
          description:
            'Qwen3.6 35B-A3B (MoE) runs locally on 12 GB VRAM via llama.cpp. A catalog of multimodal 2026 models is switchable from the dashboard.',
          details: ['llama.cpp on Blackwell', 'Per-model parameter tweaking', 'Model catalog'],
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
          title: 'Knowledge graph of your life',
          description:
            'Everything you tell Axi — people, meds, doctors, dates, preferences — becomes typed nodes and edges. Chat cross-references it, and a natural-language "forget" deletes with confirmation.',
          details: ['Typed nodes & edges', 'Graph-aware answers', 'Stays on your disk'],
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
      platformItems: [
        {
          label: 'Health',
          title: 'Health domain',
          description:
            'Log entries and trends, on your disk. Say it in English or Spanish — "blood pressure 120 over 80" lands as a structured record, no LLM needed.',
          details: ['Entries & trend log', 'EN/ES deterministic parsing', 'Local SQLite storage'],
        },
        {
          label: 'Finance',
          title: 'Finance domain',
          description: 'Entries, summaries, and guided reflection on impulsive spending.',
          details: ['Spending entries', 'Guided reflection', 'Local summaries'],
        },
        {
          label: 'Relationships',
          title: 'Relationships domain',
          description: 'People and the interactions you want to stay on top of.',
          details: ['Contact notes', 'Interaction log'],
        },
        {
          label: 'Reminders',
          title: 'Reminders domain',
          description: 'Scheduled, with web-push notifications and deep links to your phone.',
          details: ['Scheduled reminders', 'Web-push notifications'],
        },
        {
          label: 'Briefings',
          title: 'Agentic briefings',
          description:
            '"Bring me the news every morning at 9" — Axi searches the web on schedule, curates with real cited links, and pushes to your phone.',
          details: ['Scheduled web search', 'Curated with sources', 'Push with deep links'],
        },
        {
          label: 'Exercise',
          title: 'Exercise domain',
          description: 'Sessions and summaries.',
          details: ['Session log', 'Auto summaries'],
        },
        {
          label: 'Insights',
          title: 'Insights & nightly digest',
          description:
            'Cross-domain correlations — e.g. poor sleep leads to impulsive purchases — plus a nightly digest narrated by the local LLM from facts computed in code, delivered at an hour learned from your bedtime.',
          details: ['Cross-domain correlations', 'LLM-narrated, code-computed facts', 'Adaptive delivery hour'],
        },
        {
          label: 'Reliability',
          title: 'Reliability core',
          description:
            'A single writer owns the encrypted store — no multi-process write corruption — with data-loss-guarded rotating backups and web push that deep-links correctly over your own VPN.',
          details: ['Single-writer store', 'Guarded rotating backups', 'Push over your VPN'],
        },
      ],
    },
    why: {
      eyebrow: 'Why this matters',
      title: 'The cloud should not be the owner of your intelligence.',
      body:
        'LifeOS is a different default: a sovereign platform where your life domains, memory, and AI agent run entirely on hardware you own — not on a service that rents your future back to you.',
      principlesIntro:
        'LifeOS exists because we do not want intelligence to become another rented layer of modern computing. The platform has to carry those values — and so does Axi, the agent living inside it.',
      principles: [
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
    roadmap: {
      eyebrow: 'What comes next',
      title: 'Near-term direction',
      intro:
        'The near-term goal is not hype. It is to make the real platform and its agent more polished, more multilingual, and easier to follow in public.',
      items: [
        {
          status: 'Active now',
          title: 'Expanding the MCP tool surface',
          description:
            'V1 shipped: a local MCP server exposes memory, reminders, finance, and health tools over stdio so other local agents can use them. Next: insights/digest tools and per-tool consent.',
        },
        {
          status: 'Next up',
          title: 'OS-level control',
          description:
            'Let Axi act on the desktop — open apps and manage windows — safely and with explicit boundaries.',
        },
        {
          status: 'Later',
          title: 'Multi-device sync and beyond CachyOS',
          description:
            'Encrypted peer-to-peer sync across your own devices (still no cloud), and broadening tested support past CachyOS + KDE.',
        },
      ],
    },
    updates: {
      eyebrow: 'Follow the project',
      title: 'Get updates',
      intro:
        'The newsletter and public demo channels are opening next. Until then, GitHub and the roadmap are the honest, canonical places to track LifeOS and Axi.',
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
            'The PRD-NEXT doc explains the real state of the platform, what is active now, and what comes next.',
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
        'LifeOS es una plataforma de vida local-first con Axi — el agente de IA en dispositivo con voz, vision, memoria e interprete en tiempo real. Por ahora en alfa cerrada privada (por invitacion). Sin nube, sin telemetria.',
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
      vision: 'Por que',
      whatWorks: 'Lo real hoy',
      install: 'Instalar',
      roadmap: 'Roadmap',
      updates: 'Actualizaciones',
      support: 'Apoyar LifeOS',
      supportShort: 'Apoyar',
      language: 'Idioma',
      openMenu: 'Abrir menu',
      closeMenu: 'Cerrar menu',
    },
    hero: {
      eyebrow: 'Alfa cerrada privada · plataforma de vida local-first desde Mexico',
      titleBefore: 'Tu vida,',
      titleAccent: 'tu maquina',
      titleAfter: 'no su nube.',
      body:
        'LifeOS es la plataforma local-first donde vive tu vida — almacen cifrado, dominios de vida, dashboard e inteligencia estructurada, todo en tu laptop. Axi es el agente adentro: el ajolote mexicano que ve, escucha, recuerda y responde. Por ahora esta en alfa cerrada privada — el acceso es por invitacion mientras la preparamos para todos.',
      primaryCta: 'Solicitar acceso',
      secondaryCta: 'Ver en GitHub',
      chips: ['Voz + vision', 'Inferencia local', 'Interprete en tiempo real', 'Privacidad por defecto'],
      signal: 'Axi · agente en dispositivo',
      surface: 'LifeOS · plataforma local-first',
      prompt: 'axi> "Quien es dueno de mis datos?"',
      response: 'Tu. Local por defecto. Soberano por diseno.',
      memoryTitle: 'Memoria (adelanto)',
      memoryBody:
        'Hechos, historial de conversaciones y notas de reuniones en SQLite en tu disco — recordados por Axi, nunca subidos.',
      operatorTitle: 'Loop del agente Axi',
      operatorBody:
        'Voz, Q&A con pantalla y camara, reuniones e interprete EN→ES en tiempo real corren como servicios nativos en tu maquina.',
      motifLabel: 'Axi / ajolote mexicano',
    },
    install: {
      eyebrow: 'Acceso privado',
      title: 'Corre LifeOS en tu propia maquina',
      intro:
        'LifeOS esta en alfa cerrada privada. Si tienes invitacion, un script idempotente trae los paquetes del sistema, el entorno de Python, los modelos locales (con consentimiento para el grande) y los servicios de systemd — sin cuenta en la nube, sin telemetria.',
      alpha: 'Alfa cerrada · por invitacion · por ahora solo CachyOS + NVIDIA',
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
      terminalLabel: 'axi@lifeos',
      steps: [
        'git clone https://github.com/hectormr206/lifeos.git ~/LifeOS/lifeos',
        'cd ~/LifeOS/lifeos',
        './install.sh',
      ],
      openHint: '# luego abre http://127.0.0.1:8081 — reverifica cuando quieras con ./install.sh --check',
      ctaPrimary: 'Solicitar acceso',
      ctaSecondary: 'Leer la guia de instalacion',
    },
    proofs: {
      eyebrow: 'Estado actual',
      title: 'Lo que ya funciona hoy',
      intro:
        'LifeOS aun esta temprano, pero no es imaginario. Estas son capacidades reales corriendo ya en una sola laptop, empujando la direccion publica hacia adelante.',
      axiGroupHeading: 'Axi — el agente',
      platformGroupHeading: 'LifeOS — la plataforma',
      axiItems: [
        {
          label: 'Voz',
          title: 'Asistente de voz Axi',
          description:
            'Dictado, Q&A con pantalla y Q&A con camara — en espanol e ingles, con wake word manos libres: solo di "Axi, …", sin hotkey.',
          details: ['Wake word manos libres', 'Whisper turbo en GPU', 'Piper TTS'],
        },
        {
          label: 'Cerebro',
          title: 'LLMs locales intercambiables',
          description:
            'Qwen3.6 35B-A3B (MoE) corre localmente en 12 GB de VRAM via llama.cpp. Un catalogo de modelos multimodales 2026 se cambia desde el dashboard.',
          details: ['llama.cpp en Blackwell', 'Tuning de parametros por modelo', 'Catalogo de modelos'],
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
          title: 'Grafo de conocimiento de tu vida',
          description:
            'Todo lo que le cuentas a Axi — personas, medicinas, doctores, fechas, preferencias — se vuelve nodos y aristas tipados. El chat lo cruza al responder, y un "olvida..." en lenguaje natural borra con confirmacion.',
          details: ['Nodos y aristas tipados', 'Respuestas con grafo', 'Vive en tu disco'],
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
      platformItems: [
        {
          label: 'Salud',
          title: 'Dominio Salud',
          description:
            'Registros y tendencias, en tu disco. Dilo en espanol o ingles — "presion 120 sobre 80" queda como registro estructurado, sin pasar por el LLM.',
          details: ['Registro de entradas', 'Parsing determinista ES/EN', 'Almacenamiento local SQLite'],
        },
        {
          label: 'Finanzas',
          title: 'Dominio Finanzas',
          description: 'Entradas, resumenes y reflexion guiada sobre gasto impulsivo.',
          details: ['Entradas de gasto', 'Reflexion guiada', 'Resumenes locales'],
        },
        {
          label: 'Relaciones',
          title: 'Dominio Relaciones',
          description: 'Personas e interacciones que quieres seguir.',
          details: ['Notas de contacto', 'Registro de interacciones'],
        },
        {
          label: 'Recordatorios',
          title: 'Dominio Recordatorios',
          description: 'Programados, con notificaciones web-push y deep links a tu telefono.',
          details: ['Recordatorios programados', 'Notificaciones web-push'],
        },
        {
          label: 'Briefings',
          title: 'Briefings agenticos',
          description:
            '"Traeme las noticias cada manana a las 9" — Axi busca en la web segun el horario, cura con links reales citados y lo manda a tu telefono.',
          details: ['Busqueda web programada', 'Curado con fuentes', 'Push con deep links'],
        },
        {
          label: 'Ejercicio',
          title: 'Dominio Ejercicio',
          description: 'Sesiones y resumenes.',
          details: ['Registro de sesiones', 'Resumenes automaticos'],
        },
        {
          label: 'Insights',
          title: 'Insights y digest nocturno',
          description:
            'Correlaciones cross-dominio — ej. mal sueno lleva a compras impulsivas — mas un digest nocturno narrado por el LLM local a partir de hechos calculados en codigo, entregado a una hora aprendida de tu hora de dormir.',
          details: ['Correlaciones cross-dominio', 'Narrado por LLM, hechos del codigo', 'Hora de entrega adaptativa'],
        },
        {
          label: 'Confiabilidad',
          title: 'Nucleo de confiabilidad',
          description:
            'Un solo escritor es dueno del almacen cifrado — sin corrupcion por escrituras multi-proceso — con backups rotativos protegidos contra perdida de datos y web push que enlaza bien sobre tu propia VPN.',
          details: ['Almacen single-writer', 'Backups rotativos protegidos', 'Push sobre tu VPN'],
        },
      ],
    },
    why: {
      eyebrow: 'Por que importa',
      title: 'La nube no deberia ser duena de tu inteligencia.',
      body:
        'LifeOS es otro default: una plataforma soberana donde tus dominios de vida, tu memoria y tu agente de IA corren completamente en hardware que posees — no en un servicio que te renta tu propio futuro.',
      principlesIntro:
        'LifeOS existe porque no queremos que la inteligencia se convierta en otra capa rentada de la computacion moderna. La plataforma tiene que cargar esos valores — y Axi, el agente que vive dentro de ella, tambien.',
      principles: [
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
    roadmap: {
      eyebrow: 'Lo que sigue',
      title: 'Direccion cercana',
      intro:
        'La meta cercana no es hype. Es volver a la plataforma real y su agente mas pulidos, mas multilingues y mas faciles de seguir en publico.',
      items: [
        {
          status: 'Activo ahora',
          title: 'Expandir la superficie de tools MCP',
          description:
            'V1 ya salio: un servidor MCP local expone tools de memoria, recordatorios, finanzas y salud via stdio para que otros agentes locales las usen. Sigue: tools de insights/digest y consentimiento por tool.',
        },
        {
          status: 'Lo siguiente',
          title: 'Control a nivel de SO',
          description:
            'Dejar que Axi actue sobre el escritorio — abrir apps y manejar ventanas — de forma segura y con limites explicitos.',
        },
        {
          status: 'Despues',
          title: 'Sync multi-dispositivo y mas alla de CachyOS',
          description:
            'Sync peer-to-peer cifrado entre tus propios dispositivos (sin nube, igual que siempre), y ampliar el soporte probado mas alla de CachyOS + KDE.',
        },
      ],
    },
    updates: {
      eyebrow: 'Sigue el proyecto',
      title: 'Recibe actualizaciones',
      intro:
        'El newsletter y los canales publicos de demos vienen despues. Mientras tanto, GitHub y el roadmap son los lugares canonicos y honestos para seguir LifeOS y Axi.',
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
            'El documento PRD-NEXT explica el estado real de la plataforma, lo que esta activo ahora y lo que sigue.',
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

function SectionEyebrow({children, color = 'primary'}: {children: string; color?: 'primary' | 'secondary'}) {
  const textColor = color === 'secondary' ? 'text-secondary' : 'text-primary';
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-outline/40 bg-surface/70 px-3 py-1">
      <span className={`font-mono text-[0.6875rem] uppercase tracking-[0.24em] ${textColor}`}>
        {children}
      </span>
    </div>
  );
}

function NavLink({
  href,
  children,
  external = false,
  onClick,
}: {
  href: string;
  children: string;
  external?: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      className="text-sm uppercase tracking-[0.18em] text-text-muted transition-colors hover:text-primary"
      href={href}
      onClick={onClick}
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
    <div className="flex items-center gap-1.5 rounded-full border border-outline/35 bg-surface/55 px-2 py-1">
      <span className="hidden font-mono text-[0.64rem] uppercase tracking-[0.2em] text-text-muted lg:inline">
        {label}
      </span>
      {(['en', 'es'] as const).map((value) => {
        const active = value === locale;
        return (
          <button
            className={`rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
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
    <div className="relative mx-auto h-36 w-36 sm:h-44 sm:w-44">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,107,157,0.18)_0%,rgba(255,107,157,0.04)_38%,rgba(15,15,27,0)_72%)] blur-xl" />
      <img
        alt="Axi, the Mexican axolotl mascot of LifeOS"
        className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-[58%] drop-shadow-[0_0_24px_rgba(255,107,157,0.28)] sm:h-28 sm:w-28"
        src="/axi-mark.svg"
      />
      <div className="absolute inset-x-6 bottom-2 rounded-full border border-secondary/20 bg-background/85 px-2 py-1 text-center font-mono text-[0.58rem] uppercase tracking-[0.2em] text-text-muted sm:inset-x-8 sm:text-[0.62rem] sm:tracking-[0.24em]">
        {label}
      </div>
    </div>
  );
}

function MobileMenu({
  open,
  onClose,
  locale,
}: {
  open: boolean;
  onClose: () => void;
  locale: Locale;
}) {
  const copy = COPY[locale];
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            animate={{opacity: 1}}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
            exit={{opacity: 0}}
            initial={{opacity: 0}}
            onClick={onClose}
            transition={{duration: 0.2}}
          />
          {/* Drawer */}
          <motion.div
            animate={{x: 0}}
            className="fixed inset-y-0 right-0 z-50 flex w-72 max-w-[85vw] flex-col border-l border-outline/20 bg-surface/95 backdrop-blur-xl"
            exit={{x: '100%'}}
            initial={{x: '100%'}}
            ref={menuRef}
            transition={{duration: 0.28, ease: [0.32, 0, 0.2, 1]}}
          >
            <div className="flex items-center justify-between border-b border-outline/20 px-5 py-4">
              <span className="font-headline text-lg font-bold tracking-[0.18em] text-primary">
                LifeOS
              </span>
              <button
                aria-label={copy.nav.closeMenu}
                className="rounded-full p-2 text-text-muted transition-colors hover:bg-background/60 hover:text-text"
                onClick={onClose}
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="flex flex-col gap-1 p-4">
              <NavLink href="#what-works" onClick={onClose}>
                {copy.nav.whatWorks}
              </NavLink>
              <NavLink href="#why" onClick={onClose}>
                {copy.nav.vision}
              </NavLink>
              <NavLink href="#install" onClick={onClose}>
                {copy.nav.install}
              </NavLink>
              <NavLink href="#roadmap" onClick={onClose}>
                {copy.nav.roadmap}
              </NavLink>
              <NavLink href={LINKS.github} external onClick={onClose}>
                GitHub
              </NavLink>
              <NavLink href="#updates" onClick={onClose}>
                {copy.nav.updates}
              </NavLink>
            </nav>

            <div className="mt-auto border-t border-outline/20 p-4">
              <a
                className="flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-background transition-transform duration-300 hover:scale-[0.98]"
                href={LINKS.sponsors}
                onClick={onClose}
                rel="noreferrer"
                target="_blank"
              >
                {copy.nav.support}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-outline/20 bg-background/82 backdrop-blur-xl">
        <nav
          aria-label="Primary"
          className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-4 sm:h-16 md:gap-4 md:px-8"
        >
          {/* Wordmark + Alpha badge */}
          <a
            className="flex min-w-0 shrink-0 items-center gap-2 font-headline text-lg font-bold tracking-[0.2em] text-primary sm:gap-3 sm:text-xl"
            href="#top"
          >
            <span className="truncate">LifeOS</span>
            <span
              aria-label="LifeOS is in a private closed alpha"
              className="hidden rounded-full border border-amber-400/50 bg-amber-400/10 px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-amber-300 xs:inline-block sm:inline-block"
              title="LifeOS is in a private, closed alpha — access is by invitation"
            >
              Closed alpha
            </span>
          </a>

          {/* Desktop nav links — hidden below md */}
          <div className="hidden min-w-0 items-center gap-5 md:flex lg:gap-7">
            <NavLink href="#what-works">{copy.nav.whatWorks}</NavLink>
            <NavLink href="#why">{copy.nav.vision}</NavLink>
            <NavLink href="#install">{copy.nav.install}</NavLink>
            <NavLink href="#roadmap">{copy.nav.roadmap}</NavLink>
            <NavLink href={LINKS.github} external>
              GitHub
            </NavLink>
            <NavLink href="#updates">{copy.nav.updates}</NavLink>
          </div>

          {/* Right side: lang switcher + support CTA (desktop) + hamburger (mobile) */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <LanguageSwitcher label={copy.nav.language} locale={locale} onChange={onLocaleChange} />

            {/* Support button — text shortens on small screens, hidden below sm */}
            <a
              className="hidden items-center justify-center rounded-full bg-primary px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-background transition-transform duration-300 hover:scale-[0.98] sm:inline-flex sm:px-4"
              href={LINKS.sponsors}
              rel="noreferrer"
              target="_blank"
            >
              <span className="hidden md:inline">{copy.nav.support}</span>
              <span className="md:hidden">{copy.nav.supportShort}</span>
            </a>

            {/* Hamburger — visible below md */}
            <button
              aria-expanded={menuOpen}
              aria-label={copy.nav.openMenu}
              className="inline-flex items-center justify-center rounded-full border border-outline/30 p-2 text-text-muted transition-colors hover:bg-surface hover:text-text md:hidden"
              onClick={() => setMenuOpen(true)}
              type="button"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu locale={locale} open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function Hero({locale}: {locale: Locale}) {
  const copy = COPY[locale];

  return (
    <section className="relative overflow-hidden pt-14 sm:pt-16" id="top">
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(0,212,170,0.14),rgba(15,15,27,0)_56%)]" />

      <div className="mx-auto grid min-h-[calc(100svh-3.5rem)] max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:min-h-[calc(100svh-4rem)] sm:px-6 md:gap-16 md:px-8 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div
          animate={{opacity: 1, y: 0}}
          initial={{opacity: 0, y: 24}}
          transition={{duration: 0.55}}
        >
          <SectionEyebrow>{copy.hero.eyebrow}</SectionEyebrow>
          {/* Responsive headline: smaller on 320px, grows with screen */}
          <h1 className="max-w-3xl font-headline text-[2.25rem] font-bold leading-[0.98] tracking-[-0.04em] text-text xs:text-5xl md:text-7xl">
            {copy.hero.titleBefore}{' '}
            <span className="text-primary">{copy.hero.titleAccent}</span>,{' '}
            {copy.hero.titleAfter}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-text-muted sm:text-lg sm:leading-8 md:text-xl">
            {copy.hero.body}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-background transition-transform duration-300 hover:scale-[0.98] sm:px-8 sm:py-4"
              href={LINKS.requestAccess}
            >
              {copy.hero.primaryCta}
            </a>
            <a
              className="inline-flex items-center justify-center gap-2 rounded-full border border-outline/45 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-text transition-colors duration-300 hover:border-primary/50 hover:bg-primary/5 sm:px-8 sm:py-4"
              href={LINKS.github}
              rel="noreferrer"
              target="_blank"
            >
              <Github className="h-4 w-4 shrink-0" />
              {copy.hero.secondaryCta}
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
            {copy.hero.chips.map((item) => (
              <span
                className="rounded-full border border-outline/35 bg-surface/60 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-text-muted sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.18em]"
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
          <div className="relative overflow-hidden rounded-[1.5rem] border border-outline/25 bg-surface/75 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:rounded-[2rem] sm:p-6">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(255,107,157,0.12),rgba(255,107,157,0)_26%),radial-gradient(circle_at_78%_22%,rgba(0,212,170,0.18),rgba(0,212,170,0)_34%)]" />
            <div className="relative z-10">
              {/* Signal / Surface pill row */}
              <div className="mb-4 flex min-w-0 flex-wrap items-center justify-between gap-2 sm:mb-5 sm:gap-3">
                <span className="min-w-0 break-words rounded-full border border-secondary/30 bg-background/80 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-secondary sm:text-[0.68rem] sm:tracking-[0.22em]">
                  {copy.hero.signal}
                </span>
                <span className="min-w-0 break-words font-mono text-[0.65rem] uppercase tracking-[0.2em] text-primary sm:text-[0.68rem] sm:tracking-[0.22em]">
                  {copy.hero.surface}
                </span>
              </div>

              {/* Inner layout: AxiMotif + terminal + cards */}
              <div className="grid items-center gap-4 sm:gap-6 lg:grid-cols-[200px_1fr] xl:grid-cols-[220px_1fr]">
                <AxiMotif label={copy.hero.motifLabel} />

                <div className="min-w-0 space-y-3 sm:space-y-4">
                  {/* Terminal block */}
                  <div className="overflow-hidden rounded-2xl border border-secondary/20 bg-background/78 p-4 sm:rounded-3xl sm:p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-secondary/80" />
                      <span className="h-2 w-2 shrink-0 rounded-full bg-primary/80" />
                      <span className="ml-auto font-mono text-[0.62rem] uppercase tracking-[0.2em] text-text-muted sm:text-[0.65rem] sm:tracking-[0.22em]">
                        axi@lifeos
                      </span>
                    </div>
                    <div className="min-w-0 space-y-2 font-mono text-xs leading-6 text-text-muted sm:space-y-3 sm:text-sm sm:leading-7">
                      <p className="min-w-0 break-words">
                        <span className="text-secondary">$</span>{' '}
                        {copy.hero.prompt}
                      </p>
                      <p className="min-w-0 break-words text-text">
                        &gt; {copy.hero.response}
                      </p>
                    </div>
                  </div>

                  {/* Memory + Agent cards */}
                  <div className="grid gap-2 min-[480px]:grid-cols-2 sm:gap-3">
                    <div className="min-w-0 overflow-hidden rounded-2xl border border-secondary/20 bg-background/70 p-3 sm:p-4">
                      <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-secondary sm:text-[0.65rem] sm:tracking-[0.22em]">
                        {copy.hero.memoryTitle}
                      </p>
                      <p className="mt-2 text-xs leading-5 text-text sm:text-sm sm:leading-6">
                        {copy.hero.memoryBody}
                      </p>
                    </div>
                    <div className="min-w-0 overflow-hidden rounded-2xl border border-outline/20 bg-background/70 p-3 sm:p-4">
                      <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-text-muted sm:text-[0.65rem] sm:tracking-[0.22em]">
                        {copy.hero.operatorTitle}
                      </p>
                      <p className="mt-2 text-xs leading-5 text-text sm:text-sm sm:leading-6">
                        {copy.hero.operatorBody}
                      </p>
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
    <section className="scroll-mt-24 py-16 sm:py-24" id="what-works">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>{copy.proofs.eyebrow}</SectionEyebrow>
          <h2 className="font-headline text-3xl font-bold tracking-[-0.03em] text-text sm:text-4xl">
            {copy.proofs.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-text-muted sm:mt-5 sm:text-lg sm:leading-8">
            {copy.proofs.intro}
          </p>
        </div>

        {/* Axi group — secondary/pink */}
        <div className="mt-10 sm:mt-14">
          <div className="mb-5 flex min-w-0 items-center gap-3 sm:mb-6">
            <span className="shrink-0 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-secondary">
              {copy.proofs.axiGroupHeading}
            </span>
            <div className="h-px min-w-0 flex-1 bg-secondary/15" />
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {copy.proofs.axiItems.map((proof, index) => (
              <motion.article
                className="group overflow-hidden rounded-[1.25rem] border border-outline/20 bg-surface/75 p-5 transition-colors duration-300 hover:border-secondary/30 hover:bg-surface/95 sm:rounded-[1.5rem] sm:p-6"
                initial={{opacity: 0, y: 18}}
                key={proof.title}
                transition={{delay: index * 0.05, duration: 0.45}}
                viewport={{once: true, amount: 0.25}}
                whileInView={{opacity: 1, y: 0}}
              >
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-secondary">
                  {proof.label}
                </p>
                <h3 className="mt-3 font-headline text-xl font-semibold tracking-[-0.03em] text-text sm:mt-4 sm:text-2xl">
                  {proof.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-text-muted sm:mt-4 sm:leading-7">
                  {proof.description}
                </p>
                <div className="mt-5 space-y-2 overflow-hidden rounded-xl border border-outline/20 bg-background/75 p-3 sm:mt-6 sm:rounded-2xl sm:p-4">
                  {proof.details.map((detail) => (
                    <p
                      className="break-words font-mono text-[0.68rem] uppercase tracking-[0.16em] text-text-muted sm:tracking-[0.18em]"
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

        {/* LifeOS platform group — primary/teal */}
        <div className="mt-12 sm:mt-16">
          <div className="mb-5 flex min-w-0 items-center gap-3 sm:mb-6">
            <span className="shrink-0 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-primary">
              {copy.proofs.platformGroupHeading}
            </span>
            <div className="h-px min-w-0 flex-1 bg-primary/15" />
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {copy.proofs.platformItems.map((proof, index) => (
              <motion.article
                className="group overflow-hidden rounded-[1.25rem] border border-outline/20 bg-surface/75 p-5 transition-colors duration-300 hover:border-primary/30 hover:bg-surface/95 sm:rounded-[1.5rem] sm:p-6"
                initial={{opacity: 0, y: 18}}
                key={proof.title}
                transition={{delay: index * 0.05, duration: 0.45}}
                viewport={{once: true, amount: 0.25}}
                whileInView={{opacity: 1, y: 0}}
              >
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-primary">
                  {proof.label}
                </p>
                <h3 className="mt-3 font-headline text-xl font-semibold tracking-[-0.03em] text-text sm:mt-4 sm:text-2xl">
                  {proof.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-text-muted sm:mt-4 sm:leading-7">
                  {proof.description}
                </p>
                <div className="mt-5 space-y-2 overflow-hidden rounded-xl border border-outline/20 bg-background/75 p-3 sm:mt-6 sm:rounded-2xl sm:p-4">
                  {proof.details.map((detail) => (
                    <p
                      className="break-words font-mono text-[0.68rem] uppercase tracking-[0.16em] text-text-muted sm:tracking-[0.18em]"
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
      </div>
    </section>
  );
}

function Why({locale}: {locale: Locale}) {
  const copy = COPY[locale];

  return (
    <section className="scroll-mt-24 border-y border-outline/15 bg-surface/45 py-16 sm:py-24" id="why">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Strong headline from WhyItMatters */}
        <div className="overflow-hidden rounded-[1.5rem] border border-outline/20 bg-background/60 p-6 sm:rounded-[2rem] sm:p-8 md:p-12">
          <SectionEyebrow>{copy.why.eyebrow}</SectionEyebrow>
          <h2 className="font-headline text-3xl font-bold leading-tight tracking-[-0.04em] text-text sm:text-4xl md:text-5xl">
            {copy.why.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-text-muted sm:mt-5 sm:text-lg sm:leading-8">
            {copy.why.body}
          </p>
        </div>

        {/* Principles cards */}
        <p className="mt-10 max-w-3xl text-base leading-7 text-text-muted sm:mt-12 sm:text-lg sm:leading-8">
          {copy.why.principlesIntro}
        </p>
        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-3">
          {copy.why.principles.map((principle, index) => (
            <motion.article
              className="rounded-[1.5rem] border border-primary/20 bg-background/72 p-6 sm:rounded-[1.75rem] sm:p-8"
              initial={{opacity: 0, y: 18}}
              key={principle.title}
              transition={{delay: index * 0.06, duration: 0.45}}
              viewport={{once: true, amount: 0.25}}
              whileInView={{opacity: 1, y: 0}}
            >
              <p className="font-mono text-[0.8rem] uppercase tracking-[0.24em] text-primary">
                {principle.number}
              </p>
              <h3 className="mt-4 font-headline text-xl font-semibold tracking-[-0.03em] text-text sm:mt-5 sm:text-2xl">
                {principle.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-text-muted sm:mt-4 sm:leading-7">
                {principle.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Install({locale}: {locale: Locale}) {
  const copy = COPY[locale].install;

  return (
    <section className="scroll-mt-24 py-16 sm:py-24" id="install">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>{copy.eyebrow}</SectionEyebrow>
          <h2 className="font-headline text-3xl font-bold tracking-[-0.03em] text-text sm:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-text-muted sm:mt-5 sm:text-lg sm:leading-8">
            {copy.intro}
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-amber-400/45 bg-amber-400/10 px-3 py-2 sm:mt-6 sm:px-4">
            <span className="h-2 w-2 shrink-0 rounded-full bg-amber-300" />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-amber-300 sm:text-[0.68rem] sm:tracking-[0.16em]">
              {copy.alpha}
            </span>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Requirements */}
          <div className="grid content-start gap-3">
            {copy.requirements.map((req) => (
              <div className="rounded-xl border border-primary/20 bg-surface/70 p-4 sm:rounded-2xl sm:p-5" key={req.label}>
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-primary">
                  {req.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-text">{req.value}</p>
              </div>
            ))}
          </div>

          {/* Terminal */}
          <div className="overflow-hidden rounded-[1.25rem] border border-outline/25 bg-background/85 shadow-[0_30px_80px_rgba(0,0,0,0.38)] sm:rounded-[1.5rem]">
            <div className="flex items-center gap-2 border-b border-outline/20 px-4 py-3 sm:px-5">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-secondary/80" />
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary/80" />
              <span className="ml-auto font-mono text-[0.62rem] uppercase tracking-[0.2em] text-text-muted sm:text-[0.64rem] sm:tracking-[0.22em]">
                {copy.terminalLabel}
              </span>
            </div>
            <div className="space-y-2 overflow-x-hidden p-4 font-mono text-xs leading-6 sm:p-6 sm:text-sm sm:leading-7">
              {copy.steps.map((step) => (
                <p className="break-all text-text" key={step}>
                  <span className="select-none text-primary">$</span> {step}
                </p>
              ))}
              <p className="break-all pt-2 text-text-muted">{copy.openHint}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:flex-wrap">
          <a
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-background transition-transform duration-300 hover:scale-[0.98] sm:px-8 sm:py-4"
            href={LINKS.requestAccess}
          >
            {copy.ctaPrimary}
          </a>
          <a
            className="inline-flex items-center justify-center gap-2 rounded-full border border-outline/45 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-text transition-colors duration-300 hover:border-primary/50 hover:bg-primary/5 sm:px-8 sm:py-4"
            href={LINKS.installGuide}
            rel="noreferrer"
            target="_blank"
          >
            {copy.ctaSecondary}
            <ArrowUpRight className="h-4 w-4 shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Roadmap({locale}: {locale: Locale}) {
  const copy = COPY[locale];

  return (
    <section className="scroll-mt-24 py-16 sm:py-24" id="roadmap">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>{copy.roadmap.eyebrow}</SectionEyebrow>
          <h2 className="font-headline text-3xl font-bold tracking-[-0.03em] text-text sm:text-4xl">
            {copy.roadmap.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-text-muted sm:mt-5 sm:text-lg sm:leading-8">
            {copy.roadmap.intro}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 lg:grid-cols-3">
          {copy.roadmap.items.map((item, index) => (
            <motion.article
              className="rounded-[1.5rem] border border-outline/20 bg-surface/70 p-6 sm:rounded-[1.75rem] sm:p-8"
              initial={{opacity: 0, y: 18}}
              key={item.title}
              transition={{delay: index * 0.06, duration: 0.45}}
              viewport={{once: true, amount: 0.25}}
              whileInView={{opacity: 1, y: 0}}
            >
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-primary">
                {item.status}
              </p>
              <h3 className="mt-4 font-headline text-xl font-semibold tracking-[-0.03em] text-text sm:mt-5 sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-text-muted sm:mt-4 sm:leading-7">
                {item.description}
              </p>
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
    <section className="scroll-mt-24 border-y border-outline/15 bg-surface/42 py-16 sm:py-24" id="updates">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionEyebrow>{copy.updates.eyebrow}</SectionEyebrow>
            <h2 className="font-headline text-3xl font-bold tracking-[-0.03em] text-text sm:text-4xl">
              {copy.updates.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-text-muted sm:mt-5 sm:text-lg sm:leading-8">
              {copy.updates.intro}
            </p>
            <div className="mt-6 rounded-[1.25rem] border border-outline/20 bg-background/75 p-4 sm:mt-8 sm:rounded-[1.5rem] sm:p-5">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-text-muted">
                {copy.updates.comingSoonTitle}
              </p>
              <p className="mt-3 text-sm leading-6 text-text-muted sm:leading-7">
                {copy.updates.comingSoonBody}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:gap-4">
            {channels.map((channel) => (
              <a
                className="group overflow-hidden rounded-[1.25rem] border border-outline/20 bg-background/78 p-5 transition-colors duration-300 hover:border-primary/35 hover:bg-background sm:rounded-[1.5rem] sm:p-6"
                href={channel.href}
                key={channel.title}
                rel="noreferrer"
                target="_blank"
              >
                <div className="flex min-w-0 items-start justify-between gap-3 sm:gap-4">
                  <div className="min-w-0">
                    <h3 className="font-headline text-xl font-semibold tracking-[-0.03em] text-text sm:text-2xl">
                      {channel.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-text-muted sm:mt-3 sm:leading-7">
                      {channel.description}
                    </p>
                  </div>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
    <section className="scroll-mt-24 py-16 sm:py-24" id="support">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 md:px-8">
        <SectionEyebrow>{copy.support.eyebrow}</SectionEyebrow>
        <h2 className="font-headline text-3xl font-bold tracking-[-0.03em] text-text sm:text-4xl md:text-5xl">
          {copy.support.title}
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-text-muted sm:mt-6 sm:text-lg sm:leading-8">
          {copy.support.intro}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row sm:flex-wrap">
          <a
            className="inline-flex items-center justify-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-background transition-transform duration-300 hover:scale-[0.98] sm:px-8 sm:py-4"
            href={LINKS.sponsors}
            rel="noreferrer"
            target="_blank"
          >
            <Heart className="h-4 w-4 shrink-0" />
            {copy.support.sponsor}
          </a>
          <a
            className="inline-flex items-center justify-center gap-3 rounded-full border border-outline/45 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-text transition-colors duration-300 hover:border-primary/50 hover:bg-primary/5 sm:px-8 sm:py-4"
            href={LINKS.github}
            rel="noreferrer"
            target="_blank"
          >
            <Github className="h-4 w-4 shrink-0" />
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
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-12 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
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
        <Proofs locale={locale} />
        <Why locale={locale} />
        <Install locale={locale} />
        <Roadmap locale={locale} />
        <Updates locale={locale} />
        <Support locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}

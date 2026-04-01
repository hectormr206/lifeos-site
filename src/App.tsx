import {motion} from 'motion/react';
import {ArrowUpRight, Github, Heart} from 'lucide-react';

const LINKS = {
  github: 'https://github.com/hectormr206/lifeos',
  siteRepo: 'https://github.com/hectormr206/lifeos-site',
  roadmap: 'https://github.com/hectormr206/lifeos/tree/main/docs/strategy',
  branding:
    'https://github.com/hectormr206/lifeos/blob/main/docs/branding/axi-visual-system.md',
  license: 'https://github.com/hectormr206/lifeos/blob/main/LICENSE',
  sponsors: 'https://github.com/sponsors/hectormr206',
};

const proofs = [
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
];

const principles = [
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
];

const roadmap = [
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
];

const updateChannels = [
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
];

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

function AxiMotif() {
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
        Axi / Mexican axolotl
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-outline/20 bg-background/82 backdrop-blur-xl">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8"
      >
        <a className="font-headline text-xl font-bold tracking-[0.2em] text-primary" href="#top">
          LifeOS
        </a>

        <div className="hidden items-center gap-7 md:flex">
          <NavLink href="#vision">Vision</NavLink>
          <NavLink href="#what-works">What Works</NavLink>
          <NavLink href="#roadmap">Roadmap</NavLink>
          <NavLink href={LINKS.github} external>
            GitHub
          </NavLink>
          <NavLink href="#updates">Updates</NavLink>
        </div>

        <a
          className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-background transition-transform duration-300 hover:scale-[0.98]"
          href={LINKS.sponsors}
          rel="noreferrer"
          target="_blank"
        >
          Support LifeOS
        </a>
      </nav>
    </header>
  );
}

function Hero() {
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
          <SectionEyebrow>AI-native Linux from Mexico</SectionEyebrow>
          <h1 className="max-w-3xl font-headline text-5xl font-bold leading-[0.98] tracking-[-0.04em] text-text md:text-7xl">
            AI that lives <span className="text-primary">with you</span>, not above you.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-text-muted md:text-xl">
            LifeOS is an AI-native Linux distribution for people who want local inference,
            private memory, and system automation to belong to their own hardware. Axi, the
            project’s Mexican axolotl, carries that idea of calm, sovereign computing.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-background transition-transform duration-300 hover:scale-[0.98]"
              href="#updates"
            >
              Get updates
            </a>
            <a
              className="inline-flex items-center justify-center gap-2 rounded-full border border-outline/45 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-text transition-colors duration-300 hover:border-primary/50 hover:bg-primary/5"
              href={LINKS.github}
              rel="noreferrer"
              target="_blank"
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {['Local inference', 'Private memory', 'Telegram bridge', 'Open source'].map((item) => (
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
                  Axi signal
                </span>
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-text-muted">
                  Sovereign computing surface
                </span>
              </div>

              <div className="grid items-center gap-6 lg:grid-cols-[220px_1fr]">
                <AxiMotif />

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
                        <span className="text-primary">$</span> life ask "Who owns my data?"
                      </p>
                      <p className="text-text">
                        &gt; You do. Local by default. Sovereign by design.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-outline/20 bg-background/70 p-4">
                      <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-text-muted">
                        Memory
                      </p>
                      <p className="mt-2 text-sm leading-6 text-text">
                        Context stays on your machine instead of becoming training exhaust for a cloud vendor.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-outline/20 bg-background/70 p-4">
                      <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-text-muted">
                        Operator loop
                      </p>
                      <p className="mt-2 text-sm leading-6 text-text">
                        Voice, automation, remote interaction, and system control are being built as native capabilities.
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

function Proofs() {
  return (
    <section className="scroll-mt-24 py-24" id="what-works">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>Current status</SectionEyebrow>
          <h2 className="font-headline text-4xl font-bold tracking-[-0.03em] text-text">
            What works today
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-text-muted">
            LifeOS is still early, but not imaginary. These are the foundations already present in
            the project and driving the public direction forward.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {proofs.map((proof, index) => (
            <motion.article
              className="group rounded-[1.5rem] border border-outline/20 bg-surface/75 p-6 transition-colors duration-300 hover:border-primary/30 hover:bg-surface/95"
              initial={{opacity: 0, y: 18}}
              key={proof.title}
              transition={{delay: index * 0.05, duration: 0.45}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.25}}
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

function Principles() {
  return (
    <section className="scroll-mt-24 border-y border-outline/15 bg-surface/45 py-24" id="vision">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>Why LifeOS</SectionEyebrow>
          <h2 className="font-headline text-4xl font-bold tracking-[-0.03em] text-text">
            Built for permanence
          </h2>
          <p className="mt-5 text-lg leading-8 text-text-muted">
            LifeOS exists because we do not want intelligence to become another rented layer of
            modern computing. The OS itself has to carry the values.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {principles.map((principle, index) => (
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

function WhyItMatters() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-outline/20 bg-surface/75 p-8 md:p-12">
          <SectionEyebrow>Why this matters</SectionEyebrow>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-headline text-4xl font-bold leading-tight tracking-[-0.04em] text-text md:text-5xl">
                The cloud should not be the owner of your intelligence.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-text-muted">
                LifeOS is building a different default: local-first AI, private memory, and
                automation that answers to the machine you own instead of a platform that rents your
                future back to you.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.5rem] border border-secondary/25 bg-secondary/5 p-6">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-secondary">
                  Cloud default
                </p>
                <p className="mt-3 text-sm leading-7 text-text-muted">
                  Remote models, vendor lock-in, fragmented memory, and invisible data extraction
                  become the normal shape of computing.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-primary/25 bg-primary/5 p-6">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-primary">
                  LifeOS direction
                </p>
                <p className="mt-3 text-sm leading-7 text-text-muted">
                  Open source infrastructure, local inference, auditable control surfaces, and a
                  system that keeps your memory and automation close to your own hardware.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Roadmap() {
  return (
    <section className="scroll-mt-24 py-24" id="roadmap">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>Road to public beta</SectionEyebrow>
          <h2 className="font-headline text-4xl font-bold tracking-[-0.03em] text-text">
            What comes next
          </h2>
          <p className="mt-5 text-lg leading-8 text-text-muted">
            The near-term goal is not hype. It is to make the real system more stable, more usable,
            and easier to follow in public.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {roadmap.map((item, index) => (
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

function Updates() {
  return (
    <section className="scroll-mt-24 border-y border-outline/15 bg-surface/42 py-24" id="updates">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionEyebrow>Follow the project</SectionEyebrow>
            <h2 className="font-headline text-4xl font-bold tracking-[-0.03em] text-text">
              Get updates
            </h2>
            <p className="mt-5 text-lg leading-8 text-text-muted">
              The newsletter and public demo channels are opening next. Until then, GitHub and the
              roadmap are the honest, canonical places to track LifeOS.
            </p>
            <div className="mt-8 rounded-[1.5rem] border border-outline/20 bg-background/75 p-5">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-text-muted">
                Coming soon
              </p>
              <p className="mt-3 text-sm leading-7 text-text-muted">
                Public demos on YouTube and Twitch will be linked here once the first broadcast
                cadence is live.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {updateChannels.map((channel) => (
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

function Support() {
  return (
    <section className="scroll-mt-24 py-24" id="support">
      <div className="mx-auto max-w-5xl px-6 text-center md:px-8">
        <SectionEyebrow>Support LifeOS</SectionEyebrow>
        <h2 className="font-headline text-4xl font-bold tracking-[-0.03em] text-text md:text-5xl">
          Help turn a private prototype into public infrastructure.
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-text-muted">
          LifeOS is being built in the open. Early support helps fund the work needed to move from
          promising foundations to a stable public beta for people who care about sovereign
          computing.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            className="inline-flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-background transition-transform duration-300 hover:scale-[0.98]"
            href={LINKS.sponsors}
            rel="noreferrer"
            target="_blank"
          >
            <Heart className="h-4 w-4" />
            Sponsor on GitHub
          </a>
          <a
            className="inline-flex items-center justify-center gap-3 rounded-full border border-outline/45 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-text transition-colors duration-300 hover:border-primary/50 hover:bg-primary/5"
            href={LINKS.github}
            rel="noreferrer"
            target="_blank"
          >
            <Github className="h-4 w-4" />
            Star the repo
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-outline/20 bg-background/92">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-headline text-2xl font-bold tracking-[0.18em] text-primary">LifeOS</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-text-muted">
            AI-native Linux from Mexico. Local-first, privacy-first, and built in public around the
            idea that your intelligence should belong to you.
          </p>
        </div>

        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-text-muted">
            Project
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a className="text-text-muted transition-colors hover:text-primary" href={LINKS.github} rel="noreferrer" target="_blank">
              GitHub
            </a>
            <a className="text-text-muted transition-colors hover:text-primary" href={LINKS.roadmap} rel="noreferrer" target="_blank">
              Roadmap
            </a>
            <a className="text-text-muted transition-colors hover:text-primary" href={LINKS.siteRepo} rel="noreferrer" target="_blank">
              Site source
            </a>
          </div>
        </div>

        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-text-muted">
            Brand and license
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a className="text-text-muted transition-colors hover:text-primary" href={LINKS.branding} rel="noreferrer" target="_blank">
              Axi visual system
            </a>
            <a className="text-text-muted transition-colors hover:text-primary" href={LINKS.license} rel="noreferrer" target="_blank">
              License
            </a>
            <a className="text-text-muted transition-colors hover:text-primary" href={LINKS.sponsors} rel="noreferrer" target="_blank">
              GitHub Sponsors
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-background text-text selection:bg-primary/30 selection:text-background">
      <Navbar />
      <main>
        <Hero />
        <Proofs />
        <Principles />
        <WhyItMatters />
        <Roadmap />
        <Updates />
        <Support />
      </main>
      <Footer />
    </div>
  );
}

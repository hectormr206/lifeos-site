# Landing Page Master Prompt

Use this prompt as the source prompt for v0, Codex, Claude, ChatGPT, or any coding/design agent that will generate the first LifeOS landing page.

Recommended use:

1. start from this prompt
2. adjust copy and claims manually
3. only then generate the actual page

Important:

- the landing page must use the existing LifeOS branding
- this is not a rebrand exercise
- the site should extend the visual identity of LifeOS, not replace it

---

## Copy-Paste Prompt

```text
Design and implement a production-quality single-page landing page for LifeOS.

Project context:
LifeOS is an AI-native Linux operating system focused on local-first intelligence, privacy by default, and sovereign personal computing. It is not a cloud SaaS product. It should feel like a new computing environment for people who want their AI, memory, and automation to belong to them.

Primary objective:
Create a public front door for the project that explains what LifeOS is, why it matters, what is already real today, and how people can follow or support it.

Audience:
- open-source contributors
- grant reviewers
- technical early adopters
- privacy-conscious users
- potential sponsors and collaborators

Important truth constraints:
- Do not present LifeOS as finished or generally available.
- Do not invent users, testimonials, benchmarks, funding, press logos, or launch dates.
- Only make defendable claims.
- The page should feel ambitious, credible, and alive, but never fake or overmarketed.
- Avoid generic AI SaaS language like "supercharge your workflow" unless grounded in the actual product.

Core product truths that may be referenced carefully:
- LifeOS is an AI-native Linux distribution.
- It is local-first and privacy-first.
- It runs local inference.
- It has encrypted local memory foundations.
- It has desktop control and automation foundations.
- It has remote interaction foundations through Telegram.
- Voice, vision, memory, and system integration are core parts of the direction.
- Public beta is not complete yet.

Language:
- Write the landing page in English.
- Tone should be clear, direct, technical, and slightly visionary.
- Keep the writing compact. Do not turn every section into long marketing paragraphs.

Visual direction:
- The page must feel intentional, high-end, and distinct from generic startup landing pages.
- It must preserve the existing LifeOS brand identity rather than inventing a new one.
- Use a dark atmospheric look anchored in the LifeOS brand.
- Use these colors as the main palette:
  - Axi Teal: #00D4AA
  - Axi Pink: #FF6B9D
  - Deep Night: #0F0F1B
  - Midnight Surface: #161830
  - Soft White: #E8E8E8
- Teal should be the primary accent.
- Pink should be used sparingly for contrast, urgency, or subtle secondary accents.
- Avoid a purple-first look.
- Avoid switching the identity to a blue-first or generic Vercel-like palette.
- The brand should acknowledge that Axi is a Mexican axolotl and that this origin is part of the identity of LifeOS.
- If the page mentions origin explicitly, frame LifeOS as built in Mexico and open to users and contributors anywhere.
- If the hero uses illustration, wallpaper language, or mascot cues, they should feel rooted in the axolotl origin of the brand, but handled with elegance rather than folklore overload.
- The page should feel like sovereign computing, not a crypto product and not a chatbot dashboard.

Typography and UI direction:
- Use Inter for interface and body copy.
- Use JetBrains Mono for technical highlights or small labels.
- Prefer strong spacing, cinematic composition, large type in the hero, and controlled motion.
- Use gradients, glows, glassy panels, or subtle spatial backgrounds, but keep it elegant and readable.
- The UI should feel related to the LifeOS desktop language: dark-first, rounded panels, subtle glass/frosted depth, calm confidence, technical clarity.
- If mascot or character references appear, they must align with the existing Axi identity and must not invent a new mascot style.

Layout constraints:
- Single page only.
- No blog.
- No pricing table.
- No login.
- No fake product screenshots.
- No giant feature grid full of vague bullets.

Required sections in this order:

1. Hero
- Strong headline
- Strong supporting subheadline
- Primary CTA: "Get updates"
- Secondary CTA: "View on GitHub"
- Optional tertiary text link: "Support LifeOS" or "Watch demos"
- Include a visual hero composition that implies OS, memory, automation, and local AI without pretending the product is fully polished

2. Why LifeOS
- Three clear pillars:
  - Local-first AI
  - Privacy by default
  - AI-native operating system
- Each pillar should have sharp, non-generic explanatory copy

3. What Works Today
- Present only current foundations
- Good examples:
  - local inference
  - encrypted local memory foundations
  - desktop control plane foundations
  - remote loop through Telegram
  - voice, vision, and automation groundwork
- Make this section honest and confidence-building

4. Why This Matters
- Contrast LifeOS with cloud-dependent assistants, vendor lock-in, and proprietary ecosystems
- Keep the argument compact and strong

5. Road to Public Beta
- Three short items maximum
- Suggested themes:
  - stabilize the public beta experience
  - improve accessibility and desktop control
  - grow public documentation and community

6. Follow the Project
- Link areas for:
  - GitHub
  - YouTube
  - Twitch
  - Newsletter
- This section should feel active and inviting, not empty

7. Support LifeOS
- Explain that people can help through sponsorship, donations, or collaboration
- Include room for GitHub Sponsors and future support rails

8. Footer
- Short attribution
- GitHub link
- Creator link
- Simple privacy-oriented note

CTA strategy:
- Use only three main CTAs across the page:
  - Get updates
  - View on GitHub
  - Support LifeOS
- Do not overload the page with competing actions

Design quality bar:
- The page should feel more like a high-conviction operating system manifesto than a generic AI tool ad.
- It should be visually bold, but still shippable.
- Mobile and desktop must both feel designed, not merely responsive.

Accessibility requirements:
- Good color contrast
- Visible focus states
- Semantic landmarks
- Reduced-motion respect where appropriate

Implementation target:
- Use Next.js with TypeScript and App Router.
- Build the page as if it will be deployed on Vercel.
- Prefer clean component structure if needed, but keep the implementation lightweight.
- Use CSS variables for the brand palette.
- Do not add heavy dependencies unless truly necessary.

Output requirements:
- Return the code for a polished landing page implementation.
- Include the main page, styles, and any small supporting components needed.
- Keep the code understandable and maintainable.
- Use real placeholder href values only where links are not defined yet.

Content direction for the hero:
- The strongest version should communicate that LifeOS is for people who want AI to live with them, not above them.
- The tone should communicate sovereignty, calm power, privacy, and technical seriousness.

Avoid:
- "best AI OS in the world"
- fake numbers
- fake waitlist counts
- fake social proof
- cartoonish futurism
- generic gradient blobs without structure
- purple-on-black cyberpunk cliches
- overdesigned glassmorphism everywhere
- tourist-poster Mexico aesthetics or exclusionary national framing
- drifting away from the established LifeOS brand identity
- introducing a new logo, mascot redesign, or unrelated visual system

The result should make someone think:
"This is early, but real. I understand the vision. I want to follow this."
```

---

## Notes

- This prompt is intentionally strict about truthfulness.
- It is also intentionally strict about preserving the existing LifeOS branding.
- If we later decide to implement a Spanish version, duplicate the content only after the English version is stable.
- If we later add a real newsletter provider, update CTA destinations before deployment.

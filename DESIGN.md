# Design System Specification: Sovereign Technicality

## 1. Overview & Creative North Star
**The Creative North Star: "The Neon Monolith"**

This design system is built to evoke the feeling of a high-end, AI-native terminal that has evolved into a sovereign living organism. It rejects the "flat and friendly" SaaS aesthetic in favor of a **Sovereign Technical** identity—one that feels calm, authoritative, and deeply rooted in its Mexican heritage. 

The experience is defined by **Atmospheric Depth**. By utilizing deep ink-like backgrounds and high-luminance accents, we create a UI that doesn't just sit on a screen, but glows within a physical space. We break the grid through intentional asymmetry, allowing technical data to sit alongside editorial "manifesto" layouts, blending the precision of a kernel with the soul of an axolotl.

---

## 2. Colors: The Deep Night Palette

The palette is anchored in `#0F0F1B` (Deep Night), creating a canvas where light is used as a functional tool, not just decoration.

### Brand Accents
- **Primary (Axi Teal):** `#00D4AA` – Used for primary actions, system status, and "living" elements.
- **Secondary (Axi Pink):** `#FF6B9D` – Reserved for high-impact editorial moments, "The Cloud" manifesto, and critical warnings.
- **Tertiary (Muted Violet):** `#E0D0FF` – Used for technical metadata and low-priority system info.

### The "No-Line" Rule
Traditional 1px borders are strictly prohibited for sectioning. Boundaries must be defined through:
1.  **Background Shifts:** Transitioning from `surface` (#12121e) to `surface-container-low` (#1a1a27).
2.  **Luminance Pools:** Using subtle radial gradients of the Primary color (at 2-5% opacity) to "anchor" a content group.

### Signature Textures
- **The Axi Halo:** In Hero sections, use a large, blurred radial gradient of `primary_container` (#00D4AA) at 10% opacity behind the 'Axi' mascot motif to create a "digital wallpaper" effect.
- **Glassmorphism:** Floating panels (like the Terminal) must use `surface_container` with a `backdrop-filter: blur(12px)`.

---

## 3. Typography: Technical Editorial

The system pairs the humanist clarity of **Inter** with the rigid precision of **JetBrains Mono**.

| Level | Token | Font | Size | Character |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Space Grotesk | 3.5rem | Sovereign, Wide, Bold |
| **Headline** | `headline-md` | Space Grotesk | 1.75rem | Technical Authority |
| **Technical**| `code-md` | JetBrains Mono| 0.875rem | Raw, Monospaced, Precise |
| **Body** | `body-lg` | Inter | 1.0rem | Accessible, Calm |
| **Label** | `label-sm` | Inter | 0.6875rem | All-Caps, Tracked out (+5%) |

**Editorial Identity:** Use `label-sm` for subtle Mexican identity markers (e.g., "AI-NATIVE LINUX FROM MEXICO") placed vertically or in corners of containers to act as a "maker's mark."

---

## 4. Elevation & Depth: Tonal Layering

We do not use drop shadows to mimic light from above. We use **Tonal Layering** to mimic light from within.

*   **The Layering Principle:** 
    *   **Level 0 (Base):** `surface` (#12121e)
    *   **Level 1 (Sections):** `surface-container-low` (#1a1a27)
    *   **Level 2 (Cards):** `surface-container` (#1f1e2b)
    *   **Level 3 (Popovers/Tooltips):** `surface-container-high` (#292936)

*   **Ambient Glows:** For floating elements, use a shadow with a spread of 20px, 4% opacity, tinted with `#00D4AA` (Primary) rather than black.
*   **The Ghost Border:** If a boundary is required for accessibility, use `outline-variant` (#3b4a44) at 15% opacity. Never use 100% opaque borders.

---

## 5. Components

### The Animated Terminal
A centerpiece component.
- **Background:** `surface_container_lowest` (#0d0d19).
- **Text:** `primary_fixed` (#55fcd0) for inputs, `on_surface_variant` (#bacac2) for logs.
- **Interaction:** A 2px blinking cursor using `primary`.

### Technical Badges (Rust, Fedora, llama.cpp)
- **Geometry:** `rounded-sm` (0.125rem) for a sharp, industrial feel.
- **Color:** `surface_container_highest` background with `on_surface` text.
- **Detail:** A 1px left-side accent bar in `primary` or `secondary` to denote status.

### Buttons & Interaction
- **Primary Button:** Solid `primary_container` (#00d4aa). Text in `on_primary`. No border.
- **Ghost Button:** No background. Border is a "Ghost Border" (15% `outline`). On hover, background shifts to 5% `primary`.
- **High-Impact (Manifesto):** Solid `secondary_container` (#8c0a46). Reserved for "Sovereign" level actions.

### List Items
- **Forbid dividers.** Use `0.9rem` (space-4) of vertical padding.
- Selection is indicated by a background shift to `surface_bright` (#383846) and a 2px `primary` leading indicator.

---

## 6. Do’s and Don'ts

### Do
- **Do** use JetBrains Mono for all numerical data and system paths.
- **Do** lean into asymmetry. It’s okay for a technical spec list to be offset against a large hero image.
- **Do** use the Axi halo as a "wallpaper" that spans multiple sections to create continuity.
- **Do** use "AI-native Linux from Mexico" as a subtle recurring label in headers/footers.

### Don't
- **Don't** use standard Lucide icons for core pillars. Use the custom LifeOS SVG set (Axi mascot, Shield-OS, Nucleus-Logo).
- **Don't** use sharp white (#FFFFFF). Use `on_surface` (#e3e0f2) to reduce eye strain and maintain the "Night" atmosphere.
- **Don't** use rounded-xl (0.75rem) for technical components. Keep them `md` (0.375rem) or `sm` to maintain a "Sovereign" edge.
- **Don't** use transitions faster than 200ms. The system should feel "calm" and "deliberate."
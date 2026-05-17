---
name: Aetheric Commerce
colors:
  surface: '#fcf8fb'
  surface-dim: '#dcd9dc'
  surface-bright: '#fcf8fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edf0'
  surface-container-high: '#eae7ea'
  surface-container-highest: '#e5e1e4'
  on-surface: '#1c1b1d'
  on-surface-variant: '#484456'
  inverse-surface: '#313032'
  inverse-on-surface: '#f3f0f2'
  outline: '#797488'
  outline-variant: '#c9c3da'
  surface-tint: '#5d2ffa'
  primary: '#4900e5'
  on-primary: '#ffffff'
  primary-container: '#6236ff'
  on-primary-container: '#e3dbff'
  inverse-primary: '#c9bfff'
  secondary: '#00696e'
  on-secondary: '#ffffff'
  secondary-container: '#00f4fe'
  on-secondary-container: '#006c71'
  tertiary: '#9a002a'
  on-tertiary: '#ffffff'
  tertiary-container: '#c70039'
  on-tertiary-container: '#ffd6d7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5deff'
  primary-fixed-dim: '#c9bfff'
  on-primary-fixed: '#1b0063'
  on-primary-fixed-variant: '#4500d8'
  secondary-fixed: '#63f7ff'
  secondary-fixed-dim: '#00dce5'
  on-secondary-fixed: '#002021'
  on-secondary-fixed-variant: '#004f53'
  tertiary-fixed: '#ffdada'
  tertiary-fixed-dim: '#ffb3b5'
  on-tertiary-fixed: '#40000c'
  on-tertiary-fixed-variant: '#920027'
  background: '#fcf8fb'
  on-background: '#1c1b1d'
  surface-variant: '#e5e1e4'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Sora
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 20px
  margin-tablet: 32px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
This design system is built for a high-tech, premium e-commerce experience that merges the precision of developer tools with the luxury of high-end retail. The brand personality is "Futuristic Authority"—it is innovative, sleek, and uncompromisingly modern.

The design style utilizes **Glassmorphism** and **Corporate Modern** aesthetics. While rooted in futuristic precision, this light-mode iteration evokes a "Luminous Tech" aesthetic. It relies on pristine white surfaces, vibrant neon accents to guide user attention, and frosted glass layers to create a sense of physical depth in a clean digital space. The goal is to evoke a sense of "Next-Gen" shopping, making the user feel they are interacting with the clean, bright future of retail.

## Colors
The palette is rooted in a **Pristine High-Key Mode** to provide a high-contrast foundation for premium product imagery.

- **Primary (Electric Violet):** Used for brand moments, active states, and primary calls to action. It represents the "energy" of the system.
- **Secondary (Neon Cyan):** Used for interactive highlights, price points, and successful states. This color provides the "tech" feel.
- **Tertiary (Cyber Pink):** Reserved for urgent notifications, discounts, and "limited drop" indicators.
- **Neutral (Cloud & Obsidian):** A clean, cool white base (Cloud) is used for the canvas, with progressively darker grays for surface definitions and deep Obsidian for primary text.

## Typography
The typographic system uses a pairing of **Sora** for expressive headlines and **Geist** for technical precision in body and UI elements.

- **Sora** brings a geometric, futuristic character to display text, emphasizing the high-tech brand voice.
- **Geist** ensures maximum readability for product descriptions, specifications, and data-heavy interfaces like checkout screens.
- **Micro-type** (labels) should often be rendered in uppercase with slight tracking (letter-spacing) to mimic technical schematics.

## Layout & Spacing
The design system employs a **Fluid Grid** model optimized for mobile-first consumption. 

- **The Base Unit:** A 4px scale governs all spatial relationships, ensuring mathematical harmony.
- **Margins:** A generous 20px side margin on mobile creates a "premium" airy feel, preventing content from feeling cramped.
- **Stacking:** Vertical spacing between cards and sections should be aggressive (32px+) to maintain the minimalist aesthetic. 
- **Containers:** Content should be grouped in floating modules rather than edge-to-edge list items, reinforcing the "object-based" UI.

## Elevation & Depth
Depth is created through **Tonal Layering** and **Glassmorphism** rather than traditional heavy shadows.

1.  **Level 0 (Base):** #FBFBFF (Solid pristine white).
2.  **Level 1 (Surface):** #F1F1F4 (Subtle elevation for cards using soft, low-opacity shadows).
3.  **Level 2 (Glass):** Semi-transparent white (60-80% opacity) with a 20px backdrop blur. This is used for navigation bars and sticky headers.
4.  **Accents:** A subtle "glow" (outer shadow with 0% spread, high blur, and primary color at 15% opacity) is used for active buttons and featured product cards.

## Shapes
The shape language is **Refined & Smooth**. We avoid harsh 90-degree angles to maintain a premium "hardware-like" feel.

- **Cards/Containers:** 1rem (16px) corner radius for a friendly yet structured appearance.
- **Buttons:** 0.5rem (8px) or fully pill-shaped for high-action items like "Add to Cart."
- **Inputs:** 0.75rem (12px) to differentiate from action buttons.
- **Inner Elements:** Nested elements should follow a "-4px" rule (if the outer container is 16px, the inner element should be 12px) to maintain concentric visual harmony.

## Components
- **Buttons:** Primary buttons use a solid Electric Violet fill with white text. Secondary buttons use a "Ghost" style—transparent background with a 1px border of Neon Cyan.
- **Product Cards:** Must feature a very subtle soft shadow and a 1px inner border (stroke) at 5% black opacity to define edges against the light background.
- **Input Fields:** Use a light, recessed fill (#F1F1F5) with a 1px border that glows Electric Violet only when focused. Labels should remain small and Geist-weighted above the field.
- **Chips/Badges:** Small, high-contrast pills. For "New Arrivals," use a secondary color fill with dark text for maximum punch.
- **Checkout Bar:** A persistent glassmorphic tray at the bottom of the screen with a 20px backdrop blur, containing the total price and a prominent "Slide to Pay" or "Instant Checkout" button.
- **Micro-interactions:** All transitions should use a "Cubic Bezier (0.2, 0.8, 0.2, 1)" curve for a snappy, high-end feel.
/**
 * JS mirror of the CSS design tokens defined in app/globals.css :root.
 * Use this file for imperative DOM/canvas code that cannot consume CSS variables.
 * For React components, prefer the Tailwind utility classes generated from @theme inline.
 */
export const palette = {
  // Base
  background: "#f6f6f6",
  foreground: "#000000",

  // Surfaces
  surface:      "rgba(0,0,0,0.03)",
  surfaceHover: "rgba(0,0,0,0.05)",

  // Borders
  border:       "rgba(0,0,0,0.10)",
  borderStrong: "rgba(0,0,0,0.20)",
  borderFocus:  "rgba(0,0,0,0.40)",

  // Text
  muted:  "#6b7280",
  subtle: "#9ca3af",

  // Grid / canvas (hero background)
  gridDot:  "#000000",
  gridLine: "rgba(0,0,0,0.07)",
} as const;

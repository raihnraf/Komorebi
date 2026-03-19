/**
 * Design Tokens for Sakura & Matcha
 * Neo-brutalist Japanese Learning Platform
 */

// Color Palette
export const colors = {
  // Primary - Matcha Green
  primary: {
    DEFAULT: "#145129",
    container: "#2F6A3F",
    fixed: "#B2F2BB",
    "fixed-dim": "#96D5A0",
  },
  // Secondary - Sakura Pink
  secondary: {
    DEFAULT: "#78555E",
    container: "#FFD1DC",
  },
  // Tertiary - Purple
  tertiary: {
    DEFAULT: "#533F60",
    container: "#6B5779",
  },
  // Surface
  surface: {
    DEFAULT: "#F9F9F9",
    container: "#EEEEEE",
    "container-lowest": "#FFFFFF",
  },
  // JLPT Levels
  jlpt: {
    n5: "#87CEEB",
    n4: "#FDFD96",
    n3: "#B2F2BB",
    n2: "#FFD1DC",
    n1: "#CDB4DB",
  },
} as const;

// Typography
export const typography = {
  fonts: {
    headline: "Plus Jakarta Sans",
    body: "Plus Jakarta Sans",
    label: "Plus Jakarta Sans",
    japanese: "Noto Sans JP",
  },
  sizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
} as const;

// Spacing
export const spacing = {
  px: "1px",
  0: "0",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  11: "2.75rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem",
} as const;

// Shadows
export const shadows = {
  hard: "4px 4px 0px 0px rgba(26, 26, 26, 1)",
  hardSm: "2px 2px 0px 0px rgba(26, 26, 26, 1)",
  hardLg: "8px 8px 0px 0px rgba(26, 26, 26, 1)",
  nav: "0px -4px 0px 0px rgba(26, 26, 26, 1)",
} as const;

// Border Radius
export const borderRadius = {
  none: "0",
  sm: "0.125rem",
  DEFAULT: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px",
} as const;

// JLPT Levels Configuration
export const jlptLevels = {
  N5: {
    name: "N5",
    color: colors.jlpt.n5,
    description: "Beginner",
  },
  N4: {
    name: "N4",
    color: colors.jlpt.n4,
    description: "Elementary",
  },
  N3: {
    name: "N3",
    color: colors.jlpt.n3,
    description: "Intermediate",
  },
  N2: {
    name: "N2",
    color: colors.jlpt.n2,
    description: "Pre-Advanced",
  },
  N1: {
    name: "N1",
    color: colors.jlpt.n1,
    description: "Advanced",
  },
} as const;

// Animation Configuration
export const animations = {
  durations: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeOut: "cubic-bezier(0.215, 0.61, 0.355, 1)",
    easeIn: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
    easeInOut: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  },
  spring: {
    stiffness: 300,
    damping: 20,
    mass: 1,
  },
} as const;

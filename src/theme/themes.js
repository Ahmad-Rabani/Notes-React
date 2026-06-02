/** App palette */
export const PALETTE = {
  snow: "#F9F7F7",
  paleBlue: "#DBE2EF",
  primary: "#3F72AF",
  navy: "#112D4E",
};

export const lightTheme = {
  mode: "light",
  colors: {
    snow: PALETTE.snow,
    paleBlue: PALETTE.paleBlue,
    primary: PALETTE.primary,
    navy: PALETTE.navy,
    primaryHover: "#355f96",
    // legacy aliases used across styled-components
    periwinkle: PALETTE.primary,
    mist: PALETTE.paleBlue,
    sage: PALETTE.primary,
    cream: PALETTE.snow,
    white: PALETTE.snow,
    text: PALETTE.navy,
    textMuted: "rgba(17, 45, 78, 0.65)",
    error: "#c44d4d",
    pageGradient: `linear-gradient(145deg, ${PALETTE.paleBlue} 0%, ${PALETTE.snow} 40%, ${PALETTE.paleBlue} 75%, ${PALETTE.snow} 100%)`,
    authGradient: `linear-gradient(145deg, ${PALETTE.paleBlue} 0%, ${PALETTE.snow} 35%, ${PALETTE.primary} 85%, ${PALETTE.navy} 100%)`,
    cardBg: PALETTE.snow,
    cardBorder: "rgba(63, 114, 175, 0.28)",
    cardShadow: "0 4px 16px rgba(17, 45, 78, 0.08), 0 1px 4px rgba(63, 114, 175, 0.18)",
    cardHoverShadow:
      "0 12px 28px rgba(17, 45, 78, 0.14), 0 4px 12px rgba(63, 114, 175, 0.28)",
    inputBg: PALETTE.paleBlue,
    surface: PALETTE.snow,
    surfaceMuted: "rgba(219, 226, 239, 0.65)",
    overlayBg: "rgba(17, 45, 78, 0.5)",
    fabLabelBg: "rgba(249, 247, 247, 0.92)",
    skeletonBase: PALETTE.paleBlue,
    skeletonShimmer: PALETTE.snow,
    dragOverlayShadow:
      "0 20px 40px rgba(17, 45, 78, 0.22), 0 8px 24px rgba(63, 114, 175, 0.35)",
    focusRing: "rgba(63, 114, 175, 0.35)",
    star: "#e6a817",
  },
};

export const darkTheme = {
  mode: "dark",
  colors: {
    snow: PALETTE.snow,
    paleBlue: PALETTE.paleBlue,
    primary: PALETTE.primary,
    navy: PALETTE.navy,
    primaryHover: "#5a8fd4",
    periwinkle: PALETTE.primary,
    mist: PALETTE.paleBlue,
    sage: PALETTE.primary,
    cream: "#1a3a5c",
    white: "#1a3a5c",
    text: PALETTE.snow,
    textMuted: "rgba(219, 226, 239, 0.72)",
    error: "#f08080",
    pageGradient: `linear-gradient(145deg, ${PALETTE.navy} 0%, #1a3a5c 45%, ${PALETTE.navy} 100%)`,
    authGradient: `linear-gradient(145deg, ${PALETTE.navy} 0%, #1a3a5c 50%, ${PALETTE.navy} 100%)`,
    cardBg: "#1a3a5c",
    cardBorder: "rgba(63, 114, 175, 0.35)",
    cardShadow: "0 4px 16px rgba(0, 0, 0, 0.35), 0 1px 4px rgba(0, 0, 0, 0.2)",
    cardHoverShadow:
      "0 12px 28px rgba(0, 0, 0, 0.45), 0 4px 12px rgba(63, 114, 175, 0.25)",
    inputBg: "#152a45",
    surface: "#1a3a5c",
    surfaceMuted: "rgba(26, 58, 92, 0.85)",
    overlayBg: "rgba(0, 0, 0, 0.65)",
    fabLabelBg: "rgba(26, 58, 92, 0.92)",
    skeletonBase: "#152a45",
    skeletonShimmer: "#1a3a5c",
    dragOverlayShadow:
      "0 24px 48px rgba(0, 0, 0, 0.5), 0 8px 24px rgba(63, 114, 175, 0.3)",
    focusRing: "rgba(63, 114, 175, 0.45)",
    star: "#e6a817",
  },
};

export const THEME_STORAGE_KEY = "notes-theme";

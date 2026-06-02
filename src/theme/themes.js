export const lightTheme = {
  mode: "light",
  colors: {
    periwinkle: "#ADB2D4",
    mist: "#C7D9DD",
    sage: "#D5E5D5",
    cream: "#EEF1DA",
    white: "#FFFFFF",
    text: "#3a3d4a",
    textMuted: "#5c6170",
    error: "#8b4049",
    pageGradient:
      "linear-gradient(145deg, #C7D9DD 0%, #ADB2D4 30%, #D5E5D5 65%, #EEF1DA 100%)",
    authGradient:
      "linear-gradient(145deg, #C7D9DD 0%, #ADB2D4 38%, #D5E5D5 72%, #EEF1DA 100%)",
    cardBg: "#FFFFFF",
    cardBorder: "rgba(173, 178, 212, 0.35)",
    cardShadow: "0 4px 16px rgba(58, 61, 74, 0.08), 0 1px 4px rgba(173, 178, 212, 0.25)",
    cardHoverShadow:
      "0 12px 28px rgba(58, 61, 74, 0.12), 0 4px 12px rgba(173, 178, 212, 0.35)",
    inputBg: "#EEF1DA",
    surface: "#FFFFFF",
    surfaceMuted: "rgba(255, 255, 255, 0.55)",
    overlayBg: "rgba(58, 61, 74, 0.45)",
    fabLabelBg: "rgba(255, 255, 255, 0.85)",
    skeletonBase: "#EEF1DA",
    skeletonShimmer: "#C7D9DD",
    dragOverlayShadow:
      "0 20px 40px rgba(58, 61, 74, 0.22), 0 8px 24px rgba(173, 178, 212, 0.45)",
  },
};

export const darkTheme = {
  mode: "dark",
  colors: {
    periwinkle: "#ADB2D4",
    mist: "#6b8a94",
    sage: "#4a6b4a",
    cream: "#1e2a3a",
    white: "#16213e",
    text: "#e0e0e0",
    textMuted: "#a0a8b8",
    error: "#e07070",
    pageGradient:
      "linear-gradient(145deg, #1a1a2e 0%, #16213e 35%, #1e3a2e 70%, #1a1a2e 100%)",
    authGradient:
      "linear-gradient(145deg, #1a1a2e 0%, #16213e 40%, #1e3a2e 75%, #1a1a2e 100%)",
    cardBg: "#16213e",
    cardBorder: "rgba(173, 178, 212, 0.2)",
    cardShadow: "0 4px 16px rgba(0, 0, 0, 0.35), 0 1px 4px rgba(0, 0, 0, 0.2)",
    cardHoverShadow:
      "0 12px 28px rgba(0, 0, 0, 0.45), 0 4px 12px rgba(173, 178, 212, 0.15)",
    inputBg: "#1e2a3a",
    surface: "#16213e",
    surfaceMuted: "rgba(22, 33, 62, 0.75)",
    overlayBg: "rgba(0, 0, 0, 0.65)",
    fabLabelBg: "rgba(22, 33, 62, 0.9)",
    skeletonBase: "#1e2a3a",
    skeletonShimmer: "#2a3f5f",
    dragOverlayShadow:
      "0 24px 48px rgba(0, 0, 0, 0.5), 0 8px 24px rgba(173, 178, 212, 0.2)",
  },
};

export const THEME_STORAGE_KEY = "notes-theme";

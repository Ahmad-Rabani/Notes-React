import { PALETTE } from "../../theme/themes";

/** Preset ids stored in Firebase on each note as `cardColor` */
export const CARD_COLOR_PRESETS = [
  {
    id: "default",
    label: "Default",
    swatch: PALETTE.snow,
    light: null,
    dark: null,
  },
  {
    id: "snow",
    label: "Snow",
    swatch: PALETTE.snow,
    light: {
      bg: PALETTE.snow,
      border: "rgba(63, 114, 175, 0.32)",
      accent: PALETTE.primary,
    },
    dark: {
      bg: "#223a55",
      border: "rgba(219, 226, 239, 0.22)",
      accent: PALETTE.paleBlue,
    },
  },
  {
    id: "paleBlue",
    label: "Pale Blue",
    swatch: PALETTE.paleBlue,
    light: {
      bg: PALETTE.paleBlue,
      border: "rgba(63, 114, 175, 0.4)",
      accent: PALETTE.primary,
    },
    dark: {
      bg: "#1a3350",
      border: "rgba(63, 114, 175, 0.45)",
      accent: "#7aa3d4",
    },
  },
  {
    id: "primary",
    label: "Ocean",
    swatch: PALETTE.primary,
    light: {
      bg: "rgba(63, 114, 175, 0.14)",
      border: "rgba(63, 114, 175, 0.55)",
      accent: PALETTE.primary,
    },
    dark: {
      bg: "rgba(63, 114, 175, 0.32)",
      border: "rgba(63, 114, 175, 0.65)",
      accent: "#8ab4e8",
    },
  },
  {
    id: "navy",
    label: "Navy",
    swatch: PALETTE.navy,
    light: {
      bg: "rgba(17, 45, 78, 0.07)",
      border: "rgba(17, 45, 78, 0.35)",
      accent: PALETTE.navy,
    },
    dark: {
      bg: "#0f2238",
      border: "rgba(219, 226, 239, 0.18)",
      accent: PALETTE.paleBlue,
    },
  },
  {
    id: "sky",
    label: "Sky",
    swatch: "#b8d4ef",
    light: {
      bg: "#e4f0fa",
      border: "rgba(63, 114, 175, 0.38)",
      accent: PALETTE.primary,
    },
    dark: {
      bg: "#1c3348",
      border: "rgba(184, 212, 239, 0.28)",
      accent: "#b8d4ef",
    },
  },
  {
    id: "slate",
    label: "Slate",
    swatch: "#8fa3bc",
    light: {
      bg: "#eef2f7",
      border: "rgba(17, 45, 78, 0.22)",
      accent: "#5a7490",
    },
    dark: {
      bg: "#243447",
      border: "rgba(143, 163, 188, 0.3)",
      accent: "#a8bdd4",
    },
  },
  {
    id: "rose",
    label: "Rose",
    swatch: "#d4848a",
    light: {
      bg: "#fceef0",
      border: "rgba(196, 100, 110, 0.35)",
      accent: "#b85a64",
    },
    dark: {
      bg: "#3d2428",
      border: "rgba(212, 132, 138, 0.35)",
      accent: "#e8a8ae",
    },
  },
];

export const getCardColorPreset = (colorId) =>
  CARD_COLOR_PRESETS.find((preset) => preset.id === colorId) ??
  CARD_COLOR_PRESETS[0];

export const getCardSurfaceStyles = (colorId, isDark) => {
  const preset = getCardColorPreset(colorId);
  if (!preset || preset.id === "default") return null;
  return isDark ? preset.dark : preset.light;
};

export const DEFAULT_CARD_COLOR = "default";

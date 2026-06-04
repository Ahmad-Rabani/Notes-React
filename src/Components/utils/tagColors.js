/**
 * Tag color presets for light and dark themes
 * Each tag color is visually distinct but harmonizes with the app theme
 */

export const TAG_COLOR_PRESETS = [
  {
    id: "work",
    label: "Work",
    light: { bg: "rgba(63, 114, 175, 0.15)", text: "#3F72AF", border: "rgba(63, 114, 175, 0.5)" },
    dark: { bg: "rgba(139, 180, 232, 0.2)", text: "#8BB4E8", border: "rgba(139, 180, 232, 0.6)" },
  },
  {
    id: "personal",
    label: "Personal",
    light: { bg: "rgba(230, 168, 23, 0.12)", text: "#e6a817", border: "rgba(230, 168, 23, 0.5)" },
    dark: { bg: "rgba(230, 168, 23, 0.18)", text: "#f5c55c", border: "rgba(230, 168, 23, 0.6)" },
  },
  {
    id: "ideas",
    label: "Ideas",
    light: { bg: "rgba(156, 39, 176, 0.12)", text: "#9c27b0", border: "rgba(156, 39, 176, 0.5)" },
    dark: { bg: "rgba(186, 104, 200, 0.2)", text: "#ba68c8", border: "rgba(186, 104, 200, 0.6)" },
  },
  {
    id: "urgent",
    label: "Urgent",
    light: { bg: "rgba(196, 77, 77, 0.12)", text: "#c44d4d", border: "rgba(196, 77, 77, 0.5)" },
    dark: { bg: "rgba(240, 128, 128, 0.18)", text: "#f08080", border: "rgba(240, 128, 128, 0.6)" },
  },
  {
    id: "review",
    label: "Review",
    light: { bg: "rgba(76, 175, 80, 0.12)", text: "#4CAF50", border: "rgba(76, 175, 80, 0.5)" },
    dark: { bg: "rgba(129, 199, 132, 0.2)", text: "#81c784", border: "rgba(129, 199, 132, 0.6)" },
  },
  {
    id: "reference",
    label: "Reference",
    light: { bg: "rgba(33, 150, 243, 0.12)", text: "#2196F3", border: "rgba(33, 150, 243, 0.5)" },
    dark: { bg: "rgba(100, 181, 246, 0.2)", text: "#64b5f6", border: "rgba(100, 181, 246, 0.6)" },
  },
];

/**
 * Get color preset by ID or return default
 */
export const getTagColorPreset = (tagId) => {
  const preset = TAG_COLOR_PRESETS.find((p) => p.id === tagId);
  return preset || TAG_COLOR_PRESETS[0]; // Fallback to first preset
};

/**
 * Generate a color for custom tags not in presets
 * Uses a hash-based approach for consistency
 */
export const generateTagColor = (tagName, theme = "light") => {
  const hash = tagName
    .split("")
    .reduce((acc, char) => ((acc << 5) - acc + char.charCodeAt(0)) | 0, 0);
  const presets = TAG_COLOR_PRESETS;
  const colorPreset = presets[Math.abs(hash) % presets.length];
  return colorPreset[theme];
};

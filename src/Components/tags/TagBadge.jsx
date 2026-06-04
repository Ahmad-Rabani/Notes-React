import React from "react";
import { useTheme } from "styled-components";
import { TagBadgeContainer } from "./tagStyles";
import { getTagColorPreset } from "../utils/tagColors";

/**
 * TagBadge Component
 * Displays a single tag with color styling based on theme
 *
 * @param {string} tag - Tag name to display
 * @param {function} onRemove - Optional callback when remove button clicked
 * @param {boolean} removable - Whether to show remove button (for input)
 */
const TagBadge = ({ tag, onRemove, removable = false }) => {
  const theme = useTheme();
  const preset = getTagColorPreset(tag);

  // Get colors for current theme
  const colors = preset[theme.mode] || preset.light;

  const handleRemove = (e) => {
    e.stopPropagation();
    if (onRemove) onRemove(tag);
  };

  return (
    <TagBadgeContainer
      bgColor={colors.bg}
      textColor={colors.text}
      borderColor={colors.border}
      title={tag}
    >
      <span>#{tag}</span>
      {removable && (
        <button
          type="button"
          onClick={handleRemove}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center",
            color: "inherit",
            opacity: 0.7,
            transition: "opacity 0.15s ease",
          }}
          onMouseEnter={(e) => (e.target.style.opacity = "1")}
          onMouseLeave={(e) => (e.target.style.opacity = "0.7")}
          aria-label={`Remove tag ${tag}`}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
            close
          </span>
        </button>
      )}
    </TagBadgeContainer>
  );
};

export default TagBadge;

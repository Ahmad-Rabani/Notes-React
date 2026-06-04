import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "styled-components";
import TagBadge from "./TagBadge";
import {
  TagInputWrapper,
  TagInputLabel,
  TagInputField,
  TagSuggestions,
  TagSuggestionButton,
  TagsDisplayContainer,
} from "./tagStyles";
import { normalizeTags, sortTags } from "../utils/tagUtils";

/**
 * TagInput Component
 * Allows users to add/remove tags for a note
 * Includes tag suggestions and validation
 *
 * @param {string[]} tags - Current tags on the note
 * @param {function} onChange - Callback when tags change: (newTags) => void
 * @param {string[]} suggestions - Suggested tags to show
 */
const TagInput = ({ tags = [], onChange, suggestions = [] }) => {
  const theme = useTheme();
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  // Get sorted suggestions
  const sortedSuggestions = sortTags(suggestions).filter(
    (tag) => !tags.includes(tag)
  );

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    // Add tag on Enter, comma, or space
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      const normalized = normalizeTags(input);

      if (normalized.length > 0) {
        const newTag = normalized[0];
        if (!tags.includes(newTag)) {
          onChange([...tags, newTag]);
          setInput("");
        }
      }
    }

    // Remove last tag on Backspace if input is empty
    if (e.key === "Backspace" && input === "" && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const handleAddTag = (tagName) => {
    if (!tags.includes(tagName)) {
      onChange([...tags, tagName]);
      setInput("");
      inputRef.current?.focus();
    }
  };

  const handleRemoveTag = (tagName) => {
    onChange(tags.filter((t) => t !== tagName));
  };

  const handleInputBlur = () => {
    // Try to add whatever is in the input on blur
    const normalized = normalizeTags(input);
    if (normalized.length > 0) {
      const newTag = normalized[0];
      if (!tags.includes(newTag)) {
        onChange([...tags, newTag]);
        setInput("");
      } else {
        setInput("");
      }
    } else {
      setInput("");
    }
  };

  return (
    <TagInputWrapper theme={theme}>
      <TagInputLabel theme={theme} htmlFor="tag-input">
        Tags
        <span style={{ marginLeft: "4px", opacity: 0.6, fontWeight: "400" }}>
          (Optional)
        </span>
      </TagInputLabel>

      <TagInputField
        ref={inputRef}
        id="tag-input"
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onBlur={handleInputBlur}
        placeholder="Type tag and press Enter or comma…"
        theme={theme}
      />

      {/* Display current tags */}
      {tags.length > 0 && (
        <TagsDisplayContainer>
          {tags.map((tag) => (
            <TagBadge
              key={tag}
              tag={tag}
              removable={true}
              onRemove={handleRemoveTag}
            />
          ))}
        </TagsDisplayContainer>
      )}

      {/* Show tag suggestions */}
      {sortedSuggestions.length > 0 && (
        <>
          <div style={{ fontSize: "12px", fontWeight: "500", color: theme.colors.textMuted }}>
            Suggested tags:
          </div>
          <TagSuggestions>
            {sortedSuggestions.slice(0, 5).map((tag) => (
              <TagSuggestionButton
                key={tag}
                type="button"
                onClick={() => handleAddTag(tag)}
                theme={theme}
              >
                + {tag}
              </TagSuggestionButton>
            ))}
          </TagSuggestions>
        </>
      )}
    </TagInputWrapper>
  );
};

export default TagInput;

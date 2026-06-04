import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { toggleTagFilter, clearTagFilters } from "./_redux/TagSlice";
import {
  TagFilterWrapper,
  TagFilterLabel,
  TagFilterButton,
  ClearFiltersButton,
} from "./tagStyles";
import { extractUniqueTags, sortTags } from "../utils/tagUtils";
import { getTagColorPreset } from "../utils/tagColors";

/**
 * TagFilterBar Component (Horizontal)
 * Displays all tags from user's notes in a scrollable horizontal bar
 * Positioned below the search bar for easy access
 *
 * @param {Array} notes - All notes to extract tags from
 */
const TagFilterBar = ({ notes }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const selectedTags = useSelector((state) => state.tags.selectedTags);

  // Extract unique tags and their counts
  const tagMap = useMemo(() => extractUniqueTags(notes), [notes]);
  const sortedTags = useMemo(() => sortTags(Object.keys(tagMap)), [tagMap]);

  const handleTagClick = (tag) => {
    dispatch(toggleTagFilter(tag));
  };

  const handleClearFilters = () => {
    dispatch(clearTagFilters());
  };

  // Don't show if no tags exist
  if (sortedTags.length === 0) {
    return null;
  }

  return (
    <TagFilterWrapper theme={theme}>
      <TagFilterLabel theme={theme}>Tags:</TagFilterLabel>

      {sortedTags.map((tag) => {
        const preset = getTagColorPreset(tag);
        const colors = preset[theme.mode] || preset.light;
        const isActive = selectedTags.includes(tag);

        return (
          <TagFilterButton
            key={tag}
            onClick={() => handleTagClick(tag)}
            isActive={isActive}
            bgColor={colors.bg}
            textColor={colors.text}
            theme={theme}
            title={isActive ? `Remove ${tag} filter` : `Filter by ${tag}`}
          >
            #{tag}
          </TagFilterButton>
        );
      })}

      {selectedTags.length > 0 && (
        <ClearFiltersButton
          onClick={handleClearFilters}
          theme={theme}
          title="Clear all tag filters"
        >
          <span className="material-symbols-outlined">close</span>
          Clear
        </ClearFiltersButton>
      )}
    </TagFilterWrapper>
  );
};

export default TagFilterBar;

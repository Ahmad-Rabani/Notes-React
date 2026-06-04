import { createSlice } from "@reduxjs/toolkit";

/**
 * TagSlice - manages tag filtering and UI state
 * Tags are derived from notes data, not stored separately for simplicity
 */
const tagSlice = createSlice({
  name: "tags",
  initialState: {
    selectedTags: [], // Tags currently filtered by
    tagSidebar: true, // Whether sidebar is visible (for mobile)
  },
  reducers: {
    /**
     * Toggle a tag in the filter
     * If tag is already selected, remove it; otherwise add it
     */
    toggleTagFilter: (state, action) => {
      const tag = action.payload;
      const index = state.selectedTags.indexOf(tag);

      if (index > -1) {
        state.selectedTags.splice(index, 1);
      } else {
        state.selectedTags.push(tag);
      }
    },

    /**
     * Set multiple tags as filters (replace current)
     */
    setTagFilters: (state, action) => {
      state.selectedTags = action.payload || [];
    },

    /**
     * Clear all tag filters
     */
    clearTagFilters: (state) => {
      state.selectedTags = [];
    },

    /**
     * Toggle sidebar visibility (mobile)
     */
    toggleTagSidebar: (state) => {
      state.tagSidebar = !state.tagSidebar;
    },

    /**
     * Close tag sidebar (mobile)
     */
    closeTagSidebar: (state) => {
      state.tagSidebar = false;
    },
  },
});

export const {
  toggleTagFilter,
  setTagFilters,
  clearTagFilters,
  toggleTagSidebar,
  closeTagSidebar,
} = tagSlice.actions;

export default tagSlice.reducer;

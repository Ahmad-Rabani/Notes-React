/**
 * Tag utility functions for filtering, validation, and manipulation
 */

/**
 * Validate a tag name
 * @param {string} tag - Tag to validate
 * @returns {boolean} True if valid
 */
export const isValidTag = (tag) => {
  if (!tag || typeof tag !== "string") return false;
  const trimmed = tag.trim();
  // Tags: 1-30 chars, alphanumeric + hyphens/underscores, no spaces
  return /^[a-z0-9\-_]{1,30}$/i.test(trimmed);
};

/**
 * Normalize tag input (lowercase, trim, remove duplicates)
 * @param {string} tagsInput - Comma or space separated tags
 * @returns {string[]} Array of normalized tags
 */
export const normalizeTags = (tagsInput) => {
  if (!tagsInput || typeof tagsInput !== "string") return [];

  return (
    tagsInput
      .split(/[,\s]+/)
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => isValidTag(tag))
      // Remove duplicates while preserving first occurrence
      .filter((tag, idx, arr) => arr.indexOf(tag) === idx)
  );
};

/**
 * Filter notes by selected tags (OR logic: note matches if it has ANY selected tag)
 * @param {Array} notes - Array of note objects
 * @param {string[]} selectedTags - Array of tag names to filter by
 * @returns {Array} Filtered notes
 */
export const filterNotesByTags = (notes, selectedTags) => {
  if (!selectedTags || selectedTags.length === 0) return notes;

  return notes.filter((note) => {
    const noteTags = note.tags || [];
    return selectedTags.some((tag) => noteTags.includes(tag));
  });
};

/**
 * Extract unique tags from all notes (for sidebar rendering)
 * @param {Array} notes - Array of note objects
 * @returns {Object} { tagName: count, ... }
 */
export const extractUniqueTags = (notes) => {
  const tagMap = {};

  notes.forEach((note) => {
    if (Array.isArray(note.tags)) {
      note.tags.forEach((tag) => {
        tagMap[tag] = (tagMap[tag] || 0) + 1;
      });
    }
  });

  return tagMap;
};

/**
 * Sort tags alphabetically
 * @param {string[]} tags - Array of tag names
 * @returns {string[]} Sorted tags
 */
export const sortTags = (tags) => {
  return [...tags].sort((a, b) => a.localeCompare(b));
};

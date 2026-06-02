export const filterNotes = (notes, query) => {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return notes;

  return notes.filter((note) => {
    const name = (note.name || "").toLowerCase();
    const description = (note.description || "").toLowerCase();
    const date = (note.date || "").toLowerCase();
    return (
      name.includes(trimmed) ||
      description.includes(trimmed) ||
      date.includes(trimmed)
    );
  });
};

export const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const TONAL_WORDS = [
  {
    tone: "warmth",
    words: ["grateful", "thank", "kind", "soft", "home", "safe", "cozy", "comfort", "love", "gentle"],
    phrase: "A warm thought deserves a quiet place.",
  },
  {
    tone: "curiosity",
    words: ["wonder", "dream", "idea", "maybe", "imagine", "discover", "explore", "curious", "future"],
    phrase: "A curious spark is ready to guide you.",
  },
  {
    tone: "calm",
    words: ["breathe", "slow", "calm", "still", "peace", "gentle", "ease", "rest", "softly"],
    phrase: "A calm memory is glowing softly.",
  },
  {
    tone: "hope",
    words: ["hope", "soon", "better", "believe", "grow", "possible", "brave", "again"],
    phrase: "Hope finds its way back to you.",
  },
];

const normalizeText = (text = "") =>
  text
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const noteScore = (note) => {
  const text = normalizeText(`${note.name} ${note.description} ${(note.tags || []).join(" ")}`);
  let score = 0;

  TONAL_WORDS.forEach((group, index) => {
    const matches = group.words.filter((word) => text.includes(word));
    if (matches.length > 0) {
      score += (matches.length * 1.2) + (TONAL_WORDS.length - index) * 0.25;
    }
  });

  if (note.stared) score += 1.1;
  if (note.tags?.length > 0) score += 0.2;
  if (note.description?.length > 80) score += 0.15;

  return score;
};

const extractPhrase = (note) => {
  const text = normalizeText(note.description || note.name || "");
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (sentences.length > 0) {
    return sentences[0].length <= 120 ? sentences[0] : sentences[0].slice(0, 120).trim() + "…";
  }
  return (note.description || note.name || "A quiet note from your own words.").slice(0, 120);
};

export const selectGuidingNote = (notes = []) => {
  if (!notes || notes.length === 0) return null;

  const scoredNotes = notes.map((note) => ({ note, score: noteScore(note) }));
  scoredNotes.sort((a, b) => b.score - a.score);

  const [top] = scoredNotes;
  if (!top) return null;

  const selected = top.score > 0 ? top.note : notes[0];
  const summary = extractPhrase(selected);
  const matchingTone = TONAL_WORDS.find((group) =>
    normalizeText(`${selected.name} ${selected.description} ${(selected.tags || []).join(" ")}`).split(" ").some((token) => group.words.includes(token))
  );

  return {
    note: selected,
    moodPhrase: matchingTone?.phrase || "A personal note is shining quietly.",
    excerpt: summary,
  };
};

export const compassGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 6) return "Before dawn, your thoughts feel soft.";
  if (hour < 12) return "This morning, your compass leans toward calm.";
  if (hour < 17) return "This afternoon, a gentle note is ready.";
  if (hour < 21) return "This evening, your words glow warm.";
  return "Tonight, the quiet compass finds one gentle memory.";
};

export const formatCompassDate = (dateValue) => {
  try {
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
};

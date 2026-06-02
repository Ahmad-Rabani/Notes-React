import { HighlightMark } from "../Show Card/noteCardStyles";
import { escapeRegex } from "./noteSearch";

const HighlightText = ({ text = "", query = "" }) => {
  if (!text) return null;

  const trimmed = query.trim();
  if (!trimmed) return text;

  const parts = text.split(new RegExp(`(${escapeRegex(trimmed)})`, "gi"));

  return parts.map((part, index) =>
    part.toLowerCase() === trimmed.toLowerCase() ? (
      <HighlightMark key={`${part}-${index}`}>{part}</HighlightMark>
    ) : (
      part
    )
  );
};

export default HighlightText;

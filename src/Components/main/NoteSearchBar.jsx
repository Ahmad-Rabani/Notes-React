import { forwardRef } from "react";
import {
  SearchBarWrapper,
  SearchClearButton,
  SearchFieldRow,
  SearchHint,
  SearchIcon,
  SearchInput,
  SearchMeta,
  SearchResultsBanner,
} from "./notesPageStyles";

const NoteSearchBar = forwardRef(
  ({ value, onChange, resultCount, totalCount, isActive }, ref) => {
    const handleClear = () => onChange("");

    return (
      <SearchBarWrapper>
        <SearchFieldRow>
          <SearchIcon className="material-symbols-outlined" aria-hidden="true">
            search
          </SearchIcon>
          <SearchInput
            ref={ref}
            type="search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search notes by title, description, or date…"
            aria-label="Search notes"
            autoComplete="off"
            spellCheck={false}
          />
          {value && (
            <SearchClearButton
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <span className="material-symbols-outlined">close</span>
            </SearchClearButton>
          )}
          <SearchHint aria-hidden="true">
            <kbd>Ctrl</kbd>
            <span>K</span>
          </SearchHint>
        </SearchFieldRow>

        {isActive ? (
          <SearchResultsBanner role="status" aria-live="polite">
            {resultCount === 0
              ? `No notes match "${value.trim()}"`
              : `${resultCount} of ${totalCount} note${totalCount === 1 ? "" : "s"} found`}
          </SearchResultsBanner>
        ) : (
          <SearchMeta>
            {totalCount} note{totalCount === 1 ? "" : "s"} · search to find anything fast
          </SearchMeta>
        )}
      </SearchBarWrapper>
    );
  }
);

NoteSearchBar.displayName = "NoteSearchBar";

export default NoteSearchBar;

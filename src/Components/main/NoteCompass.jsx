import { useEffect, useMemo } from "react";
import {
  CompassOverlay,
  CompassPanel,
  CompassHeader,
  CompassTitle,
  CompassTone,
  CompassCard,
  CompassNoteTitle,
  CompassExcerpt,
  CompassFooter,
  CompassLabel,
  CompassActionGroup,
  CompassAction,
  CompassClose,
  NoNotesMessage,
} from "./notesPageStyles";
import { compassGreeting, formatCompassDate, selectGuidingNote } from "../utils/compassUtils";

const getTodayKey = (userUid) => `quietCompassLastSeen_${userUid || "guest"}`;

const readSeenToday = (userUid) => {
  if (typeof window === "undefined") return false;
  try {
    const stored = window.localStorage.getItem(getTodayKey(userUid));
    return stored === new Date().toISOString().slice(0, 10);
  } catch {
    return false;
  }
};

const markSeenToday = (userUid) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(getTodayKey(userUid), new Date().toISOString().slice(0, 10));
  } catch {
    // ignore storage failure
  }
};

const NoteCompass = ({ notes = [], userUid, onOpen, onClose, isOpen }) => {
  const guiding = useMemo(() => selectGuidingNote(notes), [notes]);
  const greeting = compassGreeting();
  const hasNotes = notes.length > 0;

  useEffect(() => {
    if (isOpen) {
      markSeenToday(userUid);
      onOpen?.();
    }
  }, [isOpen, onOpen, userUid]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <CompassOverlay role="dialog" aria-modal="true" aria-label="Quiet compass" onClick={onClose}>
      <CompassPanel onClick={(event) => event.stopPropagation()}>
        <CompassHeader>
          <div>
            <CompassTitle>Quiet Compass</CompassTitle>
            <CompassTone>{greeting}</CompassTone>
          </div>
          <CompassClose type="button" onClick={onClose} aria-label="Close quiet compass">
            ✕
          </CompassClose>
        </CompassHeader>

        {hasNotes && guiding ? (
          <>
            <CompassTone>{guiding.moodPhrase}</CompassTone>
          <CompassCard>
            <CompassNoteTitle>{guiding.note.name || "A quiet note"}</CompassNoteTitle>
            <CompassExcerpt>{guiding.excerpt}</CompassExcerpt>
          </CompassCard>

          <CompassFooter>
            <CompassLabel>
              {guiding.note.date ? `From ${formatCompassDate(guiding.note.date)}` : "From your notes"}
            </CompassLabel>
            <CompassActionGroup>
              <CompassAction type="button" $primary onClick={onClose}>
                Keep it glowing
              </CompassAction>
              <CompassAction type="button" onClick={onClose}>
                Close
              </CompassAction>
            </CompassActionGroup>
          </CompassFooter>
          </>
        ) : (
          <NoNotesMessage>
            Your compass is patiently waiting for a note. Create one, and this gentle ritual will bring it back to you whenever you need a soft reminder.
          </NoNotesMessage>
        )}
      </CompassPanel>
    </CompassOverlay>
  );
};

export { NoteCompass, readSeenToday };

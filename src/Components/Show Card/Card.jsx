import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, toggleStar } from "./_redux/ShowCardSlice";
import { saveNote } from "../card/_redux/CardSlice";
import { updateCardColor } from "./_redux/cardColorActions";
import { SmLoader } from "../loader/Loading";
import AnimatedCard from "./AnimatedCard";
import HighlightText from "../utils/HighlightText";
import CardColorPicker from "./CardColorPicker";
import TagBadge from "../tags/TagBadge";
import TagInput from "../tags/TagInput";
import { extractUniqueTags } from "../utils/tagUtils";
import {
  DEFAULT_CARD_COLOR,
  getCardSurfaceStyles,
} from "../utils/cardColors";
import { useTheme } from "../../theme/ThemeProvider";
import {
  ActionButton,
  CardActions,
  CardDate,
  CardDescription,
  CardHeader,
  CardTitle,
  CloseButton,
  EditActions,
  EditFieldGroup,
  EditForm,
  EditFormHeader,
  EditFormSubtitle,
  EditFormTitle,
  FieldInput,
  FieldLabel,
  FieldTextarea,
  IconButton,
  NoteCard,
  SaveCheck,
  ViewContent,
  WordCount,
} from "./noteCardStyles";

const stopDrag = (e) => {
  e.stopPropagation();
};

const ShowCard = ({
  data,
  userUid,
  isEntering = false,
  isExiting = false,
  onExitComplete,
  dragProps = null,
  searchQuery = "",
}) => {
  const dispatch = useDispatch();
  const { isDark } = useTheme();
  const { status: saveStatus } = useSelector((state) => state.model);
  const { data: allNotes } = useSelector((state) => state.main);

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: data.name,
    description: data.description,
    date: data.date,
    tags: data.tags || [],
  });
  const [editWords, setEditWords] = useState(0);
  const [isStarLoading, setStarLoading] = useState(false);
  const [isColorSaving, setColorSaving] = useState(false);
  const [isColorPickerOpen, setColorPickerOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletePulse, setDeletePulse] = useState(false);
  const [showSaveCheck, setShowSaveCheck] = useState(false);
  const [savedPulse, setSavedPulse] = useState(false);

  const nameRef = useRef(null);

  // Extract tags from all notes for suggestions
  const tagSuggestions = useMemo(() => {
    const tagMap = extractUniqueTags(allNotes);
    return Object.keys(tagMap).sort();
  }, [allNotes]);

  const cardColorId = data.cardColor || DEFAULT_CARD_COLOR;
  const surfaceStyles = useMemo(
    () => getCardSurfaceStyles(cardColorId, isDark),
    [cardColorId, isDark]
  );

  const isDraggable = Boolean(dragProps && !isEditing && !isColorPickerOpen);
  const isDragging = dragProps?.isDragging ?? false;

  useEffect(() => {
    if (isEditing && nameRef.current) {
      nameRef.current.focus();
    }
  }, [isEditing]);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (isDeleting) return;
    setDeletePulse(true);
    setTimeout(() => {
      setIsDeleting(true);
    }, 200);
  };

  const handleExitComplete = () => {
    dispatch(deleteNote({ noteId: data.id, userUid }));
    onExitComplete?.();
  };

  const handleStar = (e) => {
    e.stopPropagation();
    setStarLoading(true);
    dispatch(toggleStar({ noteId: data.id, userUid })).finally(() => {
      setStarLoading(false);
    });
  };

  const handleColorSelect = (colorId) => {
    if (colorId === cardColorId) {
      setColorPickerOpen(false);
      return;
    }

    setColorSaving(true);
    dispatch(updateCardColor({ noteId: data.id, userUid, cardColor: colorId }))
      .finally(() => {
        setColorSaving(false);
        setColorPickerOpen(false);
      });
  };

  const handleEditOpen = (e) => {
    e.stopPropagation();
    setColorPickerOpen(false);
    const description = data.description ?? "";
    setEditForm({
      name: data.name ?? "",
      description,
      date: data.date ?? "",
      tags: data.tags ?? [],
    });
    const wordList = description.trim().split(/\s+/);
    setEditWords(wordList.filter(Boolean).length);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleEditChange = (field) => (e) => {
    const value = e.target.value;
    setEditForm((prev) => ({ ...prev, [field]: value }));

    if (field === "description") {
      const wordList = value.trim().split(/\s+/);
      setEditWords(wordList.filter(Boolean).length);
    }
  };

  const handleTagsChange = (newTags) => {
    setEditForm((prev) => ({ ...prev, tags: newTags }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const noteData = {
      name: editForm.name.trim(),
      description: editForm.description.trim(),
      date: editForm.date,
      tags: editForm.tags,
    };

    dispatch(saveNote({ updatingData: data, userUid, noteData })).then(() => {
      setIsEditing(false);
      setShowSaveCheck(true);
      setSavedPulse(true);

      setTimeout(() => setShowSaveCheck(false), 1200);
      setTimeout(() => setSavedPulse(false), 700);
    });
  };

  return (
    <AnimatedCard
      isEntering={isEntering}
      isExiting={isDeleting || isExiting}
      onExitComplete={handleExitComplete}
    >
      <NoteCard
        $isEditing={isEditing}
        $savedPulse={savedPulse}
        $isDragging={isDragging}
        $isDraggable={isDraggable}
        $surfaceBg={surfaceStyles?.bg}
        $surfaceBorder={surfaceStyles?.border}
        data-dragging={isDragging ? "true" : undefined}
        data-editing={isEditing ? "true" : undefined}
        aria-label={`Note: ${data.name}`}
        {...(isDraggable ? dragProps.listeners : {})}
        {...(isDraggable ? dragProps.attributes : {})}
      >
        {!isEditing && (
          <CloseButton
            type="button"
            $pulse={deletePulse}
            onClick={handleDelete}
            onPointerDown={stopDrag}
            disabled={isDeleting}
            aria-label={`Delete note ${data.name}`}
          >
            {isDeleting ? (
              <SmLoader />
            ) : (
              <span className="material-symbols-outlined">close</span>
            )}
          </CloseButton>
        )}

        {showSaveCheck && (
          <SaveCheck aria-hidden="true">
            <span className="material-symbols-outlined">check</span>
          </SaveCheck>
        )}

        {!isEditing ? (
          <ViewContent>
            <CardHeader $accentColor={surfaceStyles?.accent}>
              <CardTitle>
                <HighlightText text={data.name} query={searchQuery} />
              </CardTitle>
            </CardHeader>
            <CardDescription>
              <HighlightText text={data.description} query={searchQuery} />
            </CardDescription>
            <CardDate dateTime={data.date}>
              <HighlightText text={data.date} query={searchQuery} />
            </CardDate>

            {/* Display tags if present */}
            {data.tags && data.tags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "12px" }}>
                {data.tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </div>
            )}

            <CardActions className="card-actions">
              <CardColorPicker
                currentColor={cardColorId}
                onSelect={handleColorSelect}
                isOpen={isColorPickerOpen}
                onToggle={setColorPickerOpen}
                isSaving={isColorSaving}
              />
              <IconButton
                type="button"
                onClick={handleEditOpen}
                onPointerDown={stopDrag}
                aria-label={`Edit note ${data.name}`}
              >
                <span className="material-symbols-outlined">edit</span>
              </IconButton>
              <IconButton
                type="button"
                $active={data.stared}
                onClick={handleStar}
                onPointerDown={stopDrag}
                disabled={isStarLoading}
                aria-label={data.stared ? "Unstar note" : "Star note"}
                aria-pressed={data.stared}
              >
                {isStarLoading ? (
                  <SmLoader />
                ) : (
                  <span className="material-symbols-outlined">star</span>
                )}
              </IconButton>
            </CardActions>
          </ViewContent>
        ) : (
          <EditForm onSubmit={handleEditSubmit} onPointerDown={stopDrag}>
            <EditFormHeader>
              <EditFormTitle>
                <span className="material-symbols-outlined">edit_note</span>
                Edit Note
              </EditFormTitle>
              <EditFormSubtitle>Update your note details below.</EditFormSubtitle>
            </EditFormHeader>

            <EditFieldGroup>
              <FieldLabel htmlFor={`title-${data.id}`}>
                <span className="material-symbols-outlined">title</span>
                Name
              </FieldLabel>
              <FieldInput
                id={`title-${data.id}`}
                ref={nameRef}
                name="title"
                type="text"
                placeholder="Note title"
                value={editForm.name}
                onChange={handleEditChange("name")}
                required
              />
            </EditFieldGroup>

            <EditFieldGroup>
              <FieldLabel htmlFor={`desc-${data.id}`}>
                <span className="material-symbols-outlined">notes</span>
                Description
              </FieldLabel>
              <FieldTextarea
                id={`desc-${data.id}`}
                name="desc"
                placeholder="Write your note here…"
                maxLength={300}
                value={editForm.description}
                onChange={handleEditChange("description")}
                required
              />
              <WordCount>{editWords} words · max 300 characters</WordCount>
            </EditFieldGroup>

            <EditFieldGroup>
              <FieldLabel htmlFor={`date-${data.id}`}>
                <span className="material-symbols-outlined">calendar_today</span>
                Date
              </FieldLabel>
              <FieldInput
                id={`date-${data.id}`}
                name="date"
                type="date"
                value={editForm.date}
                onChange={handleEditChange("date")}
                required
              />
            </EditFieldGroup>

            <EditFieldGroup>
              <TagInput
                tags={editForm.tags}
                onChange={handleTagsChange}
                suggestions={tagSuggestions}
              />
            </EditFieldGroup>

            <EditActions>
              <ActionButton type="button" onClick={handleEditCancel}>
                Cancel
              </ActionButton>
              <ActionButton
                type="submit"
                $variant="primary"
                disabled={saveStatus === "loading"}
              >
                {saveStatus === "loading" ? "Saving…" : "Save Changes"}
              </ActionButton>
            </EditActions>
          </EditForm>
        )}
      </NoteCard>
    </AnimatedCard>
  );
};

export default React.memo(ShowCard);

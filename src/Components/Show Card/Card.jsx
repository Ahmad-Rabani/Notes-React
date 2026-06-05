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
import usePointerLevitate from "../utils/usePointerLevitate";
import { uploadImage, deleteImage } from "../../services/imageService";
import ImageUploader from "../image/ImageUploader";
import NoteDetailModal from "../image/NoteDetailModal";
import {
  CardThumbnail,
  ThumbnailImg,
  ThumbnailSkeleton,
  ViewDetailBtn,
} from "../image/imageStyles";
import {
  ActionButton,
  CardActions,
  CardDate,
  CardDescription,
  CardHeader,
  CardTitle,
  CloseButton,
  DragHandle,
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

const stopDrag = (e) => e.stopPropagation();

// Small self-contained thumbnail — manages its own "loaded" state
const CardThumbnailImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <CardThumbnail>
      {!loaded && <ThumbnailSkeleton />}
      <ThumbnailImg
        src={src}
        alt={alt}
        $loaded={loaded}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
    </CardThumbnail>
  );
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

  // ── Image state ────────────────────────────────────────────────────────────
  const [pendingImageFile, setPendingImageFile] = useState(null);
  const [removeCurrentImage, setRemoveCurrentImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const nameRef = useRef(null);
  const {
    cardRef,
    cardStyle,
    handlePointerMove,
    handlePointerLeave,
    handlePointerUp,
  } = usePointerLevitate({ enabled: !isEditing && !isColorPickerOpen });

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
  const hasImage = Boolean(data.imageURL);

  useEffect(() => {
    if (isEditing && nameRef.current) {
      nameRef.current.focus();
    }
  }, [isEditing]);

  // Reset image state when edit is closed
  useEffect(() => {
    if (!isEditing) {
      setPendingImageFile(null);
      setRemoveCurrentImage(false);
      setUploadProgress(0);
    }
  }, [isEditing]);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (isDeleting) return;
    setDeletePulse(true);
    setTimeout(() => setIsDeleting(true), 200);
  };

  const handleExitComplete = () => {
    dispatch(deleteNote({ noteId: data.id, userUid, imagePath: data.imagePath }));
    onExitComplete?.();
  };

  const handleStar = (e) => {
    e.stopPropagation();
    setStarLoading(true);
    dispatch(toggleStar({ noteId: data.id, userUid })).finally(() =>
      setStarLoading(false)
    );
  };

  const handleColorSelect = (colorId) => {
    if (colorId === cardColorId) {
      setColorPickerOpen(false);
      return;
    }
    setColorSaving(true);
    dispatch(updateCardColor({ noteId: data.id, userUid, cardColor: colorId })).finally(
      () => {
        setColorSaving(false);
        setColorPickerOpen(false);
      }
    );
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

  const handleEditCancel = () => setIsEditing(false);

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

  // ── Image uploader callbacks ───────────────────────────────────────────────
  const handleFileChange = (file) => {
    setPendingImageFile(file);
    // If user picks a new file, un-flag "remove current"
    if (file) setRemoveCurrentImage(false);
  };

  const handleRemoveCurrentImage = () => {
    setRemoveCurrentImage(true);
    setPendingImageFile(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    let finalImageURL = data.imageURL ?? null;
    let finalImagePath = data.imagePath ?? null;

    // User explicitly removed the existing image
    if (removeCurrentImage) {
      if (data.imagePath) await deleteImage(data.imagePath);
      finalImageURL = null;
      finalImagePath = null;
    }

    // User selected a new file — upload it and replace any old one
    if (pendingImageFile) {
      setUploadError(null);
      try {
        setUploadProgress(1);
        const imageId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        const newPath = `users/${userUid}/notes/${imageId}/image`;
        finalImageURL = await uploadImage(pendingImageFile, newPath, setUploadProgress);
        if (data.imagePath && data.imagePath !== newPath) {
          await deleteImage(data.imagePath);
        }
        finalImagePath = newPath;
      } catch (err) {
        console.error("Image upload failed:", err);
        setUploadError(err.message ?? "Image upload failed.");
        // Fall back to the existing image so the save still completes
        finalImageURL = data.imageURL ?? null;
        finalImagePath = data.imagePath ?? null;
      }
      setUploadProgress(0);
    }

    const noteData = {
      name: editForm.name.trim(),
      description: editForm.description.trim(),
      date: editForm.date,
      tags: editForm.tags,
      imageURL: finalImageURL,
      imagePath: finalImagePath,
    };

    dispatch(saveNote({ updatingData: data, userUid, noteData })).then(() => {
      setIsEditing(false);
      setShowSaveCheck(true);
      setSavedPulse(true);
      setTimeout(() => setShowSaveCheck(false), 1200);
      setTimeout(() => setSavedPulse(false), 700);
    });
  };

  // Derive what the uploader should show for "currentImageURL":
  // - if user flagged remove, show nothing (null)
  // - if user already has a pending new file, the uploader handles its own preview
  const uploaderCurrentURL =
    removeCurrentImage || pendingImageFile ? null : (data.imageURL ?? null);

  const isSaving = saveStatus === "loading";

  return (
    <>
      <AnimatedCard
        isEntering={isEntering}
        isExiting={isDeleting || isExiting}
        onExitComplete={handleExitComplete}
      >
        <NoteCard
          ref={cardRef}
          style={cardStyle}
          $isEditing={isEditing}
          $savedPulse={savedPulse}
          $isDragging={isDragging}
          $isDraggable={isDraggable}
          $hasImage={hasImage && !isEditing}
          $surfaceBg={surfaceStyles?.bg}
          $surfaceBorder={surfaceStyles?.border}
          data-dragging={isDragging ? "true" : undefined}
          data-editing={isEditing ? "true" : undefined}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onPointerUp={handlePointerUp}
          aria-label={`Note: ${data.name}`}
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
              {/* Thumbnail — only when note has an image */}
              {hasImage && (
                <CardThumbnailImage
                  src={data.imageURL}
                  alt={`Image for note: ${data.name}`}
                />
              )}

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

              {data.tags && data.tags.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginTop: "12px",
                  }}
                >
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
                {isDraggable && dragProps ? (
                  <DragHandle
                    type="button"
                    aria-label={`Drag note ${data.name}`}
                    {...dragProps.attributes}
                    {...dragProps.listeners}
                  >
                    <span className="material-symbols-outlined">drag_indicator</span>
                  </DragHandle>
                ) : null}

                {/* View details button — always visible; spotlight when image */}
                <ViewDetailBtn
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDetailOpen(true);
                  }}
                  onPointerDown={stopDrag}
                  aria-label={`View details for note ${data.name}`}
                  title="View details"
                >
                  <span className="material-symbols-outlined">open_in_full</span>
                </ViewDetailBtn>

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

              <EditFieldGroup>
                <ImageUploader
                  id={`img-${data.id}`}
                  currentImageURL={uploaderCurrentURL}
                  onFileChange={handleFileChange}
                  onRemoveCurrent={handleRemoveCurrentImage}
                  uploadProgress={uploadProgress}
                  disabled={isSaving}
                />
              </EditFieldGroup>

              {uploadError && (
                <div
                  role="alert"
                  style={{
                    padding: "0.55rem 0.75rem",
                    borderRadius: "8px",
                    background: "rgba(196,77,77,0.12)",
                    border: "1px solid rgba(196,77,77,0.35)",
                    fontSize: "0.78rem",
                    display: "flex",
                    gap: "0.35rem",
                    alignItems: "flex-start",
                    lineHeight: 1.4,
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "0.95rem", flexShrink: 0, color: "#c44d4d" }}>
                    error
                  </span>
                  <span style={{ color: "#c44d4d" }}>{uploadError}</span>
                </div>
              )}

              <EditActions>
                <ActionButton
                  type="button"
                  onClick={handleEditCancel}
                  disabled={isSaving}
                >
                  Cancel
                </ActionButton>
                <ActionButton
                  type="submit"
                  $variant="primary"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving…" : "Save Changes"}
                </ActionButton>
              </EditActions>
            </EditForm>
          )}
        </NoteCard>
      </AnimatedCard>

      {isDetailOpen && (
        <NoteDetailModal note={data} onClose={() => setIsDetailOpen(false)} />
      )}
    </>
  );
};

export default React.memo(ShowCard);

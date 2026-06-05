import React, { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveNote } from "./_redux/CardSlice";
import TagInput from "../tags/TagInput";
import { extractUniqueTags } from "../utils/tagUtils";
import ImageUploader from "../image/ImageUploader";
import { uploadImage } from "../../services/imageService";
import {
  FieldGroup,
  FieldInput,
  FieldLabel,
  FieldTextarea,
  ModalActions,
  ModalBody,
  ModalButton,
  ModalClose,
  ModalContent,
  ModalForm,
  ModalHeader,
  ModalOverlay,
  ModalSubtitle,
  ModalTitle,
  WordCount,
} from "./createCardStyles";

const EMPTY_FORM = { name: "", description: "", date: "", tags: [] };

const CreateCard = ({ showModel, userUid }) => {
  const refouterDiv = useRef();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.model);
  const { data: allNotes } = useSelector((state) => state.main);

  const [form, setForm] = useState(EMPTY_FORM);
  const [words, setWords] = useState(0);
  const [pendingImageFile, setPendingImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const tagSuggestions = useMemo(() => {
    const tagMap = extractUniqueTags(allNotes);
    return Object.keys(tagMap).sort();
  }, [allNotes]);

  useEffect(() => {
    const handleMouseUp = (event) => {
      if (event.target === refouterDiv.current) showModel(false);
    };
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [showModel]);

  const closeModal = () => showModel(false);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "description") {
      const wordList = value.trim().split(/\s+/);
      setWords(wordList.filter(Boolean).length);
    }
  };

  const handleTagsChange = (newTags) => {
    setForm((prev) => ({ ...prev, tags: newTags }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    let imageURL = null;
    let imagePath = null;

    if (pendingImageFile) {
      setUploadError(null);
      try {
        setIsUploading(true);
        setUploadProgress(1);
        const imageId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        imagePath = `users/${userUid}/notes/${imageId}/image`;
        imageURL = await uploadImage(pendingImageFile, imagePath, setUploadProgress);
      } catch (err) {
        console.error("Image upload failed:", err);
        setUploadError(err.message ?? "Image upload failed. The note will be saved without an image.");
        imageURL = null;
        imagePath = null;
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    }

    const noteData = {
      name: form.name.trim(),
      description: form.description.trim(),
      date: form.date,
      tags: form.tags,
      imageURL,
      imagePath,
    };

    dispatch(saveNote({ updatingData: null, userUid, noteData })).then(() => {
      setForm(EMPTY_FORM);
      setWords(0);
      setPendingImageFile(null);
      showModel(false);
    });
  }

  const isBusy = status === "loading" || isUploading;

  return (
    <ModalOverlay
      ref={refouterDiv}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <ModalContent onMouseUp={(e) => e.stopPropagation()}>
        <ModalClose type="button" onClick={closeModal} aria-label="Close">
          <span className="material-symbols-outlined">close</span>
        </ModalClose>

        <ModalHeader>
          <ModalTitle id="modal-title">Add Note</ModalTitle>
          <ModalSubtitle>
            Capture a new idea — give it a name, description, and date.
          </ModalSubtitle>
        </ModalHeader>

        <ModalBody>
          <ModalForm onSubmit={handleSubmit}>
            <FieldGroup>
              <FieldLabel htmlFor="note-title">
                <span className="material-symbols-outlined">title</span>
                Name
              </FieldLabel>
              <FieldInput
                id="note-title"
                name="title"
                type="text"
                placeholder="Note title"
                value={form.name}
                onChange={handleChange("name")}
                required
              />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel htmlFor="note-desc">
                <span className="material-symbols-outlined">notes</span>
                Description
              </FieldLabel>
              <FieldTextarea
                id="note-desc"
                name="desc"
                placeholder="Write your note here…"
                maxLength={300}
                value={form.description}
                onChange={handleChange("description")}
                required
              />
              <WordCount>{words} words · max 300 characters</WordCount>
            </FieldGroup>

            <FieldGroup>
              <FieldLabel htmlFor="note-date">
                <span className="material-symbols-outlined">calendar_today</span>
                Date
              </FieldLabel>
              <FieldInput
                id="note-date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange("date")}
                required
              />
            </FieldGroup>

            <FieldGroup>
              <TagInput
                tags={form.tags}
                onChange={handleTagsChange}
                suggestions={tagSuggestions}
              />
            </FieldGroup>

            <FieldGroup>
              <ImageUploader
                id="note-image"
                onFileChange={setPendingImageFile}
                uploadProgress={uploadProgress}
                disabled={isBusy}
              />
            </FieldGroup>

            {uploadError && (
              <div
                role="alert"
                style={{
                  padding: "0.65rem 0.9rem",
                  borderRadius: "10px",
                  background: "rgba(196,77,77,0.12)",
                  border: "1px solid rgba(196,77,77,0.35)",
                  fontSize: "0.82rem",
                  color: "inherit",
                  display: "flex",
                  gap: "0.4rem",
                  alignItems: "flex-start",
                  lineHeight: 1.45,
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "1rem", flexShrink: 0, color: "#c44d4d" }}>
                  error
                </span>
                <span style={{ color: "#c44d4d" }}>{uploadError}</span>
              </div>
            )}

            <ModalActions>
              <ModalButton type="button" onClick={closeModal} disabled={isBusy}>
                Cancel
              </ModalButton>
              <ModalButton
                type="submit"
                $variant="primary"
                disabled={isBusy}
              >
                {isUploading
                  ? `Uploading… ${uploadProgress}%`
                  : status === "loading"
                  ? "Saving…"
                  : "Save Note"}
              </ModalButton>
            </ModalActions>
          </ModalForm>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CreateCard;

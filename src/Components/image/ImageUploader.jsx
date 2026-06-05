import React, { useEffect, useRef, useState } from "react";
import { validateImageFile } from "../../services/imageService";
import {
  PreviewBtn,
  PreviewImg,
  PreviewOverlay,
  PreviewWrapper,
  ProgressFill,
  ProgressTrack,
  UploaderError,
  UploaderHiddenInput,
  UploaderIconWrap,
  UploaderLabel,
  UploaderSubtext,
  UploaderText,
  UploaderWrapper,
  UploaderZone,
} from "./imageStyles";

/**
 * ImageUploader
 *
 * Props:
 *  currentImageURL  – URL of the already-saved image (edit mode)
 *  onFileChange     – (file: File | null) called when a new file is picked/cleared
 *  onRemoveCurrent  – () called when the user removes the currently-saved image
 *  uploadProgress   – 0-100, shown when the parent is uploading (optional)
 *  disabled         – disable interactions during save
 *  id               – unique id for the hidden file input (for accessibility)
 */
const ImageUploader = ({
  currentImageURL,
  onFileChange,
  onRemoveCurrent,
  uploadProgress,
  disabled = false,
  id = "image-uploader",
}) => {
  const [pendingFile, setPendingFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  // Revoke the object URL when pendingFile changes or component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const processFile = (file) => {
    if (!file) return;
    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setPendingFile(file);
    onFileChange(file);
  };

  const handleFileInput = (e) => {
    processFile(e.target.files?.[0] ?? null);
    // Reset so the same file can be re-selected
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    processFile(e.dataTransfer.files?.[0] ?? null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleClearPending = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setPendingFile(null);
    setError(null);
    onFileChange(null);
  };

  const handleRemoveCurrent = () => {
    onRemoveCurrent?.();
  };

  const isUploading = typeof uploadProgress === "number" && uploadProgress > 0 && uploadProgress < 100;

  // ── Render: new file preview ──────────────────────────────────────────────
  if (pendingFile && previewUrl) {
    return (
      <UploaderWrapper>
        <UploaderLabel>
          <span className="material-symbols-outlined">image</span>
          Image
        </UploaderLabel>

        <PreviewWrapper>
          <PreviewImg src={previewUrl} alt="Preview of selected image" />
          <PreviewOverlay>
            {/* Change – re-open picker */}
            <PreviewBtn
              type="button"
              title="Change image"
              aria-label="Change image"
              disabled={disabled}
              onClick={() => inputRef.current?.click()}
            >
              <span className="material-symbols-outlined">edit</span>
            </PreviewBtn>
            {/* Remove */}
            <PreviewBtn
              type="button"
              $danger
              title="Remove selected image"
              aria-label="Remove selected image"
              disabled={disabled}
              onClick={handleClearPending}
            >
              <span className="material-symbols-outlined">close</span>
            </PreviewBtn>
          </PreviewOverlay>
        </PreviewWrapper>

        {isUploading && (
          <ProgressTrack>
            <ProgressFill $pct={uploadProgress} />
          </ProgressTrack>
        )}

        {/* hidden input for "Change" */}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          style={{ display: "none" }}
          onChange={handleFileInput}
          disabled={disabled}
          aria-hidden="true"
        />
      </UploaderWrapper>
    );
  }

  // ── Render: currently-saved image ────────────────────────────────────────
  if (currentImageURL) {
    return (
      <UploaderWrapper>
        <UploaderLabel>
          <span className="material-symbols-outlined">image</span>
          Image
        </UploaderLabel>

        <PreviewWrapper>
          <PreviewImg src={currentImageURL} alt="Current note image" />
          <PreviewOverlay>
            <PreviewBtn
              type="button"
              title="Replace image"
              aria-label="Replace image"
              disabled={disabled}
              onClick={() => inputRef.current?.click()}
            >
              <span className="material-symbols-outlined">edit</span>
            </PreviewBtn>
            <PreviewBtn
              type="button"
              $danger
              title="Remove image"
              aria-label="Remove image"
              disabled={disabled}
              onClick={handleRemoveCurrent}
            >
              <span className="material-symbols-outlined">delete</span>
            </PreviewBtn>
          </PreviewOverlay>
        </PreviewWrapper>

        {isUploading && (
          <ProgressTrack>
            <ProgressFill $pct={uploadProgress} />
          </ProgressTrack>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          style={{ display: "none" }}
          onChange={handleFileInput}
          disabled={disabled}
          aria-hidden="true"
        />
      </UploaderWrapper>
    );
  }

  // ── Render: empty drop-zone ───────────────────────────────────────────────
  return (
    <UploaderWrapper>
      <UploaderLabel htmlFor={id}>
        <span className="material-symbols-outlined">image</span>
        Image <span style={{ fontWeight: 400, opacity: 0.65 }}>(optional)</span>
      </UploaderLabel>

      <UploaderZone
        $dragOver={dragOver}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        aria-label="Upload image — drag and drop or click to browse"
      >
        <UploaderHiddenInput
          id={id}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileInput}
          disabled={disabled}
          aria-label="Select image file"
        />
        <UploaderIconWrap>
          <span className="material-symbols-outlined">add_photo_alternate</span>
        </UploaderIconWrap>
        <UploaderText>Drop an image or click to browse</UploaderText>
        <UploaderSubtext>JPEG · PNG · WebP · max 5 MB</UploaderSubtext>
      </UploaderZone>

      {error && (
        <UploaderError role="alert">
          <span className="material-symbols-outlined">error</span>
          {error}
        </UploaderError>
      )}
    </UploaderWrapper>
  );
};

export default ImageUploader;

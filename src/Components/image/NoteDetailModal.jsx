import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import TagBadge from "../tags/TagBadge";
import {
  DetailBody,
  DetailCloseBtn,
  DetailContent,
  DetailDate,
  DetailDescription,
  DetailImageArea,
  DetailImageSkeleton,
  DetailImg,
  DetailMeta,
  DetailNoImage,
  DetailOverlay,
  DetailTagsRow,
  DetailTitle,
  ExpandHint,
  LightboxCloseBtn,
  LightboxImg,
  LightboxOverlay,
} from "./imageStyles";

const Lightbox = ({ src, alt, onClose }) => {
  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return ReactDOM.createPortal(
    <LightboxOverlay onClick={onClose} role="dialog" aria-modal="true" aria-label="Full-size image">
      <LightboxImg
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
      />
      <LightboxCloseBtn
        type="button"
        onClick={onClose}
        aria-label="Close full-size image"
      >
        <span className="material-symbols-outlined">close</span>
      </LightboxCloseBtn>
    </LightboxOverlay>,
    document.body
  );
};

/**
 * NoteDetailModal
 *
 * Props:
 *  note     – the note object { name, description, date, tags, imageURL }
 *  onClose  – callback to close the modal
 */
const NoteDetailModal = ({ note, onClose }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  // Close on Escape, trap scroll
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Focus the content on mount for accessibility
  useEffect(() => {
    contentRef.current?.focus();
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const stopProp = (e) => e.stopPropagation();

  const formattedDate = note.date
    ? new Date(note.date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : note.date;

  return ReactDOM.createPortal(
    <>
      <DetailOverlay
        ref={overlayRef}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-modal-title"
      >
        <DetailContent
          ref={contentRef}
          onClick={stopProp}
          tabIndex={-1}
        >
          <DetailCloseBtn
            type="button"
            onClick={onClose}
            aria-label="Close note details"
          >
            <span className="material-symbols-outlined">close</span>
          </DetailCloseBtn>

          {/* ── Image / colour accent strip ─────────────────────────── */}
          {note.imageURL ? (
            <DetailImageArea
              onClick={() => setLightboxOpen(true)}
              role="button"
              tabIndex={0}
              aria-label="View full-size image"
              onKeyDown={(e) => e.key === "Enter" && setLightboxOpen(true)}
            >
              {!imgLoaded && <DetailImageSkeleton />}
              <DetailImg
                src={note.imageURL}
                alt={`Image for note: ${note.name}`}
                $loaded={imgLoaded}
                onLoad={() => setImgLoaded(true)}
                loading="lazy"
              />
              <ExpandHint>
                <span className="material-symbols-outlined">fullscreen</span>
                Click to expand
              </ExpandHint>
            </DetailImageArea>
          ) : (
            <DetailNoImage />
          )}

          {/* ── Body ───────────────────────────────────────────────── */}
          <DetailBody>
            <DetailTitle id="detail-modal-title">{note.name}</DetailTitle>

            <DetailMeta>
              {note.date && (
                <DetailDate dateTime={note.date}>
                  <span className="material-symbols-outlined">calendar_today</span>
                  {formattedDate}
                </DetailDate>
              )}
              {note.stared && (
                <span
                  className="material-symbols-outlined"
                  style={{ color: "#e6a817", fontSize: "1.1rem" }}
                  title="Starred"
                  aria-label="Starred"
                >
                  star
                </span>
              )}
            </DetailMeta>

            {note.description && (
              <DetailDescription>{note.description}</DetailDescription>
            )}

            {note.tags && note.tags.length > 0 && (
              <DetailTagsRow>
                {note.tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </DetailTagsRow>
            )}
          </DetailBody>
        </DetailContent>
      </DetailOverlay>

      {lightboxOpen && (
        <Lightbox
          src={note.imageURL}
          alt={`Full-size image for note: ${note.name}`}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>,
    document.body
  );
};

export default NoteDetailModal;

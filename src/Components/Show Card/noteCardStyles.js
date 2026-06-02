import styled, { css, keyframes } from "styled-components";

const savePulse = keyframes`
  0% {
    box-shadow:
      0 4px 16px rgba(17, 45, 78, 0.08),
      0 0 0 0 rgba(63, 114, 175, 0.55);
  }
  50% {
    box-shadow:
      0 8px 24px rgba(17, 45, 78, 0.1),
      0 0 0 10px rgba(63, 114, 175, 0);
  }
  100% {
    box-shadow:
      0 4px 16px rgba(17, 45, 78, 0.08),
      0 0 0 0 rgba(63, 114, 175, 0);
  }
`;

const checkPop = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  60% {
    transform: scale(1.15);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const deletePulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(139, 64, 73, 0.5);
  }
  50% {
    transform: scale(1.2);
    box-shadow: 0 0 0 6px rgba(139, 64, 73, 0);
  }
  100% {
    transform: scale(1);
  }
`;

export const NoteCard = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 260px;
  padding: 1.5rem;
  padding-top: 2.25rem;
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
  font-family: "Barlow", sans-serif;
  touch-action: ${({ $isDraggable }) => ($isDraggable ? "none" : "auto")};
  cursor: ${({ $isDraggable, $isDragging }) =>
    $isDraggable ? ($isDragging ? "grabbing" : "grab") : "default"};
  transition:
    transform 0.35s cubic-bezier(0.34, 1.2, 0.64, 1),
    box-shadow 0.35s ease,
    min-height 0.45s cubic-bezier(0.65, 0, 0.35, 1),
    border-color 0.3s ease,
    background-color 0.3s ease;

  ${({ $isDragging }) =>
    $isDragging &&
    css`
      transform: scale(1.03);
      box-shadow: ${({ theme }) => theme.colors.dragOverlayShadow};
    `}

  ${({ $isEditing, theme }) =>
    $isEditing &&
    css`
      min-height: 420px;
      border-color: ${theme.colors.primary};
      box-shadow:
        0 12px 32px rgba(17, 45, 78, 0.12),
        0 0 0 3px ${theme.colors.focusRing};
      cursor: default;
    `}

  ${({ $savedPulse }) =>
    $savedPulse &&
    css`
      animation: ${savePulse} 0.65s ease;
    `}

  &:hover:not([data-dragging="true"]):not([data-editing="true"]) {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.colors.cardHoverShadow};

    .card-actions {
      opacity: 1;
    }
  }

  &:focus-within {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0.65rem;
  right: 0.65rem;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.inputBg};
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  transition:
    transform 0.2s cubic-bezier(0.34, 1.2, 0.64, 1),
    background 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;

  .material-symbols-outlined {
    font-size: 1rem;
    line-height: 1;
  }

  ${({ $pulse }) =>
    $pulse &&
    css`
      animation: ${deletePulse} 0.35s ease;
    `}

  &:hover:not(:disabled) {
    transform: scale(1.15);
    background: ${({ theme }) => theme.colors.error};
    color: #fff;
    box-shadow: 0 4px 12px rgba(139, 64, 73, 0.4);
  }

  &:active:not(:disabled) {
    transform: scale(0.92);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.error};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const DragOverlayCard = styled.div`
  width: min(360px, 90vw);
  min-height: 220px;
  padding: 1.5rem;
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.cardBg};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.colors.dragOverlayShadow};
  transform: scale(1.05) rotate(1deg);
  cursor: grabbing;
  font-family: "Barlow", sans-serif;
  color: ${({ theme }) => theme.colors.text};

  strong {
    display: block;
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.5;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
`;

export const CardHeader = styled.div`
  padding-bottom: 0.75rem;
  margin-bottom: 0.75rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.sage};
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.01em;
  line-height: 1.3;
  word-break: break-word;
`;

export const CardDescription = styled.p`
  flex: 1;
  margin: 0 0 1rem;
  font-size: 0.95rem;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
  overflow-y: auto;
  max-height: 120px;
  padding-right: 0.25rem;
  word-break: break-word;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.periwinkle};
    border-radius: 4px;
  }
`;

export const CardDate = styled.time`
  display: block;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};
  opacity: 0.85;
`;

export const HighlightMark = styled.mark`
  background: rgba(63, 114, 175, 0.22);
  color: inherit;
  padding: 0 0.12em;
  border-radius: 3px;
  font-weight: inherit;
`;

export const CardActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.35rem;
  margin-top: auto;
  opacity: 0.85;
  transition: opacity 0.25s ease;

  @media (max-width: 768px) {
    opacity: 1;
  }
`;

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.sage};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition:
    transform 0.2s cubic-bezier(0.34, 1.2, 0.64, 1),
    background 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;

  .material-symbols-outlined {
    font-size: 1.15rem;
    line-height: 1;
  }

  &:hover:not(:disabled) {
    transform: scale(1.1);
    background: ${({ theme }) => theme.colors.periwinkle};
    color: #fff;
    box-shadow: 0 4px 12px rgba(63, 114, 175, 0.4);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.periwinkle};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ $active, theme }) =>
    $active &&
    css`
      background: ${theme.colors.paleBlue};
      color: ${theme.colors.star};
      box-shadow: inset 0 0 0 2px rgba(230, 168, 23, 0.35);
    `}
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1rem;
  animation: fadeSlideIn 0.4s cubic-bezier(0.65, 0, 0.35, 1) both;

  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const EditFormHeader = styled.div`
  padding-bottom: 0.85rem;
  margin-bottom: 0.25rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.sage};
`;

export const EditFormTitle = styled.h4`
  margin: 0 0 0.25rem;
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.4rem;

  .material-symbols-outlined {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.periwinkle};
  }
`;

export const EditFormSubtitle = styled.p`
  margin: 0;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const EditFieldGroup = styled.div``;

export const WordCount = styled.p`
  margin: 0.35rem 0 0;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: right;
`;

export const FieldLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.4rem;

  .material-symbols-outlined {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.periwinkle};
  }
`;

export const FieldInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 0.8rem 0.95rem;
  border: 2px solid ${({ theme }) => theme.colors.sage};
  border-radius: 12px;
  font-size: 0.95rem;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.inputBg};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 0.75;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.periwinkle};
    background: ${({ theme }) => theme.colors.surface};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focusRing};
  }
`;

export const FieldTextarea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  min-height: 110px;
  max-height: 150px;
  padding: 0.8rem 0.95rem;
  border: 2px solid ${({ theme }) => theme.colors.sage};
  border-radius: 12px;
  font-size: 0.95rem;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.inputBg};
  resize: vertical;
  line-height: 1.5;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 0.75;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.periwinkle};
    background: ${({ theme }) => theme.colors.surface};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focusRing};
  }
`;

export const EditActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;

export const ActionButton = styled.button`
  flex: 1;
  padding: 0.65rem 1rem;
  border: none;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease,
    opacity 0.2s ease;

  ${({ $variant, theme }) =>
    $variant === "primary"
      ? css`
          background: ${theme.colors.periwinkle};
          color: #fff;

          &:hover:not(:disabled) {
            background: ${theme.colors.primaryHover};
            transform: translateY(-1px);
            box-shadow: 0 6px 16px rgba(63, 114, 175, 0.4);
          }
        `
      : css`
          background: transparent;
          color: ${theme.colors.textMuted};
          border: 2px solid ${theme.colors.mist};

          &:hover:not(:disabled) {
            background: ${theme.colors.inputBg};
            transform: translateY(-1px);
          }
        `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.periwinkle};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

export const SaveCheck = styled.span`
  position: absolute;
  top: 0.65rem;
  right: 2.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.sage};
  color: ${({ theme }) => theme.colors.text};
  animation: ${checkPop} 0.45s cubic-bezier(0.34, 1.4, 0.64, 1) both;

  .material-symbols-outlined {
    font-size: 1rem;
  }
`;

export const ViewContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  transition: opacity 0.3s ease, transform 0.3s ease;

  ${({ $hidden }) =>
    $hidden &&
    css`
      display: none;
    `}
`;

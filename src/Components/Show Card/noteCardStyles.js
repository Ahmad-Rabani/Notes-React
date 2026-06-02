import styled, { css, keyframes } from "styled-components";
import { COLORS } from "../LoginandSignup/authPageStyles";

const savePulse = keyframes`
  0% {
    box-shadow:
      0 4px 16px rgba(58, 61, 74, 0.08),
      0 0 0 0 rgba(213, 229, 213, 0.9);
  }
  50% {
    box-shadow:
      0 8px 24px rgba(58, 61, 74, 0.1),
      0 0 0 10px rgba(213, 229, 213, 0);
  }
  100% {
    box-shadow:
      0 4px 16px rgba(58, 61, 74, 0.08),
      0 0 0 0 rgba(213, 229, 213, 0);
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

export const NoteCard = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 260px;
  padding: 1.5rem;
  border-radius: 18px;
  background: ${COLORS.white};
  border: 1px solid rgba(173, 178, 212, 0.35);
  box-shadow:
    0 4px 16px rgba(58, 61, 74, 0.08),
    0 1px 4px rgba(173, 178, 212, 0.25);
  font-family: "Barlow", sans-serif;
  transition:
    transform 0.35s cubic-bezier(0.34, 1.2, 0.64, 1),
    box-shadow 0.35s ease,
    min-height 0.45s cubic-bezier(0.65, 0, 0.35, 1),
    border-color 0.3s ease;

  ${({ $isEditing }) =>
    $isEditing &&
    css`
      min-height: 420px;
      border-color: ${COLORS.sage};
      box-shadow:
        0 12px 32px rgba(173, 178, 212, 0.35),
        0 0 0 3px rgba(213, 229, 213, 0.6);
    `}

  ${({ $savedPulse }) =>
    $savedPulse &&
    css`
      animation: ${savePulse} 0.65s ease;
    `}

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 12px 28px rgba(58, 61, 74, 0.12),
      0 4px 12px rgba(173, 178, 212, 0.35);

    .card-actions {
      opacity: 1;
    }
  }

  &:focus-within {
    outline: 2px solid ${COLORS.periwinkle};
    outline-offset: 3px;
  }
`;

export const CardHeader = styled.div`
  padding-bottom: 0.75rem;
  margin-bottom: 0.75rem;
  border-bottom: 2px solid ${COLORS.sage};
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${COLORS.text};
  letter-spacing: -0.01em;
  line-height: 1.3;
  word-break: break-word;
`;

export const CardDescription = styled.p`
  flex: 1;
  margin: 0 0 1rem;
  font-size: 0.95rem;
  line-height: 1.55;
  color: ${COLORS.textMuted};
  overflow-y: auto;
  max-height: 120px;
  padding-right: 0.25rem;
  word-break: break-word;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${COLORS.periwinkle};
    border-radius: 4px;
  }
`;

export const CardDate = styled.time`
  display: block;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${COLORS.textMuted};
  opacity: 0.85;
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
  background: ${({ $variant }) =>
    $variant === "danger" ? "rgba(139, 64, 73, 0.1)" : COLORS.sage};
  color: ${({ $variant }) =>
    $variant === "danger" ? COLORS.error : COLORS.text};
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
    background: ${({ $variant }) =>
      $variant === "danger" ? COLORS.error : COLORS.periwinkle};
    color: ${COLORS.white};
    box-shadow: 0 4px 12px rgba(173, 178, 212, 0.45);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${COLORS.periwinkle};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ $active }) =>
    $active &&
    css`
      background: ${COLORS.cream};
      color: #c9a227;
      box-shadow: inset 0 0 0 2px rgba(201, 162, 39, 0.35);
    `}
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.85rem;
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

export const FieldLabel = styled.label`
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${COLORS.text};
  margin-bottom: 0.35rem;
`;

export const FieldInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 0.7rem 0.85rem;
  border: 2px solid ${COLORS.sage};
  border-radius: 10px;
  font-size: 0.95rem;
  font-family: inherit;
  color: ${COLORS.text};
  background: ${COLORS.cream};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${COLORS.periwinkle};
    background: ${COLORS.white};
    box-shadow: 0 0 0 3px rgba(173, 178, 212, 0.35);
  }
`;

export const FieldTextarea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  min-height: 100px;
  max-height: 140px;
  padding: 0.7rem 0.85rem;
  border: 2px solid ${COLORS.sage};
  border-radius: 10px;
  font-size: 0.95rem;
  font-family: inherit;
  color: ${COLORS.text};
  background: ${COLORS.cream};
  resize: vertical;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${COLORS.periwinkle};
    background: ${COLORS.white};
    box-shadow: 0 0 0 3px rgba(173, 178, 212, 0.35);
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

  ${({ $variant }) =>
    $variant === "primary"
      ? css`
          background: ${COLORS.periwinkle};
          color: ${COLORS.white};

          &:hover:not(:disabled) {
            background: #9ba0c8;
            transform: translateY(-1px);
            box-shadow: 0 6px 16px rgba(173, 178, 212, 0.45);
          }
        `
      : css`
          background: transparent;
          color: ${COLORS.textMuted};
          border: 2px solid ${COLORS.mist};

          &:hover:not(:disabled) {
            background: ${COLORS.cream};
            transform: translateY(-1px);
          }
        `}

  &:focus-visible {
    outline: 2px solid ${COLORS.periwinkle};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

export const SaveCheck = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${COLORS.sage};
  color: ${COLORS.text};
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

import styled, { keyframes } from "styled-components";
import { COLORS } from "../LoginandSignup/authPageStyles";

const overlayEnter = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const modalEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.94);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(58, 61, 74, 0.45);
  backdrop-filter: blur(4px);
  animation: ${overlayEnter} 0.3s ease both;
`;

export const ModalContent = styled.div`
  width: min(440px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  border-radius: 20px;
  background: ${COLORS.white};
  box-shadow:
    0 24px 48px rgba(58, 61, 74, 0.18),
    0 8px 20px rgba(173, 178, 212, 0.35);
  animation: ${modalEnter} 0.45s cubic-bezier(0.34, 1.2, 0.64, 1) both;
  font-family: "Barlow", sans-serif;
`;

export const ModalTitle = styled.h2`
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${COLORS.text};
  letter-spacing: -0.02em;
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FieldGroup = styled.div``;

export const FieldLabel = styled.label`
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${COLORS.text};
  margin-bottom: 0.4rem;
`;

export const FieldInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 0.75rem 0.9rem;
  border: 2px solid ${COLORS.sage};
  border-radius: 10px;
  font-size: 0.95rem;
  font-family: inherit;
  color: ${COLORS.text};
  background: ${COLORS.cream};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

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
  min-height: 120px;
  padding: 0.75rem 0.9rem;
  border: 2px solid ${COLORS.sage};
  border-radius: 10px;
  font-size: 0.95rem;
  font-family: inherit;
  color: ${COLORS.text};
  background: ${COLORS.cream};
  resize: vertical;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${COLORS.periwinkle};
    background: ${COLORS.white};
    box-shadow: 0 0 0 3px rgba(173, 178, 212, 0.35);
  }
`;

export const WordCount = styled.p`
  margin: 0.35rem 0 0;
  font-size: 0.8rem;
  color: ${COLORS.textMuted};
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 0.65rem;
  margin-top: 0.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const ModalButton = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
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
      ? `
    background: ${COLORS.periwinkle};
    color: ${COLORS.white};

    &:hover:not(:disabled) {
      background: #9ba0c8;
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(173, 178, 212, 0.45);
    }
  `
      : `
    background: transparent;
    color: ${COLORS.textMuted};
    border: 2px solid ${COLORS.mist};

    &:hover:not(:disabled) {
      background: ${COLORS.cream};
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

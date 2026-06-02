import styled, { keyframes } from "styled-components";

const overlayEnter = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
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
  background: ${({ theme }) => theme.colors.overlayBg};
  backdrop-filter: blur(6px);
  animation: ${overlayEnter} 0.3s ease both;
`;

export const ModalContent = styled.div`
  position: relative;
  width: min(520px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  padding: 0;
  border-radius: 22px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  box-shadow: ${({ theme }) => theme.colors.cardHoverShadow};
  animation: ${modalEnter} 0.45s cubic-bezier(0.34, 1.2, 0.64, 1) both;
  font-family: "Barlow", sans-serif;
  transition: background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
`;

export const ModalHeader = styled.div`
  padding: 1.75rem 2rem 1.25rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.sage};
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.inputBg} 0%,
    ${({ theme }) => theme.colors.surface} 100%
  );
`;

export const ModalTitle = styled.h2`
  margin: 0 0 0.35rem;
  font-size: 1.55rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
`;

export const ModalSubtitle = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.45;
`;

export const ModalClose = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.inputBg};
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    color 0.2s ease;

  .material-symbols-outlined {
    font-size: 1.15rem;
  }

  &:hover {
    transform: scale(1.08);
    background: ${({ theme }) => theme.colors.sage};
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.periwinkle};
    outline-offset: 2px;
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem 2rem 2rem;
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
`;

export const FieldGroup = styled.div``;

export const FieldLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.45rem;

  .material-symbols-outlined {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.periwinkle};
  }
`;

export const FieldInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 0.85rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.sage};
  border-radius: 12px;
  font-size: 0.95rem;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.inputBg};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.3s ease,
    color 0.3s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 0.75;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.periwinkle};
    background: ${({ theme }) => theme.colors.surface};
    box-shadow: 0 0 0 3px rgba(173, 178, 212, 0.35);
  }
`;

export const FieldTextarea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  min-height: 130px;
  padding: 0.85rem 1rem;
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
    background 0.3s ease,
    color 0.3s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 0.75;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.periwinkle};
    background: ${({ theme }) => theme.colors.surface};
    box-shadow: 0 0 0 3px rgba(173, 178, 212, 0.35);
  }
`;

export const WordCount = styled.p`
  margin: 0.4rem 0 0;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: right;
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.35rem;
  padding-top: 0.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const ModalButton = styled.button`
  flex: 1;
  padding: 0.85rem 1rem;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
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
      ? `
    background: ${theme.colors.periwinkle};
    color: #fff;

    &:hover:not(:disabled) {
      background: #9ba0c8;
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(173, 178, 212, 0.45);
    }
  `
      : `
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

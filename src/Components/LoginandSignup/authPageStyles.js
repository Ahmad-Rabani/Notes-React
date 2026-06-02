import styled from "styled-components";

export const COLORS = {
  periwinkle: "#ADB2D4",
  mist: "#C7D9DD",
  sage: "#D5E5D5",
  cream: "#EEF1DA",
  white: "#FFFFFF",
  text: "#3a3d4a",
  textMuted: "#5c6170",
  error: "#8b4049",
};

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: linear-gradient(
    145deg,
    ${COLORS.mist} 0%,
    ${COLORS.periwinkle} 38%,
    ${COLORS.sage} 72%,
    ${COLORS.cream} 100%
  );
  font-family: "Barlow", sans-serif;
`;

export const AuthCard = styled.div`
  position: relative;
  width: min(920px, 100%);
  min-height: 540px;
  background: ${COLORS.cream};
  border-radius: 24px;
  box-shadow:
    0 24px 48px rgba(58, 61, 74, 0.14),
    0 8px 20px rgba(173, 178, 212, 0.35);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    min-height: auto;
    border-radius: 20px;
  }
`;

export const CardInner = styled.div`
  display: flex;
  flex: 1;
  min-height: 540px;

  @media (max-width: 768px) {
    flex-direction: column;
    min-height: auto;
  }
`;

export const FormSection = styled.div`
  width: 50%;
  overflow: hidden;
  position: relative;
  z-index: 2;
  background: ${COLORS.white};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FormsSlider = styled.div`
  display: flex;
  width: 200%;
  height: 100%;
  transform: translateX(${({ $isSignup }) => ($isSignup ? "0" : "-50%")});
  transition: transform 0.65s cubic-bezier(0.65, 0, 0.35, 1);
  will-change: transform;
`;

export const FormPanel = styled.div`
  width: 50%;
  padding: 3rem 3.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${COLORS.white};

  @media (max-width: 768px) {
    width: 100%;
    padding: 2rem 1.75rem;
    display: ${({ $mobileHidden }) => ($mobileHidden ? "none" : "flex")};
  }
`;

export const AuthForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
`;

export const OverlaySection = styled.div`
  width: 50%;
  overflow: hidden;
  position: relative;
  z-index: 3;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const OverlaySlider = styled.div`
  display: flex;
  width: 200%;
  height: 100%;
  transform: translateX(${({ $isSignup }) => ($isSignup ? "-50%" : "0")});
  transition: transform 0.65s cubic-bezier(0.65, 0, 0.35, 1);
  will-change: transform;
`;

export const OverlayPanel = styled.div`
  width: 50%;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${COLORS.white};
  background: linear-gradient(
    155deg,
    ${COLORS.periwinkle} 0%,
    ${COLORS.mist} 55%,
    ${COLORS.sage} 100%
  );

  &:first-child {
    background: linear-gradient(
      155deg,
      ${COLORS.sage} 0%,
      ${COLORS.cream} 100%
    );
    color: ${COLORS.text};
  }
`;

export const OverlayTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.75rem;
  letter-spacing: -0.02em;
`;

export const OverlayText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  max-width: 260px;
  margin: 0 0 2rem;
  opacity: 0.92;
`;

export const GhostButton = styled.button`
  padding: 0.85rem 2.5rem;
  border-radius: 999px;
  border: 2px solid currentColor;
  background: transparent;
  color: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 3px;
  }

  ${OverlayPanel}:first-child & {
    border-color: ${COLORS.periwinkle};
    color: ${COLORS.text};

    &:hover {
      background: rgba(173, 178, 212, 0.25);
    }
  }
`;

export const FormTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${COLORS.text};
  margin: 0 0 0.35rem;
  letter-spacing: -0.02em;
`;

export const FormSubtitle = styled.p`
  font-size: 0.95rem;
  color: ${COLORS.textMuted};
  margin: 0 0 2rem;
`;

export const FieldGroup = styled.div`
  width: 100%;
  margin-bottom: 1.25rem;
  box-sizing: border-box;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${COLORS.text};
  margin-bottom: 0.45rem;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 0.9rem 1rem;
  border: 2px solid ${COLORS.sage};
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  color: ${COLORS.text};
  background: ${COLORS.cream};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;

  &::placeholder {
    color: ${COLORS.textMuted};
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    border-color: ${COLORS.periwinkle};
    background: ${COLORS.white};
    box-shadow: 0 0 0 3px rgba(173, 178, 212, 0.4);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  &[aria-invalid="true"] {
    border-color: ${COLORS.error};
    box-shadow: 0 0 0 3px rgba(139, 64, 73, 0.15);
  }
`;

export const PrimaryButton = styled.button`
  display: block;
  width: 100%;
  box-sizing: border-box;
  margin-top: 0.5rem;
  padding: 0.9rem 1rem;
  border: none;
  border-radius: 12px;
  background: ${COLORS.periwinkle};
  color: ${COLORS.white};
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease,
    opacity 0.2s ease;

  &:hover:not(:disabled) {
    background: #9ba0c8;
    transform: translateY(-1px);
    box-shadow: 0 8px 18px rgba(173, 178, 212, 0.5);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${COLORS.periwinkle};
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  width: 100%;
  box-sizing: border-box;
  margin: 0 0 1rem;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  background: rgba(139, 64, 73, 0.08);
  color: ${COLORS.error};
  font-size: 0.875rem;
  line-height: 1.4;
`;

export const MobileToggle = styled.div`
  display: none;
  padding: 1.25rem 1.75rem 2rem;
  text-align: center;
  background: linear-gradient(160deg, ${COLORS.periwinkle}, ${COLORS.mist});
  color: ${COLORS.white};

  @media (max-width: 768px) {
    display: block;
  }

  p {
    margin: 0 0 0.75rem;
    font-size: 0.9rem;
  }

  ${GhostButton} {
    border-color: ${COLORS.white};
    color: ${COLORS.white};

    &:hover {
      background: rgba(255, 255, 255, 0.15);
    }
  }
`;

export const BrandMark = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  font-size: 1.1rem;
  color: ${COLORS.periwinkle};
  letter-spacing: 0.02em;

  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${COLORS.sage};
    box-shadow: 12px 0 0 ${COLORS.mist}, 24px 0 0 ${COLORS.periwinkle};
  }
`;

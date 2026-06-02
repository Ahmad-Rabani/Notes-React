import styled, { keyframes } from "styled-components";
import { COLORS } from "../LoginandSignup/authPageStyles";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 1.5rem clamp(1rem, 4vw, 2.5rem) 6rem;
  background: linear-gradient(
    145deg,
    ${COLORS.mist} 0%,
    ${COLORS.periwinkle} 30%,
    ${COLORS.sage} 65%,
    ${COLORS.cream} 100%
  );
  font-family: "Barlow", sans-serif;
  overflow-y: auto;
`;

export const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.5s ease both;
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: ${COLORS.text};
  letter-spacing: -0.02em;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 48px;
    height: 3px;
    border-radius: 2px;
    background: ${COLORS.sage};
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
`;

export const FilterButton = styled.button`
  padding: 0.55rem 1.1rem;
  border-radius: 999px;
  border: 2px solid
    ${({ $active }) => ($active ? COLORS.periwinkle : "transparent")};
  background: ${({ $active }) =>
    $active ? COLORS.periwinkle : COLORS.white};
  color: ${({ $active }) => ($active ? COLORS.white : COLORS.text)};
  font-size: 0.9rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  box-shadow: ${({ $active }) =>
    $active
      ? "0 4px 14px rgba(173, 178, 212, 0.45)"
      : "0 2px 8px rgba(58, 61, 74, 0.08)"};
  transition:
    transform 0.2s cubic-bezier(0.34, 1.2, 0.64, 1),
    background 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background: ${({ $active }) =>
      $active ? "#9ba0c8" : COLORS.sage};
    box-shadow: 0 6px 16px rgba(173, 178, 212, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${COLORS.periwinkle};
    outline-offset: 2px;
  }
`;

export const LogoutButton = styled(FilterButton)`
  background: transparent;
  border-color: ${COLORS.mist};
  color: ${COLORS.textMuted};

  &:hover {
    background: rgba(255, 255, 255, 0.6);
    border-color: ${COLORS.periwinkle};
    color: ${COLORS.text};
  }
`;

export const CardsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: 1.25rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  animation: ${fadeIn} 0.55s ease 0.1s both;
`;

export const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem 1.5rem;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.55);
  border: 1px dashed rgba(173, 178, 212, 0.5);
  color: ${COLORS.textMuted};
  font-size: 1rem;
`;

export const FabContainer = styled.div`
  position: fixed;
  right: clamp(1.25rem, 4vw, 2.5rem);
  bottom: clamp(1.25rem, 4vw, 2rem);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 50;
  animation: ${fadeIn} 0.5s ease 0.2s both;
`;

export const FabLabel = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${COLORS.text};
  background: rgba(255, 255, 255, 0.85);
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  box-shadow: 0 4px 12px rgba(58, 61, 74, 0.1);
  backdrop-filter: blur(6px);

  @media (max-width: 480px) {
    display: none;
  }
`;

export const FabButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border: none;
  border-radius: 50%;
  background: ${COLORS.sage};
  color: ${COLORS.text};
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  box-shadow:
    0 6px 20px rgba(213, 229, 213, 0.7),
    0 2px 8px rgba(58, 61, 74, 0.12);
  transition:
    transform 0.35s cubic-bezier(0.34, 1.4, 0.64, 1),
    box-shadow 0.35s ease,
    background 0.25s ease;

  &:hover {
    transform: scale(1.08) rotate(90deg);
    background: ${COLORS.periwinkle};
    color: ${COLORS.white};
    box-shadow: 0 10px 28px rgba(173, 178, 212, 0.55);
  }

  &:active {
    transform: scale(0.96);
  }

  &:focus-visible {
    outline: 2px solid ${COLORS.periwinkle};
    outline-offset: 3px;
  }
`;

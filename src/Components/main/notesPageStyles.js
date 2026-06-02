import styled, { keyframes } from "styled-components";

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
  background: ${({ theme }) => theme.colors.pageGradient};
  font-family: "Barlow", sans-serif;
  overflow-y: auto;
  transition: background 0.3s ease;
`;

export const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-right: 3.5rem;
  animation: ${fadeIn} 0.5s ease both;
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
  position: relative;
  padding-bottom: 0.5rem;
  transition: color 0.3s ease;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 48px;
    height: 3px;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.sage};
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
    ${({ $active, theme }) => ($active ? theme.colors.periwinkle : "transparent")};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.periwinkle : theme.colors.surface};
  color: ${({ $active, theme }) => ($active ? "#fff" : theme.colors.text)};
  font-size: 0.9rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  box-shadow: ${({ $active, theme }) =>
    $active
      ? "0 4px 14px rgba(63, 114, 175, 0.4)"
      : theme.colors.cardShadow};
  transition:
    transform 0.2s cubic-bezier(0.34, 1.2, 0.64, 1),
    background 0.3s ease,
    box-shadow 0.2s ease,
    border-color 0.3s ease,
    color 0.3s ease;

  &:hover {
    transform: translateY(-1px);
    background: ${({ $active, theme }) =>
      $active ? theme.colors.primaryHover : theme.colors.paleBlue};
    box-shadow: 0 6px 16px rgba(63, 114, 175, 0.35);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.periwinkle};
    outline-offset: 2px;
  }
`;

export const LogoutButton = styled(FilterButton)`
  background: transparent;
  border-color: ${({ theme }) => theme.colors.mist};
  color: ${({ theme }) => theme.colors.textMuted};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
    border-color: ${({ theme }) => theme.colors.periwinkle};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const CardsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 360px), 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  animation: ${fadeIn} 0.55s ease 0.1s both;
`;

export const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem 1.5rem;
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.surfaceMuted};
  border: 1px dashed ${({ theme }) => theme.colors.cardBorder};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1rem;
  transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
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
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.fabLabelBg};
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
  backdrop-filter: blur(6px);
  transition: background 0.3s ease, color 0.3s ease;

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
  background: ${({ theme }) => theme.colors.sage};
  color: ${({ theme }) => theme.colors.text};
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
  transition:
    transform 0.35s cubic-bezier(0.34, 1.4, 0.64, 1),
    box-shadow 0.35s ease,
    background 0.3s ease,
    color 0.3s ease;

  &:hover {
    transform: scale(1.08) rotate(90deg);
    background: ${({ theme }) => theme.colors.periwinkle};
    color: #fff;
    box-shadow: ${({ theme }) => theme.colors.cardHoverShadow};
  }

  &:active {
    transform: scale(0.96);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.periwinkle};
    outline-offset: 3px;
  }
`;

export const DndHint = styled.p`
  margin: -1rem 0 1.25rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  animation: ${fadeIn} 0.5s ease 0.15s both;
`;

export const SearchBarWrapper = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: -1rem auto 1.75rem;
  animation: ${fadeIn} 0.5s ease 0.08s both;
`;

export const SearchFieldRow = styled.div`
  position: relative;
  width: 100%;
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 1.1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.primary};
  pointer-events: none;
`;

export const SearchInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 0.95rem 7.5rem 0.95rem 3rem;
  border: 2px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 16px;
  font-size: 1rem;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.3s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 0.8;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow:
      ${({ theme }) => theme.colors.cardHoverShadow},
      0 0 0 3px ${({ theme }) => theme.colors.focusRing};
  }
`;

export const SearchClearButton = styled.button`
  position: absolute;
  right: 4.75rem;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.paleBlue};
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    color 0.2s ease;

  .material-symbols-outlined {
    font-size: 1rem;
  }

  &:hover {
    transform: translateY(-50%) scale(1.08);
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const SearchHint = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0.25rem 0.45rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.inputBg};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.72rem;
  font-weight: 600;
  pointer-events: none;

  kbd {
    font-family: inherit;
    font-size: inherit;
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

export const SearchResultsBanner = styled.p`
  margin: 0.65rem 0 0;
  padding: 0.55rem 0.85rem;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.paleBlue};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;

export const SearchMeta = styled.p`
  margin: 0.55rem 0 0 0.15rem;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

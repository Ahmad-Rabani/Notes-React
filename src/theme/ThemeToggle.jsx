import React from "react";
import styled, { keyframes } from "styled-components";
import { useTheme } from "./ThemeProvider";

const rotateIn = keyframes`
  from {
    transform: rotate(-90deg) scale(0.6);
    opacity: 0;
  }
  to {
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  top: clamp(1rem, 3vw, 1.5rem);
  right: clamp(1rem, 3vw, 1.5rem);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 2px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
  transition:
    transform 0.35s cubic-bezier(0.34, 1.3, 0.64, 1),
    box-shadow 0.3s ease,
    background-color 0.3s ease,
    border-color 0.3s ease;

  .material-symbols-outlined {
    font-size: 1.35rem;
    line-height: 1;
    animation: ${rotateIn} 0.4s cubic-bezier(0.34, 1.3, 0.64, 1) both;
  }

  &:hover {
    transform: scale(1.08);
    box-shadow: ${({ theme }) => theme.colors.cardHoverShadow};
    border-color: ${({ theme }) => theme.colors.periwinkle};
    background: ${({ theme }) => theme.colors.sage};
    color: ${({ theme }) => theme.colors.text};
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.periwinkle};
    outline-offset: 3px;
  }
`;

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <ToggleButton
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <span className="material-symbols-outlined" key={isDark ? "moon" : "sun"}>
        {isDark ? "dark_mode" : "light_mode"}
      </span>
    </ToggleButton>
  );
};

export default ThemeToggle;

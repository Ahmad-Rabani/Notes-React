import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

const cardEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(28px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const cardExit = keyframes`
  to {
    opacity: 0;
    transform: translateX(24px) scale(0.86);
    max-height: 0;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const CardShell = styled.div`
  display: flex;
  min-height: 0;
  will-change: transform, opacity;
  transition:
    transform 0.45s cubic-bezier(0.34, 1.2, 0.64, 1),
    opacity 0.35s ease;

  ${({ $isEntering }) =>
    $isEntering &&
    css`
      animation: ${cardEnter} 0.55s cubic-bezier(0.34, 1.3, 0.64, 1) both;
    `}

  ${({ $isExiting }) =>
    $isExiting &&
    css`
      animation: ${cardExit} 0.42s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      pointer-events: none;
      overflow: hidden;
    `}
`;

const AnimatedCard = ({
  children,
  isEntering = false,
  isExiting = false,
  onExitComplete,
}) => {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (!isExiting) {
      setShouldRender(true);
      return undefined;
    }

    const timer = setTimeout(() => {
      setShouldRender(false);
      onExitComplete?.();
    }, 420);

    return () => clearTimeout(timer);
  }, [isExiting, onExitComplete]);

  if (!shouldRender && isExiting) return null;

  return (
    <CardShell $isEntering={isEntering} $isExiting={isExiting}>
      {children}
    </CardShell>
  );
};

export default AnimatedCard;

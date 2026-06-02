import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingsScreen = styled.div`
  position: fixed;
  z-index: 9999;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.overlayBg};
  backdrop-filter: blur(4px);
`;

export const SmallLoader = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid ${({ theme }) => theme.colors.mist};
  border-top-color: ${({ theme }) => theme.colors.periwinkle};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

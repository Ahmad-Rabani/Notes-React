import React from "react";
import styled, { keyframes } from "styled-components";
import { COLORS } from "../LoginandSignup/authPageStyles";

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: 1.25rem;
  width: 100%;
  padding: 0.5rem 0;
  animation: ${fadeIn} 0.35s ease forwards;
`;

const SkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 260px;
  padding: 1.5rem;
  border-radius: 18px;
  background: ${COLORS.cream};
  border: 1px solid rgba(173, 178, 212, 0.35);
  box-shadow:
    0 4px 16px rgba(58, 61, 74, 0.06),
    0 1px 4px rgba(173, 178, 212, 0.2);
`;

const ShimmerBlock = styled.div`
  border-radius: ${({ $radius }) => $radius || "10px"};
  background: linear-gradient(
    90deg,
    ${COLORS.cream} 0%,
    ${COLORS.mist} 45%,
    ${COLORS.cream} 90%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.6s ease-in-out infinite;
  height: ${({ $height }) => $height};
  width: ${({ $width }) => $width || "100%"};
  margin-bottom: ${({ $mb }) => $mb || "0"};
`;

const SkeletonActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 1rem;
`;

const SkeletonLoader = ({ count = 6 }) => {
  return (
    <SkeletonGrid role="status" aria-label="Loading notes">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} aria-hidden="true">
          <ShimmerBlock $height="22px" $width="65%" $mb="1rem" $radius="8px" />
          <ShimmerBlock $height="14px" $width="100%" $mb="0.65rem" />
          <ShimmerBlock $height="14px" $width="92%" $mb="0.65rem" />
          <ShimmerBlock $height="14px" $width="78%" $mb="0.65rem" />
          <ShimmerBlock $height="14px" $width="40%" $mb="1.25rem" />
          <SkeletonActions>
            <ShimmerBlock $height="32px" $width="32px" $radius="50%" />
            <ShimmerBlock $height="32px" $width="32px" $radius="50%" />
            <ShimmerBlock $height="32px" $width="32px" $radius="50%" />
          </SkeletonActions>
        </SkeletonCard>
      ))}
      <span className="sr-only">Loading your notes…</span>
    </SkeletonGrid>
  );
};

export default SkeletonLoader;

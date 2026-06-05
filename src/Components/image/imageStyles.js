import styled, { keyframes, css } from "styled-components";

// ─── Keyframes ────────────────────────────────────────────────────────────────

const shimmer = keyframes`
  0%   { background-position: -300px 0; }
  100% { background-position: calc(300px + 100%) 0; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.92) translateY(18px); }
  to   { opacity: 1; transform: scale(1)    translateY(0);    }
`;

const skeletonShimmerBg = (theme) => css`
  background: linear-gradient(
    90deg,
    ${theme.colors.skeletonBase}    25%,
    ${theme.colors.skeletonShimmer} 50%,
    ${theme.colors.skeletonBase}    75%
  );
  background-size: 600px 100%;
  animation: ${shimmer} 1.5s ease infinite;
`;

// ─── Card Thumbnail ────────────────────────────────────────────────────────────

export const CardThumbnail = styled.div`
  position: relative;
  /* negative margins break out of the card's padding so it spans edge-to-edge */
  margin: -2.25rem -1.5rem 0.75rem;
  height: 88px;
  border-radius: 18px 18px 0 0;
  overflow: hidden;
  flex-shrink: 0;
`;

export const ThumbnailSkeleton = styled.div`
  position: absolute;
  inset: 0;
  ${({ theme }) => skeletonShimmerBg(theme)}
`;

export const ThumbnailImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 0.4s ease, transform 0.4s ease;
  will-change: transform;

  &:hover {
    transform: scale(1.04);
  }
`;

// ─── Image Uploader ────────────────────────────────────────────────────────────

export const UploaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const UploaderZone = styled.div`
  position: relative;
  border: 2px dashed
    ${({ $dragOver, theme }) =>
      $dragOver ? theme.colors.periwinkle : theme.colors.sage};
  border-radius: 14px;
  padding: 1.25rem 1rem;
  text-align: center;
  background: ${({ $dragOver, theme }) =>
    $dragOver ? theme.colors.surfaceMuted : "transparent"};
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.periwinkle};
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;

export const UploaderHiddenInput = styled.input`
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
`;

export const UploaderIconWrap = styled.span`
  display: block;
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 0.4rem;
`;

export const UploaderText = styled.p`
  margin: 0 0 0.2rem;
  font-size: 0.87rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const UploaderSubtext = styled.p`
  margin: 0;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  opacity: 0.75;
`;

export const PreviewWrapper = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.colors.sage};
  animation: ${fadeIn} 0.35s ease both;
`;

export const PreviewImg = styled.img`
  width: 100%;
  max-height: 170px;
  object-fit: cover;
  display: block;
`;

export const PreviewOverlay = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  gap: 0.3rem;
`;

export const PreviewBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition: transform 0.2s ease, background 0.2s ease;

  .material-symbols-outlined {
    font-size: 1rem;
    line-height: 1;
  }

  &:hover {
    transform: scale(1.1);
    background: ${({ $danger }) =>
      $danger ? "rgba(196, 77, 77, 0.85)" : "rgba(63, 114, 175, 0.85)"};
  }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }
`;

export const ProgressTrack = styled.div`
  height: 4px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.surfaceMuted};
  overflow: hidden;
  margin-top: 0.4rem;
`;

export const ProgressFill = styled.div`
  height: 100%;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.periwinkle};
  width: ${({ $pct }) => $pct}%;
  transition: width 0.22s ease;
`;

export const UploaderError = styled.p`
  margin: 0.35rem 0 0;
  font-size: 0.79rem;
  color: ${({ theme }) => theme.colors.error};
  display: flex;
  align-items: center;
  gap: 0.3rem;

  .material-symbols-outlined {
    font-size: 0.95rem;
  }
`;

export const UploaderLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.4rem;

  .material-symbols-outlined {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.periwinkle};
  }
`;

// ─── Note Detail Modal ─────────────────────────────────────────────────────────

export const DetailOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.overlayBg};
  backdrop-filter: blur(8px);
  animation: ${fadeIn} 0.25s ease both;
`;

export const DetailContent = styled.div`
  position: relative;
  width: min(660px, 100%);
  max-height: 92vh;
  overflow-y: auto;
  border-radius: 22px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  box-shadow: ${({ theme }) => theme.colors.cardHoverShadow};
  animation: ${scaleIn} 0.42s cubic-bezier(0.34, 1.2, 0.64, 1) both;
  font-family: "Barlow", sans-serif;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.mist};
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const DetailCloseBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 5;
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
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;

  .material-symbols-outlined {
    font-size: 1.15rem;
    line-height: 1;
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

export const DetailImageArea = styled.div`
  position: relative;
  width: 100%;
  height: 230px;
  border-radius: 22px 22px 0 0;
  overflow: hidden;
  cursor: zoom-in;
  flex-shrink: 0;

  /* gradient overlay at the bottom for a polished edge */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 55%, rgba(0, 0, 0, 0.28) 100%);
    pointer-events: none;
  }

  &:hover img {
    transform: scale(1.04);
  }
`;

export const DetailImageSkeleton = styled.div`
  position: absolute;
  inset: 0;
  ${({ theme }) => skeletonShimmerBg(theme)}
`;

export const DetailImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 0.4s ease, transform 0.4s ease;
  will-change: transform;
`;

export const ExpandHint = styled.span`
  position: absolute;
  bottom: 0.85rem;
  right: 0.85rem;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.7rem;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.48);
  color: #fff;
  font-size: 0.74rem;
  backdrop-filter: blur(4px);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;

  .material-symbols-outlined {
    font-size: 0.95rem;
  }

  ${DetailImageArea}:hover & {
    opacity: 1;
  }
`;

export const DetailBody = styled.div`
  padding: 1.5rem 2rem 2rem;

  @media (max-width: 480px) {
    padding: 1.25rem 1.25rem 1.75rem;
  }
`;

export const DetailTitle = styled.h2`
  margin: 0 0 0.6rem;
  font-size: 1.55rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
  line-height: 1.3;
  padding-right: 2.5rem; /* room for the close button */
  word-break: break-word;
`;

export const DetailMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-bottom: 1.2rem;
  padding-bottom: 1.1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;

export const DetailDate = styled.time`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.83rem;
  color: ${({ theme }) => theme.colors.textMuted};

  .material-symbols-outlined {
    font-size: 0.95rem;
    opacity: 0.8;
  }
`;

export const DetailDescription = styled.p`
  margin: 0 0 1.25rem;
  font-size: 0.98rem;
  line-height: 1.68;
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: pre-wrap;
  word-break: break-word;
`;

export const DetailTagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const DetailNoImage = styled.div`
  height: 8px;
  background: linear-gradient(
    90deg,
    ${({ $accent, theme }) => $accent || theme.colors.periwinkle} 0%,
    transparent 100%
  );
  border-radius: 22px 22px 0 0;
`;

// ─── Lightbox ──────────────────────────────────────────────────────────────────

export const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.92);
  cursor: zoom-out;
  animation: ${fadeIn} 0.2s ease both;
`;

export const LightboxImg = styled.img`
  max-width: 95vw;
  max-height: 95vh;
  object-fit: contain;
  border-radius: 6px;
  cursor: default;
  animation: ${scaleIn} 0.28s cubic-bezier(0.34, 1.2, 0.64, 1) both;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.8);
`;

export const LightboxCloseBtn = styled.button`
  position: fixed;
  top: 1.2rem;
  right: 1.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition: transform 0.2s ease, background 0.2s ease;

  .material-symbols-outlined {
    font-size: 1.3rem;
    line-height: 1;
  }

  &:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.22);
  }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }
`;

// ─── "View details" button (reuses IconButton look) ────────────────────────────

export const ViewDetailBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.sage};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.34, 1.2, 0.64, 1), background 0.2s ease,
    color 0.2s ease, box-shadow 0.2s ease;

  .material-symbols-outlined {
    font-size: 1.15rem;
    line-height: 1;
  }

  &:hover:not(:disabled) {
    transform: scale(1.1);
    background: ${({ theme }) => theme.colors.periwinkle};
    color: #fff;
    box-shadow: 0 4px 12px rgba(63, 114, 175, 0.4);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.periwinkle};
    outline-offset: 2px;
  }
`;

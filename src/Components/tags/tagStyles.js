import styled from "styled-components";

/**
 * Tag Badge - displayed on cards and in inputs
 */
export const TagBadgeContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  user-select: none;
  transition: all 0.15s ease-out;
  background-color: ${(props) => props.bgColor || "rgba(63, 114, 175, 0.15)"};
  color: ${(props) => props.textColor || "#3F72AF"};
  border: 1px solid ${(props) => props.borderColor || "rgba(63, 114, 175, 0.5)"};

  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }

  svg {
    width: 14px;
    height: 14px;
    opacity: 0.7;
    transition: opacity 0.15s ease;
  }

  &:hover svg {
    opacity: 1;
  }
`;

/**
 * Tag Input Container - for create/edit modal
 */
export const TagInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TagInputLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
`;

export const TagInputField = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.colors.cardBorder};
  background-color: ${(props) => props.theme.colors.inputBg};
  color: ${(props) => props.theme.colors.text};
  font-size: 14px;
  transition: all 0.15s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.focusRing};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.textMuted};
  }
`;

export const TagSuggestions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px 0;
`;

export const TagSuggestionButton = styled.button`
  padding: 6px 12px;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.cardBorder};
  background-color: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.text};
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.inputBg};
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

export const TagsDisplayContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
  min-height: 24px;
`;

/**
 * Tag Filter Sidebar - converted to horizontal layout below search
 */
export const TagFilterWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  padding: 12px 16px;
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.cardBorder};
  overflow-x: auto;
  overflow-y: hidden;
  animation: slideInDown 0.3s ease-out;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.cardBorder};
    border-radius: 2px;
  }

  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const TagFilterLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textMuted};
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const TagFilterButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 20px;
  border: 2px solid ${(props) => (props.isActive ? props.bgColor : props.theme.colors.cardBorder)};
  background-color: ${(props) => (props.isActive ? props.bgColor : "transparent")};
  color: ${(props) => (props.isActive ? props.textColor : props.theme.colors.textMuted)};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    /* Use provided color values safely; fall back to theme colors when needed */
    background-color: ${(props) => (props.isActive ? props.bgColor : props.bgColor || props.theme.colors.inputBg)};
    border-color: ${(props) => props.bgColor || props.theme.colors.primary};
    color: ${(props) => props.textColor || props.theme.colors.text};
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const ClearFiltersButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.cardBorder};
  background-color: transparent;
  color: ${(props) => props.theme.colors.textMuted};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;

  &:hover {
    background-color: ${(props) => props.theme.colors.inputBg};
    color: ${(props) => props.theme.colors.text};
    border-color: ${(props) => props.theme.colors.primary};
  }

  span {
    font-size: 14px;
  }
`;

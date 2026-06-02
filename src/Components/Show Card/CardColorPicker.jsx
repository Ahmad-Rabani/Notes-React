import { useEffect, useRef } from "react";
import { CARD_COLOR_PRESETS } from "../utils/cardColors";
import {
  ColorPickerPanel,
  ColorPickerTitle,
  ColorPickerWrapper,
  ColorSwatch,
  ColorSwatchGrid,
} from "./noteCardStyles";

const CardColorPicker = ({
  currentColor,
  onSelect,
  isOpen,
  onToggle,
  isSaving = false,
}) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onToggle(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") onToggle(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onToggle]);

  return (
    <ColorPickerWrapper ref={wrapperRef}>
      <button
        type="button"
        className="color-trigger"
        onClick={(e) => {
          e.stopPropagation();
          onToggle(!isOpen);
        }}
        onPointerDown={(e) => e.stopPropagation()}
        aria-label="Change card color"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        disabled={isSaving}
      >
        <span
          className="color-preview"
          style={{
            background:
              CARD_COLOR_PRESETS.find((p) => p.id === currentColor)?.swatch ??
              CARD_COLOR_PRESETS[0].swatch,
          }}
        />
        <span className="material-symbols-outlined">palette</span>
      </button>

      {isOpen && (
        <ColorPickerPanel role="listbox" aria-label="Card colors">
          <ColorPickerTitle>Card color</ColorPickerTitle>
          <ColorSwatchGrid>
            {CARD_COLOR_PRESETS.map((preset) => (
              <ColorSwatch
                key={preset.id}
                type="button"
                role="option"
                aria-selected={currentColor === preset.id}
                aria-label={preset.label}
                $color={preset.swatch}
                $active={currentColor === preset.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(preset.id);
                }}
                onPointerDown={(e) => e.stopPropagation()}
                title={preset.label}
              />
            ))}
          </ColorSwatchGrid>
        </ColorPickerPanel>
      )}
    </ColorPickerWrapper>
  );
};

export default CardColorPicker;

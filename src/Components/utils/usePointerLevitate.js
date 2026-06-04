import { useEffect, useRef, useState } from "react";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const DEFAULTS = {
  maxRotation: 8,
  maxLift: 10,
  glowDistance: 14,
  glowOpacity: 0.22,
  touchScale: 0.4,
};

const getMotionPreference = () =>
  typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

const usePointerLevitate = ({ enabled = true } = {}) => {
  const cardRef = useRef(null);
  const frameRef = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(getMotionPreference());
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (!window.matchMedia) return undefined;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReduceMotion(query.matches);

    handleChange();
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (reduceMotion || !enabled) {
      setStyle({});
    }
  }, [reduceMotion, enabled]);

  const updateStyle = (nextStyle) => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    frameRef.current = requestAnimationFrame(() => {
      setStyle((previous) => ({ ...previous, ...nextStyle }));
    });
  };

  const resetStyle = () => {
    if (reduceMotion || !enabled) {
      setStyle({});
      return;
    }
    updateStyle({
      transform: "",
      boxShadow: "",
      "--glow-x": "50%",
      "--glow-y": "28%",
      "--glow-opacity": 0,
    });
  };

  const handlePointerMove = (event) => {
    if (!enabled || reduceMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const pointerX = event.clientX - rect.left;
    const pointerY = event.clientY - rect.top;

    if (rect.width === 0 || rect.height === 0) return;

    const ratioX = clamp((pointerX / rect.width - 0.5) * 2, -1, 1);
    const ratioY = clamp((pointerY / rect.height - 0.5) * 2, -1, 1);
    const pointerFactor = event.pointerType === "touch" ? DEFAULTS.touchScale : 1;

    const rotateX = -ratioY * DEFAULTS.maxRotation * pointerFactor;
    const rotateY = ratioX * DEFAULTS.maxRotation * pointerFactor;
    const lift = DEFAULTS.maxLift * pointerFactor;

    const glowX = clamp(50 + ratioX * DEFAULTS.glowDistance, 20, 80);
    const glowY = clamp(30 + ratioY * DEFAULTS.glowDistance, 18, 72);

    updateStyle({
      transform: `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${lift}px)`,
      boxShadow: `${10 + lift}px ${18 + lift}px 50px rgba(15, 35, 80, 0.14), inset 0 0 0 1px rgba(255, 255, 255, 0.08)`,
      "--glow-x": `${glowX}%`,
      "--glow-y": `${glowY}%`,
      "--glow-opacity": DEFAULTS.glowOpacity,
    });
  };

  return {
    cardRef,
    cardStyle: style,
    handlePointerMove,
    handlePointerLeave: resetStyle,
    handlePointerUp: resetStyle,
  };
};

export default usePointerLevitate;

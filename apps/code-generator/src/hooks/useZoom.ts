import { useState, useRef, useEffect, useCallback } from "react";

export type ZoomProps = {
  min?: number;
  max?: number;
  step?: number;
};

export const useZoom = (options: ZoomProps = {}) => {
  // zoom scale
  const [scale, setScale] = useState<number>(1);
  // zoom할 대상
  const zoomRef = useRef<HTMLDivElement | null>(null);
  // zoom options
  const { min = 0.3, max = 2.0, step = 0.1 } = options;

  const handleWheel = useCallback((ev: WheelEvent) => {
    if (!ev.ctrlKey && !ev.metaKey) return;

    ev.preventDefault();
    ev.stopPropagation();

    setScale((prev) => {
      const delta = ev.deltaY > 0 ? -0.1 : 0.1;
      const next = Math.min(Math.max(prev + delta, 0.3), 2.0);
      return Number(next.toFixed(2));
    });
  }, []);

  useEffect(() => {
    const el = zoomRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return el.removeEventListener("wheel", handleWheel);
  }, []);

  const zoomIn = useCallback(
    () => setScale((s) => Number(Math.min(s + step, max).toFixed(2))),
    [step, max]
  );

  const zoomOut = useCallback(
    () => setScale((s) => Number(Math.max(s - step, min).toFixed(2))),
    [step, min]
  );

  const resetZoom = useCallback(() => setScale(1), []);

  return {
    zoomRef,
    scale,
    setScale,
    zoomIn,
    zoomOut,
    resetZoom,
  };
};

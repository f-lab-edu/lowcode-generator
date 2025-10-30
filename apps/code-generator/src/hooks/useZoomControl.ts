import { useState, useRef, useCallback } from "react";

export type ZoomProps = {
  min?: number;
  max?: number;
  step?: number;
};

export const useZoomControl = (options: ZoomProps = {}) => {
  // zoom scale
  const [scale, setScale] = useState<number>(1);
  // zoom할 대상
  const zoomRef = useRef<HTMLDivElement | null>(null);
  // zoom options
  const { min = 0.3, max = 2.0, step = 0.1 } = options;
  // 속도
  const velocity = useRef(0);

  const animationRef = useRef<number | null>(null);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    const normalized =
      Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY) / 120, 1);

    velocity.current += normalized * -0.08; // 한 스텝당 8% 변화량

    if (!animationRef.current) {
      const animate = () => {
        if (Math.abs(velocity.current) < 0.001) {
          animationRef.current = null;
          return;
        }

        setScale((prev) => {
          const next = Math.min(Math.max(prev + velocity.current, 0.3), 2);
          return Number(next.toFixed(2));
        });

        velocity.current *= 0.8; // 감속
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }
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
    handleWheel,
    zoomIn,
    zoomOut,
    resetZoom,
  };
};

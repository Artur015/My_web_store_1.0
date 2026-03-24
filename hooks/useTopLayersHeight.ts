import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

export function useTopLayersHeight(initialHeight = 75) {
  const [topLayersHeight, setTopLayersHeight] = useState(initialHeight);
  const topLayersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const topLayersElement = topLayersRef.current;

    if (!topLayersElement) {
      return;
    }

    const updateTopLayersHeight = () => {
      setTopLayersHeight(topLayersElement.getBoundingClientRect().height);
    };

    updateTopLayersHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateTopLayersHeight();
    });

    resizeObserver.observe(topLayersElement);
    window.addEventListener("resize", updateTopLayersHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateTopLayersHeight);
    };
  }, []);

  const topLayersStyle = useMemo(
    () =>
      ({
        "--top-layers-height": `${topLayersHeight}px`,
      }) as CSSProperties,
    [topLayersHeight],
  );

  return {
    topLayersHeight,
    topLayersRef,
    topLayersStyle,
  };
}

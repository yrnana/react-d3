import { useCallback, useEffect, useRef } from 'react';

import { select } from 'd3';

export default function Simple() {
  const containerRef = useRef<HTMLDivElement>(null);

  const initChart = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
  }, []);

  const destroyChart = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    select(container).select('svg').remove();
  }, []);

  useEffect(() => {
    initChart();
    return destroyChart;
  }, [destroyChart, initChart]);

  return <div ref={containerRef} className="bg-white inline-block" />;
}

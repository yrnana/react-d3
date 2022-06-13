import { useCallback, useEffect, useRef } from 'react';

import { type PieArcDatum, arc, pie, scaleOrdinal, select } from 'd3';

const data = { a: 9, b: 20, c: 30, d: 8, e: 12 };

type Datum = [string, number];

export default function Simple() {
  const containerRef = useRef<HTMLDivElement>(null);

  const initChart = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // set the dimensions and margins of the graph
    const size = 400,
      margin = 30,
      outerRadius = size / 2 - margin,
      innerRadius = 80;

    // remove original svg
    const div = select(container);
    div.select('svg').remove();

    // append the svg object to the div
    const svg = div
      .append('svg')
      .attr('width', size)
      .attr('height', size)
      .append('g')
      .attr('transform', `translate(${size / 2},${size / 2})`);

    // color scale
    const color = scaleOrdinal<string>().range([
      '#a3e635',
      '#34d399',
      '#22d3ee',
      '#60a5fa',
      '#a78bfa',
    ]);

    // convert data
    const datum: Datum[] = Object.entries(data);

    const d3Pie = pie<Datum>()
      .sort(null)
      .value((d) => d[1]);

    const d3Arc = arc<PieArcDatum<Datum>>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    svg
      .append('g')
      .attr('class', 'donut')
      .selectAll('path')
      .data(d3Pie(datum))
      .join('path')
      .attr('d', d3Arc)
      .attr('fill', (d) => color(d.data[0]));
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

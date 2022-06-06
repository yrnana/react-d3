import { useCallback, useEffect, useRef } from 'react';

import { type PieArcDatum, arc, pie, scaleOrdinal, select } from 'd3';

const data = { a: 9, b: 20, c: 30, d: 8, e: 12 };

type Datum = [string, number];

export default function DataLabel() {
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

    const pieData = d3Pie(datum);

    const d3Arc = arc<PieArcDatum<Datum>>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pieGroup = svg.append('g').attr('class', 'donut');
    pieGroup
      .selectAll('path')
      .data(pieData)
      .join('path')
      .attr('d', d3Arc)
      .attr('fill', (d) => color(d.data[0]));

    const labelGroup = svg.append('g').attr('class', 'labels');
    labelGroup
      .attr('font-family', 'system-ui, AppleSDGothicNeo, sans-serif')
      .attr('font-size', 16)
      .attr('font-weight', 600)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .selectAll('text')
      .data(pieData)
      .join('text')
      .text((d) => d.data[1])
      .attr('transform', (d) => `translate(${d3Arc.centroid(d)})`);
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

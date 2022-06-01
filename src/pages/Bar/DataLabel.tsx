import { useCallback, useEffect, useRef } from 'react';

import {
  axisBottom,
  axisLeft,
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  select,
} from 'd3';

export default function DataLabel() {
  const containerRef = useRef<HTMLDivElement>(null);

  const initChart = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const data = [
      { group: 'A', value: 4 },
      { group: 'B', value: 18 },
      { group: 'C', value: 10 },
    ];

    const color = scaleOrdinal<string>().range([
      '#22d3ee',
      '#a78bfa',
      '#4ade80',
    ]);

    // set the dimensions and margins of the graph
    const margin = { top: 30, right: 30, bottom: 30, left: 40 },
      width = 400 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // remove original svg
    const div = select(container);
    div.select('svg').remove();

    // append the svg object
    const svg = div
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('class', 'chart')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X axis
    const x = scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.group))
      .padding(0.2);
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(axisBottom(x))
      .call((g) => {
        g.selectAll('text')
          .attr('font-family', 'system-ui, AppleSDGothicNeo, sans-serif')
          .attr('font-size', 12);
      });

    // Y axis
    const y = scaleLinear().domain([0, 20]).range([height, 0]);
    svg
      .append('g')
      .attr('class', 'y-axis')
      .call(axisLeft(y))
      .call((g) => {
        g.selectAll('text')
          .attr('font-family', 'system-ui, AppleSDGothicNeo, sans-serif')
          .attr('font-size', 12);
      });

    // Bars
    const barGroup = svg.append('g').attr('class', 'bars');
    barGroup
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d) => x(d.group) || 0)
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.value))
      .attr('fill', (d) => color(d.group));

    // data-labels
    const labelGroup = svg.append('g').attr('class', 'data-labels');
    labelGroup
      .selectAll('text')
      .data(data)
      .join('text')
      .text((d) => d.value)
      .attr('x', (d) => x(d.group) || 0)
      .attr('y', (d) => y(d.value))
      .attr('dx', x.bandwidth() / 2)
      .attr('dy', -6)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'system-ui, AppleSDGothicNeo, sans-serif')
      .attr('font-weight', 600)
      .attr('font-size', 14);
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

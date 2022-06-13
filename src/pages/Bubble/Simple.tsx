import { useCallback, useEffect, useRef } from 'react';

import {
  axisBottom,
  axisLeft,
  csv,
  extent,
  max,
  scaleLinear,
  scaleOrdinal,
  schemeSet2,
  select,
} from 'd3';

export default function Simple() {
  const containerRef = useRef<HTMLDivElement>(null);

  const initChart = useCallback(async () => {
    const container = containerRef.current;
    if (!container) return;

    const rawData = await csv<
      'country' | 'continent' | 'lifeExp' | 'pop' | 'gdpPercap'
    >(
      'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv'
    );
    const data = rawData.filter((d) => Number(d.gdpPercap) < 18000);

    const continents = data.map((d) => String(d.continent));

    // remove original svg
    const div = select(container);
    div.select('svg').remove();

    // set the dimensions and margins of the graph
    const margin = { top: 30, right: 30, bottom: 30, left: 40 },
      width = 400 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = div
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X axis
    const xMax = max(data, (d) => Number(d.gdpPercap));
    const x = scaleLinear()
      .domain([0, Number(xMax)])
      .range([0, width])
      .nice();
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(axisBottom(x));

    // Y axis
    const [yMin, yMax] = extent(data, (d) => Number(d.lifeExp));
    const y = scaleLinear()
      .domain([Number(yMin) - 5, Number(yMax)])
      .range([height, 0])
      .nice();
    svg.append('g').attr('class', 'y-axis').call(axisLeft(y));

    // bubble size scale
    const [zMin, zMax] = extent(data, (d) => Number(d.pop));
    const z = scaleLinear()
      .domain([Number(zMin), Number(zMax)])
      .range([4, 40])
      .nice();

    // bubble color scale
    const color = scaleOrdinal()
      .domain(new Set(continents).values())
      .range(schemeSet2);

    // Add dots
    svg
      .append('g')
      .attr('class', 'dots')
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', (d) => x(Number(d.gdpPercap)))
      .attr('cy', (d) => y(Number(d.lifeExp)))
      .attr('r', (d) => z(Number(d.pop)))
      .style('fill', (d) => String(color(String(d.continent))))
      .style('opacity', '0.8')
      .attr('stroke', 'white')
      .style('stroke-width', '2px');
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

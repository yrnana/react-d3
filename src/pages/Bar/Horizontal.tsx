import { useMemo } from 'react';

import { scaleBand, scaleLinear, scaleOrdinal } from 'd3';

import { Axis, BarGroup, Group } from '~/components/Chart';

type Datum = {
  key: string;
  value: number;
};

const data: Datum[] = [
  { key: 'A', value: 4 },
  { key: 'B', value: 18 },
  { key: 'C', value: 10 },
];

const margin = { top: 30, right: 30, bottom: 30, left: 40 },
  width = 400 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

export default function Horizontal() {
  const x = useMemo(
    () =>
      scaleBand()
        .range([0, width])
        .domain(data.map((d) => d.key))
        .padding(0.2),
    []
  );

  const y = useMemo(() => scaleLinear().domain([0, 20]).range([height, 0]), []);

  const color = useMemo(
    () => scaleOrdinal<string>().range(['#22d3ee', '#a78bfa', '#4ade80']),
    []
  );

  return (
    <svg
      className="bg-white"
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    >
      <Group
        className="chart"
        transform={`translate(${margin.left},${margin.top})`}
      >
        <Axis
          orient="bottom"
          axisScale={x}
          fontSize={12}
          transform={`translate(0,${height})`}
          className="x-axis"
        />
        <Axis orient="left" axisScale={y} fontSize={12} className="y-axis" />
        <BarGroup
          data={data}
          xScale={x}
          yScale={y}
          height={height}
          color={color}
        />
      </Group>
    </svg>
  );
}

import { useMemo } from 'react';

import { scaleBand, scaleLinear, scaleOrdinal } from 'd3';

import { Axis, Bar, Group } from '~/components/Chart';

type Datum = {
  group: string;
  value: number;
};

const data: Datum[] = [
  { group: 'A', value: 4 },
  { group: 'B', value: 18 },
  { group: 'C', value: 10 },
];

const margin = { top: 30, right: 30, bottom: 30, left: 40 },
  width = 400 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

export default function Component() {
  const x = useMemo(
    () =>
      scaleBand()
        .range([0, width])
        .domain(data.map((d) => d.group))
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
      <Group className="chart" transform="translate(40,30)">
        <Axis
          orient="bottom"
          axisScale={x}
          transform="translate(0,340)"
          className="x-axis"
        />
        <Axis orient="left" axisScale={y} className="y-axis" />
        <Group className="bars">
          {data.map((d, index) => (
            <Bar
              key={index}
              x={x(d.group)}
              y={y(d.value)}
              width={x.bandwidth()}
              height={height - y(d.value)}
              fill={color(d.group)}
            />
          ))}
        </Group>
      </Group>
    </svg>
  );
}

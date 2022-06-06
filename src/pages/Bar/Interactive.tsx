import { useMemo, useState } from 'react';

import { scaleBand, scaleLinear, scaleOrdinal } from 'd3';

import { Button } from '~/components';
import { Axis, BarGroup, Group } from '~/components/Chart';

type Datum = {
  key: string;
  value: number;
};

const data: Datum[][] = [
  [
    { key: 'A', value: 4 },
    { key: 'B', value: 18 },
    { key: 'C', value: 10 },
  ],
  [
    { key: 'A', value: 7 },
    { key: 'B', value: 1 },
    { key: 'C', value: 15 },
  ],
];

const margin = { top: 30, right: 30, bottom: 30, left: 40 },
  width = 400 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

export default function Interactive() {
  const [index, setIndex] = useState(0);

  const x = useMemo(
    () =>
      scaleBand()
        .range([0, width])
        .domain(data[index].map((d) => d.key))
        .padding(0.2),
    [index]
  );

  const y = useMemo(() => scaleLinear().domain([0, 20]).range([height, 0]), []);

  const color = useMemo(
    () => scaleOrdinal<string>().range(['#22d3ee', '#a78bfa', '#4ade80']),
    []
  );

  return (
    <div>
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
            data={data[index]}
            xScale={x}
            yScale={y}
            height={height}
            color={color}
            transition={{
              duration: 800,
            }}
          />
        </Group>
      </svg>
      <div className="mt-4">
        <Button onClick={() => setIndex((value) => (value === 0 ? 1 : 0))}>
          데이터 변경
        </Button>
      </div>
    </div>
  );
}

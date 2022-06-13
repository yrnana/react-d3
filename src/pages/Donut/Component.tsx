import { useMemo } from 'react';

import { scaleOrdinal } from 'd3';

import { DonutGroup, Group } from '~/components/Chart';

const data = { a: 9, b: 20, c: 30, d: 8, e: 12 };

const size = 400,
  margin = 30,
  outerRadius = size / 2 - margin,
  innerRadius = 80;

export default function Component() {
  const color = useMemo(
    () =>
      scaleOrdinal<string>().range([
        '#a3e635',
        '#34d399',
        '#22d3ee',
        '#60a5fa',
        '#a78bfa',
      ]),
    []
  );

  return (
    <svg className="bg-white" width={size} height={size}>
      <Group transform={`translate(${size / 2},${size / 2})`}>
        <DonutGroup
          data={Object.entries(data)}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          pathColor={color}
          showLabel
          labelProps={{
            fontSize: 16,
            fontWeight: 600,
            fill: 'white',
          }}
        />
      </Group>
    </svg>
  );
}

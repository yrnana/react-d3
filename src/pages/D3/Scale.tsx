import { useMemo } from 'react';

import { scaleBand, scaleLinear, scalePoint } from 'd3';

export default function Scale() {
  const linear = scaleLinear().domain([1.03, 95.4]).nice();
  console.log(linear.domain(), linear.ticks());

  const point = scalePoint()
    .domain(['A', 'B', 'C'])
    .range([40, 700])
    .padding(0.6)
    .round(true);
  console.log(point.domain(), point.step(), point.range());

  const band = scaleBand<number>()
    .domain([1, 2, 3, 4, 5, 6])
    .range([0, 100])
    .round(true);
  console.log(band(1), band(2), band(3));

  return null;
}

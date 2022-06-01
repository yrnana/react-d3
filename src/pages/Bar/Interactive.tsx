import { useEffect, useMemo, useRef, useState } from 'react';

import {
  type AxisDomain,
  type AxisScale,
  axisBottom,
  axisLeft,
  axisRight,
  axisTop,
  easeBackOut,
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  select,
} from 'd3';

const data = [
  [
    { group: 'A', value: 4 },
    { group: 'B', value: 18 },
    { group: 'C', value: 10 },
  ],
  [
    { group: 'A', value: 7 },
    { group: 'B', value: 1 },
    { group: 'C', value: 15 },
  ],
];

const margin = { top: 30, right: 30, bottom: 30, left: 40 },
  width = 400 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

const color = scaleOrdinal<string>().range(['#22d3ee', '#a78bfa', '#4ade80']);

export default function Interactive() {
  const [index, setIndex] = useState(0);

  const x = useMemo(
    () =>
      scaleBand()
        .range([0, width])
        .domain(data[index].map((d) => d.group))
        .padding(0.2),
    [index]
  );

  const y = useMemo(() => scaleLinear().domain([0, 20]).range([height, 0]), []);

  const ease = useMemo(() => easeBackOut.overshoot(1.7), []);

  return (
    <div>
      <svg
        className="bg-white"
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g
          className="chart"
          transform={`translate(${margin.left},${margin.top})`}
        >
          <Axis
            className="x-axis"
            type="bottom"
            axisScale={x}
            transform={`translate(0,${height})`}
          />
          <Axis className="y-axis" type="left" axisScale={y} />
          <g className="bars">
            {data[index].map(({ group, value }) => (
              <Rect
                key={`${index}_${group}`}
                xValue={group}
                xScale={x}
                yValue={value}
                yScale={y}
                fill={color(group)}
                transition
                duration={800}
                ease={ease}
              />
            ))}
          </g>
        </g>
      </svg>
      <div className="mt-4">
        <button
          className="bg-violet-400 text-white p-2 rounded"
          onClick={() => setIndex((value) => (value === 0 ? 1 : 0))}
        >
          데이터 변경
        </button>
      </div>
    </div>
  );
}

type AxisProps<Domain extends AxisDomain> = React.SVGProps<SVGGElement> & {
  type: 'top' | 'right' | 'bottom' | 'left';
  axisScale: AxisScale<Domain>;
};

const Axis = <Domain extends AxisDomain>({
  type,
  axisScale,
  ...props
}: AxisProps<Domain>) => {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      let axis;
      switch (type) {
        case 'top':
          axis = axisTop;
          break;
        case 'left':
          axis = axisLeft;
          break;
        case 'right':
          axis = axisRight;
          break;
        case 'bottom':
          axis = axisBottom;
          break;
      }
      select(ref.current).call(axis(axisScale));
    }
  }, [axisScale, type]);

  return <g {...props} ref={ref} />;
};

type RectProps<
  XDomain extends AxisDomain,
  YDomain extends AxisDomain
> = React.SVGProps<SVGRectElement> & {
  xValue: XDomain;
  xScale: AxisScale<XDomain>;
  yValue: YDomain;
  yScale: AxisScale<YDomain>;
  transition?: boolean;
  duration?: number;
  ease?: (normalizedTime: number) => number;
};

const Rect = <XDomain extends AxisDomain, YDomain extends AxisDomain>({
  xValue,
  xScale: x,
  yValue,
  yScale: y,
  transition,
  duration = 800,
  ease,
  ...props
}: RectProps<XDomain, YDomain>) => {
  const ref = useRef<SVGRectElement>(null);

  useEffect(() => {
    if (ref.current) {
      const rect = select(ref.current);
      if (transition) {
        const [yDomainMin] = y.domain();
        let transition = rect
          .attr('x', x(xValue) || 0)
          .attr('y', y(yDomainMin) || 0)
          .attr('width', x.bandwidth?.() || 0)
          .attr('height', height - (y(yDomainMin) || 0))
          .transition()
          .duration(duration);
        if (ease) {
          transition = transition.ease(ease);
        }
        transition
          .attr('y', (d) => y(yValue) || 0)
          .attr('height', (d) => height - (y(yValue) || 0));
      } else {
        rect
          .attr('x', x(xValue) || 0)
          .attr('y', y(yValue) || 0)
          .attr('width', x.bandwidth?.() || 0)
          .attr('height', height - (y(yValue) || 0));
      }
    }
  }, [x, xValue, yValue, y, transition, duration, ease]);

  return <rect {...props} ref={ref} />;
};

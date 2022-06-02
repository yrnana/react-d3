import type {
  AxisDomain,
  AxisScale,
  ScaleBand,
  ScaleOrdinal,
  ScalePoint,
} from 'd3';

import { Bar, Group } from './index';

export type BarGroupProps<
  XDomain extends AxisDomain,
  YDomain extends AxisDomain
> = {
  data: { key: XDomain; value: YDomain }[];
  height: number;
  xScale: ScaleBand<XDomain> | ScalePoint<XDomain>;
  yScale: AxisScale<YDomain>;
  color?: ScaleOrdinal<XDomain, string>;
  transition?: {
    duration?: number;
    ease?: (normalizedTime: number) => number;
  };
};

export const BarGroup = <
  XDomain extends AxisDomain,
  YDomain extends AxisDomain
>({
  data,
  height,
  xScale,
  yScale,
  color,
  transition,
}: BarGroupProps<XDomain, YDomain>) => {
  return (
    <Group className="bars">
      {data.map((d, index) => (
        <Bar
          key={index}
          xScale={xScale}
          xValue={d.key}
          yScale={yScale}
          yValue={d.value}
          barHeight={height}
          barColor={color}
          transition={transition}
        />
      ))}
    </Group>
  );
};

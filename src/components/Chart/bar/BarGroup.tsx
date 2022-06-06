import type {
  AxisDomain,
  AxisScale,
  ScaleBand,
  ScaleOrdinal,
  ScalePoint,
} from 'd3';

import { Bar, Group } from '~/components/Chart';

export type BarGroupProps<XDomain extends AxisDomain> = {
  data: { key: XDomain; value: number }[];
  height: number;
  xScale: ScaleBand<XDomain> | ScalePoint<XDomain>;
  yScale: AxisScale<number>;
  color?: ScaleOrdinal<XDomain, string>;
  transition?:
    | {
        duration?: number;
        ease?: (normalizedTime: number) => number;
      }
    | boolean;
};

export const BarGroup = <XDomain extends AxisDomain>({
  data,
  height,
  xScale,
  yScale,
  color,
  transition,
}: BarGroupProps<XDomain>) => {
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

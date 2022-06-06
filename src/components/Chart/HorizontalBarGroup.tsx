import type {
  AxisDomain,
  AxisScale,
  ScaleBand,
  ScaleOrdinal,
  ScalePoint,
} from 'd3';

import { Group, HorizontalBar } from './index';

export type HorizontalBarGroupProps<YDomain extends AxisDomain> = {
  data: { key: YDomain; value: number }[];
  xScale: AxisScale<number>;
  yScale: ScaleBand<YDomain> | ScalePoint<YDomain>;
  color?: ScaleOrdinal<YDomain, string>;
  transition?:
    | {
        duration?: number;
        ease?: (normalizedTime: number) => number;
      }
    | boolean;
};

export const HorizontalBarGroup = <XDomain extends AxisDomain>({
  data,
  xScale,
  yScale,
  color,
  transition,
}: HorizontalBarGroupProps<XDomain>) => {
  return (
    <Group className="bars">
      {data.map((d, index) => (
        <HorizontalBar
          key={index}
          xScale={xScale}
          xValue={d.value}
          yScale={yScale}
          yValue={d.key}
          barColor={color}
          transition={transition}
        />
      ))}
    </Group>
  );
};

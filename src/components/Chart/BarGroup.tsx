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
}: BarGroupProps<XDomain, YDomain>) => {
  return (
    <Group className="bars">
      {data.map((d, index) => (
        <Bar
          key={index}
          x={xScale(d.key)}
          y={yScale(d.value)}
          width={xScale.bandwidth()}
          height={height - (yScale(d.value) || 0)}
          fill={color?.(d.key)}
        />
      ))}
    </Group>
  );
};

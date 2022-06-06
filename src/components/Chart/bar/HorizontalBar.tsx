import { useEffect, useMemo, useRef } from 'react';

import {
  type AxisDomain,
  type AxisScale,
  type ScaleBand,
  type ScaleOrdinal,
  type ScalePoint,
  select,
} from 'd3';

export type HorizontalBarProps<YDomain extends AxisDomain> =
  React.SVGProps<SVGRectElement> & {
    xScale: AxisScale<number>;
    xValue: number;
    yScale: ScaleBand<YDomain> | ScalePoint<YDomain>;
    yValue: YDomain;
    barColor?: ScaleOrdinal<YDomain, string>;
    transition?:
      | {
          duration?: number;
          ease?: (normalizedTime: number) => number;
        }
      | boolean;
  };

export const HorizontalBar = <YDomain extends AxisDomain>({
  xScale,
  xValue,
  yScale,
  yValue,
  barColor,
  transition,
  ...props
}: HorizontalBarProps<YDomain>) => {
  const ref = useRef<SVGRectElement>(null);

  const xDomainMin = useMemo(() => xScale.domain()[0], [xScale]);

  useEffect(() => {
    // transition
    if (transition && ref.current) {
      let rect = select(ref.current);

      if (!rect.attr('x')) {
        rect = rect.attr('width', xScale(xDomainMin) || 0);
      }

      let chain = rect
        .transition()
        .duration(
          (typeof transition === 'object' ? transition.duration : 800) || 800
        );
      if (typeof transition === 'object' && transition.ease) {
        chain = chain.ease(transition.ease);
      }
      chain.attr('width', xScale(xValue) || 0);
    }
  }, [xDomainMin, transition, yScale, yValue, xScale, xValue]);

  return (
    <rect
      ref={ref}
      fill={barColor?.(yValue)}
      y={yScale(yValue)}
      height={yScale.bandwidth()}
      x={xScale(xDomainMin)}
      width={transition ? undefined : xScale(xValue)}
      {...props}
    />
  );
};

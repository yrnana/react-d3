import { useEffect, useRef } from 'react';

import {
  type AxisDomain,
  type AxisScale,
  type ScaleBand,
  type ScaleOrdinal,
  type ScalePoint,
  select,
} from 'd3';

export type BarProps<XDomain extends AxisDomain> =
  React.SVGProps<SVGRectElement> & {
    xScale: ScaleBand<XDomain> | ScalePoint<XDomain>;
    xValue: XDomain;
    yScale: AxisScale<number>;
    yValue: number;
    barHeight: number;
    barColor?: ScaleOrdinal<XDomain, string>;
    transition?:
      | {
          duration?: number;
          ease?: (normalizedTime: number) => number;
        }
      | boolean;
  };

export const Bar = <XDomain extends AxisDomain>({
  xScale,
  xValue,
  yScale,
  yValue,
  barHeight,
  barColor,
  transition,
  ...props
}: BarProps<XDomain>) => {
  const ref = useRef<SVGRectElement>(null);

  useEffect(() => {
    // transition
    if (transition && ref.current) {
      let rect = select(ref.current);

      const yDomainMin = yScale.domain()[0];

      if (!rect.attr('y')) {
        rect = rect
          .attr('y', yScale(yDomainMin) || 0)
          .attr('height', barHeight - (yScale(yDomainMin) || 0));
      }

      let chain = rect
        .transition()
        .duration(
          (typeof transition === 'object' ? transition.duration : 800) || 800
        );
      if (typeof transition === 'object' && transition.ease) {
        chain = chain.ease(transition.ease);
      }
      chain
        .attr('y', yScale(yValue) || 0)
        .attr('height', barHeight - (yScale(yValue) || 0));
    }
  }, [barHeight, transition, yScale, yValue]);

  return (
    <rect
      ref={ref}
      fill={barColor?.(xValue)}
      x={xScale(xValue)}
      width={xScale.bandwidth()}
      {...(transition
        ? {}
        : { y: yScale(yValue), height: barHeight - (yScale(yValue) || 0) })}
      {...props}
    />
  );
};

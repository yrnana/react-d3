import { useEffect, useRef } from 'react';

import {
  type AxisDomain,
  type AxisScale,
  type ScaleBand,
  type ScaleOrdinal,
  type ScalePoint,
  select,
} from 'd3';

export type BarProps<
  XDomain extends AxisDomain,
  YDomain extends AxisDomain
> = React.SVGProps<SVGRectElement> & {
  xScale: ScaleBand<XDomain> | ScalePoint<XDomain>;
  xValue: XDomain;
  yScale: AxisScale<YDomain>;
  yValue: YDomain;
  barHeight: number;
  barColor?: ScaleOrdinal<XDomain, string>;
  transition?: {
    duration?: number;
    ease?: (normalizedTime: number) => number;
  };
};

export const Bar = <XDomain extends AxisDomain, YDomain extends AxisDomain>({
  xScale,
  xValue,
  yScale,
  yValue,
  barHeight,
  barColor,
  transition,
  ...props
}: BarProps<XDomain, YDomain>) => {
  const ref = useRef<SVGRectElement>(null);

  useEffect(() => {
    // transition
    if (transition && ref.current) {
      const rect = select(ref.current);
      const yScaleNum = (value: YDomain) => yScale(value) || 0;

      if (rect.attr('y') === null) {
        const yDomainMin = yScale.domain()[0];
        rect
          .attr('y', yScaleNum(yDomainMin))
          .attr('height', barHeight - yScaleNum(yDomainMin));
      }

      let chain = rect.transition().duration(transition.duration || 800);
      if (transition.ease) {
        chain = chain.ease(transition.ease);
      }
      chain
        .attrTween('y', (d) => {
          return function (t: number) {
            return String(barHeight - yScaleNum(yValue) * t);
          };
        })
        .attrTween('height', (d) => {
          return function (t: number) {
            return String(yScaleNum(yValue) * t);
          };
        });
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

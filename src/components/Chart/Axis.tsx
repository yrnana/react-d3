import { useCallback, useMemo } from 'react';

import type { AxisDomain, AxisScale, ScaleBand, ScalePoint } from 'd3';

import { type GroupProps, Group, Line, Path, Text } from './index';

const defaultOffset =
  typeof window !== 'undefined' && window.devicePixelRatio > 1 ? 0 : 0.5;

export type AxisProps<Domain extends AxisDomain> = GroupProps & {
  orient: 'left' | 'right' | 'top' | 'bottom';
  axisScale: AxisScale<Domain>;
  tickSize?: number;
  tickSizeInner?: number;
  tickSizeOuter?: number;
  tickPadding?: number;
  tickValues?: Domain[];
  tickArguments?: unknown[];
  tickFormat?: (domainValue: Domain, index: number) => string;
  offset?: number;
  hideTicks?: boolean;
};

export const Axis = <Domain extends AxisDomain>({
  orient,
  axisScale,
  offset = defaultOffset,
  tickSize,
  tickSizeInner = 6,
  tickSizeOuter = 3,
  tickPadding = 3,
  tickValues,
  tickArguments = [],
  tickFormat,
  hideTicks,
  ...props
}: AxisProps<Domain>) => {
  const spacing = Math.max(tickSize ?? tickSizeInner, 0) + tickPadding;
  const x = orient === 'left' || orient === 'right' ? 'x' : 'y';
  const k = orient === 'top' || orient === 'left' ? -1 : 1;
  const textAnchor =
    orient === 'right' ? 'start' : orient === 'left' ? 'end' : 'middle';
  const dy =
    orient === 'top' ? '0em' : orient === 'bottom' ? '0.71em' : '0.32em';

  const values = useMemo(
    () =>
      tickValues ??
      // @ts-ignore
      (axisScale.ticks?.(...tickArguments) as typeof tickValues) ??
      axisScale.domain(),
    [axisScale, tickArguments, tickValues]
  );

  const format = useMemo(
    () =>
      tickFormat ??
      // @ts-ignore
      (axisScale.tickFormat?.(...tickArguments) as typeof tickFormat) ??
      ((x: Domain) => String(x)),
    [axisScale, tickArguments, tickFormat]
  );

  const position = useMemo(() => {
    return hasBandwidth(axisScale)
      ? center(axisScale.copy(), offset)
      : number(axisScale.copy());
  }, [offset, axisScale]);

  const domainPath = useMemo(() => {
    const range = axisScale.range();
    const range0 = +range[0] + offset;
    const range1 = +range[range.length - 1] + offset;
    const size = tickSize ?? tickSizeOuter;
    const o = k * size;
    return orient === 'left' || orient === 'right'
      ? size
        ? `M${o},${range0}H${offset}V${range1}H${o}`
        : `M${offset},${range0}V${range1}`
      : size
      ? `M${range0},${o}V${offset}H${range1}V${o}`
      : `M${range0},${offset}H${range1}`;
  }, [k, offset, orient, axisScale, tickSize, tickSizeOuter]);

  const transform = useMemo(
    () => (orient === 'top' || orient === 'bottom' ? translateX : translateY),
    [orient]
  );

  const getTickTransform = useCallback(
    (d: Domain) => transform(position(d) + offset),
    [offset, position, transform]
  );

  return (
    <Group
      fill="none"
      fontSize="10"
      fontFamily="system-ui, AppleSDGothicNeo, sans-serif"
      {...props}
      textAnchor={textAnchor}
    >
      <Path className="domain" stroke="currentColor" d={domainPath} />
      {!hideTicks &&
        values.map((value, index) => (
          <Group
            key={index}
            className="tick"
            opacity="1"
            transform={getTickTransform(value)}
          >
            <Line stroke="currentColor" {...{ [x + '2']: k * tickSizeInner }} />
            <Text fill="currentColor" dy={dy} {...{ [x]: k * spacing }}>
              {format(value, index)}
            </Text>
          </Group>
        ))}
    </Group>
  );
};

function translateX<Domain extends AxisDomain>(x: Domain) {
  return `translate(${x},0)`;
}

function translateY<Domain extends AxisDomain>(y: Domain) {
  return `translate(0,${y})`;
}

function number<Domain extends AxisDomain>(scale: AxisScale<Domain>) {
  return (d: Domain) => Number(scale(d));
}

function center<Domain extends AxisDomain>(
  scale: ScaleBand<Domain> | ScalePoint<Domain>,
  offset: number
) {
  offset = Math.max(0, scale.bandwidth() - offset * 2) / 2;
  if (scale.round()) {
    offset = Math.round(offset);
  }
  return (d: Domain) => Number(scale(d)) + offset;
}

function hasBandwidth<Domain extends AxisDomain>(
  scale: AxisScale<Domain>
): scale is ScaleBand<Domain> | ScalePoint<Domain> {
  return !!scale.bandwidth;
}

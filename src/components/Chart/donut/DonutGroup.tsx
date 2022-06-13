import { useMemo } from 'react';

import {
  type NumberValue,
  type PieArcDatum,
  type ScaleOrdinal,
  arc,
  pie,
} from 'd3';

import { type GroupProps, Group, Path, Text } from '~/components/Chart';

type Datum = [unknown, NumberValue];

export type DonutGroupProps = {
  data: Datum[];
  innerRadius: number;
  outerRadius: number;
  pathColor?: ScaleOrdinal<string, string>;
  showLabel?: boolean;
  labelFormat?: (d: PieArcDatum<Datum>) => string;
  labelProps?: GroupProps;
};

export const DonutGroup = ({
  data,
  innerRadius,
  outerRadius,
  pathColor,
  showLabel,
  labelFormat = (d) => String(d.data[1]),
  labelProps,
}: DonutGroupProps) => {
  const pieData = useMemo<PieArcDatum<Datum>[]>(() => {
    return pie<Datum>()
      .sort(null)
      .value((d) => d[1].valueOf())(data);
  }, [data]);

  const d3Arc = useMemo(
    () =>
      arc<PieArcDatum<Datum>>()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius),
    [innerRadius, outerRadius]
  );

  return (
    <>
      <Group className="donut">
        {pieData.map((d) => (
          <Path
            key={d.index}
            d={String(d3Arc(d))}
            fill={pathColor?.(String(d.data[0]))}
          />
        ))}
      </Group>
      {showLabel && (
        <Group
          className="labels"
          fontFamily="system-ui, AppleSDGothicNeo, sans-serif"
          textAnchor="middle"
          {...labelProps}
        >
          {pieData.map((d) => (
            <Text key={d.index} transform={`translate(${d3Arc.centroid(d)})`}>
              {labelFormat(d)}
            </Text>
          ))}
        </Group>
      )}
    </>
  );
};

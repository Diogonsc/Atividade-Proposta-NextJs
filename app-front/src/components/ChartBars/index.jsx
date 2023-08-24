import React, { useMemo } from "react";
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Text } from '@visx/text';


const salesData = [
  { month: 'Jan', value: 3500 },
  { month: 'Fer', value: 2200 },
  { month: 'Mar', value: 1800 },
  { month: 'Abr', value: 2400 },
  { month: 'Mai', value: 2800 },
  { month: 'Jun', value: 2100 },
  { month: 'Jul', value: 2600 },
  { month: 'Ago', value: 2900 },
  { month: 'Set', value: 3200 },
  { month: 'Out', value: 2700 },
  { month: 'Nov', value: 3100 },
  { month: 'Dez', value: 3500 },
];

const ChartBars = () => {
  const width = 800;
  const height = 500;
  const margin = { top: 20, bottom: 40, left: 60, right: 20 };

  const data = salesData;

  const getLabel = (d) => d.month;
  const getValue = (d) => d.value;

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const xScale = useMemo(
    () => 
    scaleBand({
      range: [0, xMax],
      round: true,
      domain: data.map(getLabel),
      padding: 0.4,
    }),
    [xMax, data],
  );

  const yScale = useMemo(
    () =>
    scaleLinear({
      range: [xMax, 0],
      round: true,
      domain: [0, Math.max(...data.map(getValue))],
    }),
    [xMax, data],
  );

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <Group top={margin.top} left={margin.left}>
        {data.map((d) => {
          const label = getLabel(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(getValue(d)) ?? 0);
          const barX = xScale(label);
          const barY = yMax - barHeight;
          return (
            <Bar 
              key={`bar-${label}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="var(--YELLOW)"
            />
          );
        })}
        {/* Legendas no eixo */}
        {data.map((d) => {
          const label = getLabel(d);
          const barX = (xScale(label)?.valueOf() ?? 0) + xScale.bandwidth() / 2;

          const barY = yMax + 10 
          return (
            <Text 
              key={`label-${label}`}
              x={barX}
              y={barY}
              dy='.33em'
              fontSize={10}
              textAnchor='middle'
              fill='#333'
            >
              {label}
            </Text>
          );
        })}
 
        {yScale.ticks().map((tickValue) => {
          const tickX = -10;
          const tickY = yScale(tickValue);
          return(
            <Text 
              key={`label-${tickValue}`}
              x={tickX}
              y={tickY}
              dy='.33em'
              fontSize={10}
              textAnchor='middle'
              fill='#333'
            >
              {tickValue}
            </Text>
          );
        })}
      </Group>
    </svg>
  );
};

export default ChartBars;

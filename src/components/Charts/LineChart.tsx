import type { EChartsOption } from 'echarts';
import { useEffect, useRef } from 'react';
import type { FC } from 'react';
import * as echarts from 'echarts';

export type LineChartData = [string, number][];
interface Props {
  data: LineChartData;
  height?: string;
  valuePrefix?: string;
}

export const LineChart: FC<Props> = ({ data, height, valuePrefix }) => {
  const line = useRef<HTMLDivElement>(null);

  const maxValue = parseInt(
    (Math.max(...data.map((item) => item[1])) * 1.1).toFixed(0)
  );
  const left = maxValue.toString().length * 10;

  const option: EChartsOption = {
    // Make gradient line here
    visualMap: {
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      min: 0,
      max: maxValue,
    },
    grid: {
      bottom: '24px',
      top: '16px',
      left,
      right: '8px',
    },
    tooltip: {
      trigger: 'axis',
      valueFormatter: (value) => `${valuePrefix ?? ''}${value}`,
    },
    xAxis: {
      data: data.map((item) => item[0]),
      axisLine: { lineStyle: { color: '#909399' } },
      axisLabel: {
        formatter: (value: string) => value.slice(5),
        color: '#909399',
        margin: 12,
      },
    },
    yAxis: {
      splitLine: { lineStyle: { color: '#0000000f' } },
      axisLabel: { color: '#909399' },
    },
    series: [
      {
        type: 'line',
        symbolSize: 8,
        showSymbol: false,
        data: data.map((item) => item[1]),
      },
    ],
  };

  let myChart: echarts.ECharts;
  const resize = () => {
    myChart?.resize();
  };
  window.addEventListener('resize', resize);
  useEffect(() => {
    if (!line.current) return;
    myChart = echarts.init(line.current);
    myChart.setOption(option);

    return () => {
      myChart.dispose();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <div w-full px-16px style={{ height: height ?? '24vh' }} ref={line} />;
};

import type { EChartsOption } from 'echarts';
import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import * as echarts from 'echarts';

export type LineChartData = [string, number][];

interface Props {
  data: LineChartData;
  height?: string;
}

export const LineChart: FC<Props> = ({ data, height }) => {
  const line = useRef<HTMLDivElement>(null);
  const myChart = useRef<echarts.ECharts>();

  // 设置图表
  const [options, _setOptions] = useState<EChartsOption>({});
  const setOptions = (
    data: LineChartData,
    maxValue: number,
    left: number,
    needZoom: boolean
  ) => {
    const newOptions: EChartsOption = {
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
        top: '24px',
        left: '24px',
        right: '24px',
      },
      tooltip: {
        trigger: 'axis',
        valueFormatter: (value) => `¥${value}`,
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
        splitLine: { lineStyle: { color: '#0000000F' } },
        axisLabel: { show: false },
      },
      series: [
        {
          type: 'line',
          symbolSize: 6,
          showSymbol: false,
          data: data.map((item) => item[1]),
          lineStyle: {
            width: 1.5,
          },
        },
      ],
    };

    if (needZoom) {
      newOptions.dataZoom = {
        type: 'inside',
        zoomLock: true,
        start: 0,
        end: (60 / data.length) * 100,
      };
    }

    _setOptions(newOptions);
  };

  // data 变化时，更新 options
  useEffect(() => {
    if (data.length > 0) {
      const maxValue = Math.max(...data.map((item) => item[1]));
      const left = (maxValue.toString().length + 1) * 16;
      const needZoom = data.length > 60;
      setOptions(data, maxValue, left, needZoom);
    }
  }, [data]);

  // options 变化时，更新图表
  useEffect(() => {
    myChart.current?.setOption(options);
  }, [options]);

  const resize = () => {
    myChart.current?.resize();
  };
  useEffect(() => {
    if (!line.current) return;
    window.addEventListener('resize', resize);
    myChart.current = echarts.init(line.current);
    myChart.current.setOption(options);

    return () => {
      myChart.current?.dispose();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <div style={{ height: height ?? '24vh' }} ref={line} />;
};

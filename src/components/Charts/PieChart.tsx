import type { EChartsOption } from 'echarts';
import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import * as echarts from 'echarts';

export type PieChartData = [string, number][];
interface Props {
  data: PieChartData;
  height?: string;
  valuePrefix?: string;
}

export const PieChart: FC<Props> = ({ data, height, valuePrefix }) => {
  const pie = useRef<HTMLDivElement>(null);
  const myChart = useRef<echarts.ECharts>();

  // 设置图表
  const [options, _setOptions] = useState<EChartsOption>({});
  const setOptions = (data: PieChartData, valuePrefix?: string) => {
    const newOptions: EChartsOption = {
      color: ['#7A5980', '#FF5964', '#75DBCD', '#247BA0', '#F4D35E'],
      // backgroundColor: '#fff',
      tooltip: {
        trigger: 'none',
        valueFormatter: (value) => `${valuePrefix ?? ''}${value}`,
      },
      legend: {
        orient: 'vertical',
        top: 'center',
        left: '12px',
      },
      grid: {
        top: '0px',
        bottom: '0px',
        left: '0px',
        right: '0px',
      },
      series: [
        {
          type: 'pie',
          radius: ['52%', '80%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 8,
            borderColor: '#fff',
            borderWidth: 3,
            decal: {
              color: '#ffffff33',
              backgroundColor: 'transparent',
              dashArrayX: [1, 0],
              dashArrayY: [4, 3],
              rotation: -Math.PI / 4,
            },
          },
          label: {
            show: false,
            position: 'center',
            formatter: [
              '{name|{b}}',
              `{value|${valuePrefix ?? ''}{c}}`,
              '{percent|{d}%}',
            ].join('\n'),
            rich: {
              name: {
                color: '#909399',
                fontSize: 12,
                lineHeight: 20,
              },
              value: {
                color: '#303133',
                fontSize: 22,
                lineHeight: 40,
                fontWeight: 'bold',
              },
              percent: {
                color: '#fff',
                fontSize: 14,
                fontWeight: 'bold',
                borderWidth: 0,
                backgroundColor: '#ffaa5a',
                borderRadius: 4,
                padding: [2, 4],
              },
            },
          },
          emphasis: { label: { show: true } },
          labelLine: { show: false },
          data: data.map(([name, value]) => ({ value, name })),
        },
      ],
    };

    _setOptions(newOptions);
  };

  // const highlightMax = () => {
  //   const values = data.map(([name, value]) => value);
  //   const max = Math.max(...values);
  //   const index = values.indexOf(max);
  //   myChart.current?.dispatchAction({
  //     type: 'highlight',
  //     dataIndex: index,
  //   });
  // };

  // data 变化时，更新 options
  useEffect(() => {
    if (data.length > 0) {
      setOptions(data, valuePrefix);
    }
  }, [data, valuePrefix]);

  // options 变化时，更新图表
  useEffect(() => {
    myChart.current?.setOption(options);
  }, [options]);

  const resize = () => {
    myChart.current?.resize();
  };
  useEffect(() => {
    if (!pie.current) return;
    window.addEventListener('resize', resize);
    myChart.current = echarts.init(pie.current);
    myChart.current.setOption(options);

    // 每次渲染完成自动高亮最大值
    // myChart.current.on('finished', highlightMax);

    return () => {
      myChart.current?.dispose();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <div w-full style={{ height: height ?? '30vh' }} ref={pie} />;
};

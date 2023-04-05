import type { FC } from 'react';

export type RankChartData = {
  tag: { name: string; sign: string };
  amount: number;
}[];

interface Props {
  data: RankChartData;
  valuePrefix?: string;
}
export const RankChart: FC<Props> = ({ data, valuePrefix }) => {
  if (data.length === 0) return null;
  return (
    <div mt-12px flex flex-col gap-24px>
      {data.map(({ tag, amount }) => {
        return (
          <div
            key={tag.name}
            grid
            grid-rows-2
            grid-cols='[48px_1fr_1fr]'
            items-center
            px-16px
            gap-x-12px
            text-14px
          >
            <div
              style={{ gridArea: '1/1/3/2' }}
              w-48px
              h-48px
              bg='#0000000f'
              rounded-24px
              leading-48px
              text-center
              text-24px
            >
              {tag.sign}
            </div>
            <div style={{ gridArea: '1/2/2/3' }} color='#303133'>
              {tag.name}
            </div>
            <div
              style={{ gridArea: '1/3/2/4' }}
              text-end
              text-16px
              font-bold
              color='#303133'
            >
              {valuePrefix ?? ''} {amount}
            </div>
            <div
              style={{ gridArea: '2/2/3/4' }}
              bg-red
              h-12px
              rounded-6px
            ></div>
          </div>
        );
      })}
    </div>
  );
};

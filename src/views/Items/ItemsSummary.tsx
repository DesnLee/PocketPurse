import type { FC } from 'react';

export const ItemsSummary: FC = () => {
  return (
    <ul
      flex
      justify-between
      mx-16px
      my-24px
      py-16px
      px-36px
      rounded-12px
      bg='#0000000a'
      children-flex
      children-flex-col
      children-gap-8px
      children-justify-center
      children-items-center
    >
      <li>
        <h3 text-14px color='#909399'>
          收入
        </h3>
        <p text-20px color='#22ba58' font-bold>
          100
        </p>
      </li>
      <li>
        <h3 text-14px color='#909399'>
          支出
        </h3>
        <p text-20px font-bold color='#dd400f'>
          100
        </p>
      </li>
      <li>
        <h3 text-14px color='#909399'>
          结余
        </h3>
        <p text-20px font-bold color='#606266'>
          100
        </p>
      </li>
    </ul>
  );
};

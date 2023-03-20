import type { FC } from 'react';
import saveMoney from '../../assets/images/welcome/save_money.svg';

export const Welcome1: FC = () => {
  return (
    <div>
      <img w-200px src={saveMoney} alt='save money' opacity-92 />
      <h2 flex flex-col items-center mt-36px text-black text-16px>
        <span mb-8px>会挣钱</span>
        <span>还要会省钱</span>
      </h2>
    </div>
  );
};

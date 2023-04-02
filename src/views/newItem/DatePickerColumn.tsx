import { useState } from 'react';
import type { FC } from 'react';
import styled from 'styled-components';
import { time } from '../../lib/time';

const PickerWrapper = styled.div<{ style: any }>`
  height: var(--panel-height);
  font-size: 16px;
  position: relative;
  overflow: hidden;
  flex: 1;

  //> .selector {
  //  position: absolute;
  //  top: calc(50% - (var(--items-height) / 2) * 1px);
  //  background: #00000009;
  //  height: calc(var(--items-height) * 1px);
  //  left: 12px;
  //  right: 12px;
  //  border-radius: 12px;
  //}

  > .list-wrapper {
    position: absolute;
    width: 100%;
    top: calc(50% - var(--items-height) / 2 * 1px);
  }
`;
const PickerList = styled.ol<{ style: any }>`
  transform: translateY(calc(var(--axis-y) * 1px));
  transition: transform calc(var(--duration) * 1s) linear;

  > li {
    text-align: center;
    line-height: calc(var(--items-height) * 1px);
  }
`;

interface Props {
  start?: Date;
  end?: Date;
  value?: Date;
  itemsHeight?: number;
  pickerHeight?: string;
}
export const DatePickerColumn: FC<Props> = ({
  start,
  end,
  value,
  itemsHeight = 44,
  pickerHeight = '44vh',
}) => {
  // 通用控制变量
  const [duration, setDuration] = useState(0);
  const [isTouching, setIsTouching] = useState(false);

  // 计算年份列表，默认从今年往前推 5 年
  const startYear = start ? time(start).year : time().add(-5, 'year').year;
  const endYear = end ? time(end).year : time().year;
  // 保证 startYear < endYear
  if (startYear > endYear)
    throw new Error('startYear must be less than endYear');
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => i + startYear
  );
  // 计算年份初始位置，选中 value 或今年
  const initialIndex = years.findIndex((year) => year === time(value).year);
  const [oldY, setOldY] = useState(0);
  const [translateY, setTranslateY] = useState(-initialIndex * itemsHeight);

  return (
    <PickerWrapper
      style={{
        '--panel-height': pickerHeight,
        '--items-height': itemsHeight,
        '--duration': duration,
      }}
      // 手指按下时，记录按下位置，设置动画时间为 0
      onTouchStart={(e) => {
        setDuration(0);
        setIsTouching(true);
        setOldY(e.touches[0].clientY);
      }}
      // 手指移动时，计算移动距离，设置 translateY 跟随滚动
      onTouchMove={(e) => {
        if (isTouching) {
          const deltaY = e.touches[0].clientY - oldY;
          setTranslateY((prev) => prev + deltaY);
          setOldY(e.touches[0].clientY);
        }
      }}
      // 核心滚动逻辑，手指离开时计算位置动画到最近的位置
      onTouchEnd={() => {
        // 滚动到最近的年份
        // 取余数，判断余数大于一半，就向上或向下滚动一格
        const reminder = translateY % itemsHeight;
        // 滚动到最近的上面一格
        let target = translateY - reminder;
        // 如果余数大于一半，就再向下滚动一格
        if (Math.abs(reminder) > itemsHeight / 2) {
          target += reminder > 0 ? itemsHeight : -itemsHeight;
        }

        // 限制滚动范围
        target = Math.min(target, 0);
        target = Math.max(target, -itemsHeight * (years.length - 1));

        // 设置滚动位置和动画时间
        setTranslateY(target);
        setDuration(0.08);
        setIsTouching(false);
      }}
    >
      {/* <div className='selector' /> */}
      <div className='list-wrapper'>
        <PickerList style={{ '--axis-y': translateY }}>
          {years.map((year) => (
            <li key={year}>{year}</li>
          ))}
        </PickerList>
      </div>
    </PickerWrapper>
  );
};

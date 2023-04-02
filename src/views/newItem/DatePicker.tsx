import { useRef, useState } from 'react';
import type { FC } from 'react';
import styled from 'styled-components';
import { time } from '../../lib/time';
import type { DateKind } from '../../lib/time';
import { DatePickerColumn } from './DatePickerColumn';

interface Props {
  start?: Date;
  end?: Date;
  defaultValue?: Date;
  itemsHeight?: number;
  pickerHeight?: string;
  onChange?: (value: Date) => void;
}
export const DatePicker: FC<Props> = (props) => {
  const { start, end, defaultValue, onChange, itemsHeight = 44 } = props;

  // 获取三个时间的 Time 对象，默认年份往前推 5 年
  const startTime = time(start ?? time().add(-5, 'year').date);
  const endTime = time(end ?? new Date());
  // 保证 startTime < endTime
  if (startTime.timestamp > endTime.timestamp)
    throw new Error('startYear must be less than endYear');

  const [, update] = useState({});
  const valueTime = useRef(time(defaultValue ?? new Date()));
  const _onChange = (newValue: number, key: DateKind) => {
    // 如果日期变化，看日是否超出范围，超出则置为最后一天
    let maxDay = 31;
    if (key === 'month' || key === 'year') {
      const newDate = time();
      newDate.dateObject = {
        year: key === 'month' ? valueTime.current.year : newValue,
        month: key === 'year' ? valueTime.current.month : newValue,
        day: 1,
      };
      maxDay = newDate.lastDayOfMonth.day;
    }

    if (valueTime.current.day > maxDay) {
      valueTime.current.day = maxDay;
    }
    valueTime.current[key] = newValue;

    // 如果选择的时间晚于当前时间，置为当前时间
    if (valueTime.current.timestamp > time().timestamp) {
      valueTime.current.dateObject = time().dateObject;
    }

    update({});
    onChange?.(valueTime.current.date);
  };

  // 计算年列表
  const yearList = Array.from(
    { length: endTime.year - startTime.year + 1 },
    (_, i) => i + startTime.year
  );

  // 计算月列表，今天之前
  let monthList: number[];
  if (valueTime.current.year === time().year) {
    monthList = Array.from({ length: time().month }, (_, i) => i + 1);
  } else {
    monthList = Array.from({ length: 12 }, (_, i) => i + 1);
  }

  // 计算日列表，今天之前
  let dayList: number[];
  if (
    valueTime.current.year === time().year &&
    valueTime.current.month === time().month
  ) {
    dayList = Array.from({ length: time().day }, (_, i) => i + 1);
  } else {
    dayList = Array.from(
      { length: valueTime.current.lastDayOfMonth.day },
      (_, i) => i + 1
    );
  }

  return (
    <div flex>
      <Selector style={{ '--items-height': itemsHeight }} />
      <DatePickerColumn
        {...props}
        value={valueTime.current.year}
        data={yearList}
        onChange={(year) => _onChange(year, 'year')}
      />
      <DatePickerColumn
        {...props}
        value={valueTime.current.month}
        data={monthList}
        onChange={(month) => _onChange(month, 'month')}
      />
      <DatePickerColumn
        {...props}
        value={valueTime.current.day}
        data={dayList}
        onChange={(day) => _onChange(day, 'day')}
      />
    </div>
  );
};

// 选中高亮条
const Selector = styled.div<{ style: any }>`
  position: absolute;
  top: calc(50% - (var(--items-height) / 2) * 1px);
  background: #00000009;
  height: calc(var(--items-height) * 1px);
  left: 12px;
  right: 12px;
  border-radius: 12px;
`;

import { useState } from 'react';
import type { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Icon } from '../../components';
import { usePopup } from '../../hooks';
import { time } from '../../lib/time';
import { DatePicker } from './DatePicker';

type KeyboardKeys =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '0'
  | '.'
  | 'backspace';

const keysMap: { key: ReactNode; value: KeyboardKeys; area: string }[] = [
  { key: '1', value: '1', area: '1 / 1 / 2 / 2' },
  { key: '2', value: '2', area: '1 / 2 / 2 / 3' },
  { key: '3', value: '3', area: '1 / 3 / 2 / 4' },
  { key: '4', value: '4', area: '2 / 1 / 3 / 2' },
  { key: '5', value: '5', area: '2 / 2 / 3 / 3' },
  { key: '6', value: '6', area: '2 / 3 / 3 / 4' },
  { key: '7', value: '7', area: '3 / 1 / 4 / 2' },
  { key: '8', value: '8', area: '3 / 2 / 4 / 3' },
  { key: '9', value: '9', area: '3 / 3 / 4 / 4' },
  { key: '0', value: '0', area: '4 / 1 / 5 / 3' },
  { key: '.', value: '.', area: '4 / 3 / 5 / 4' },
  {
    key: <Icon name='delete' size='28px' color='#606266' />,
    value: 'backspace',
    area: '1 / 4 / 2 / 5',
  },
];

export const AccountInput: FC = () => {
  // 日期 + 日期选择器
  const [date, setDate] = useState(new Date());
  const { Popup, open, close } = usePopup({
    children: (
      <DatePicker
        defaultValue={date}
        onConfirm={(v) => {
          setDate(v);
          close();
        }}
        onCancel={() => close()}
      />
    ),
  });

  // 设置金额
  const [output, _setOutput] = useState('0');
  const addNum = (num: KeyboardKeys) => {
    const [yuan, jiao] = output.split('.');

    // 如果正在输入小数
    if (jiao !== undefined) {
      _setOutput((prev) => prev + num);
    }
    // 如果正在输入整数
    else if (yuan.length < 9) {
      _setOutput((prev) => prev + num);
    }
  };
  const setOutput = (value: KeyboardKeys) => {
    // 限制小数点后两位
    if (value !== 'backspace') {
      if (output.includes('.') && output.length - output.indexOf('.') > 2)
        return;
    }

    switch (value) {
      case '0':
        if (output !== '0') addNum(value);
        break;
      case '.':
        _setOutput((prev) => (output.includes('.') ? prev : prev + value));
        break;
      case 'backspace':
        _setOutput((prev) => (output.length > 1 ? prev.slice(0, -1) : '0'));
        break;
      default:
        if (output === '0') {
          _setOutput(value);
        } else {
          addNum(value);
        }
    }
  };

  return (
    <div>
      {Popup}
      <div font-bold bg='#00000009' flex b-t-1 b-t='#00000009' b-t-solid>
        <CalendarWrapper onClick={open}>
          <Icon name='calendar' size='16px' color='[var(--color-primary)]' />
          <span>{time(date).format()}</span>
          <Icon name='arrow_right' size='16px' color='#c0c4cc' />
        </CalendarWrapper>
        <p
          text-20px
          color-black
          text-right
          overflow-auto
          font-mono
          p-16px
          flex-1
        >
          ¥{output}
        </p>
      </div>

      <div grid grid-rows='[repeat(4,56px)]' grid-cols-4 gap-1px bg='#00000006'>
        {keysMap.map(({ key, value, area }) => (
          <Button key={value} area={area} onClick={() => setOutput(value)}>
            {key}
          </Button>
        ))}
        <Button area='2 / 4 / 5 / 5' font='18px' primary>
          提交
        </Button>
      </div>
    </div>
  );
};

const Button = styled.button<{
  area: string;
  font?: string;
  primary?: boolean;
}>`
  grid-area: ${({ area }) => area};
  font-size: ${({ font }) => font ?? '24px'};
  background: ${({ primary }) => (primary ? 'var(--color-primary)' : '#fff')};
  color: ${({ primary }) => (primary ? '#fffe' : '#404244')};
  font-weight: bold;
  border: none;
  font-family: 'Heebo', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;

  &:active {
    background: ${({ primary }) => (!primary ? '#ffaa5a33' : '#ffaa5a99')};
  }
`;

const CalendarWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 14px;
  margin: 8px 12px;
  padding: 0 12px;
  color: #303133;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px 0 #0000000c;
`;

import type { FC } from 'react';
import styled from 'styled-components';
import { Icon } from '../../components';

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

export const AccountInput: FC = () => {
  return (
    <div>
      <div font-bold bg='#00000009' flex>
        <CalendarWrapper>
          <Icon name='calendar' size='16px' color='[var(--color-primary)]' />
          <span>2023-03-14</span>
          <Icon name='arrow_right' size='16px' color='#c0c4cc' />
        </CalendarWrapper>
        <p
          text-20px
          color-black
          text-right
          overflow-scroll
          font-mono
          p-16px
          flex-1
        >
          ¥123456789.01
        </p>
      </div>
      <div grid grid-rows='[repeat(4,56px)]' grid-cols-4 gap-1px bg='#00000006'>
        <Button area='1 / 1 / 2 / 2'>1</Button>
        <Button area='1 / 2 / 2 / 3'>2</Button>
        <Button area='1 / 3 / 2 / 4'>3</Button>
        <Button area='2 / 1 / 3 / 2'>4</Button>
        <Button area='2 / 2 / 3 / 3'>5</Button>
        <Button area='2 / 3 / 3 / 4'>6</Button>
        <Button area='3 / 1 / 4 / 2'>7</Button>
        <Button area='3 / 2 / 4 / 3'>8</Button>
        <Button area='3 / 3 / 4 / 4'>9</Button>
        <Button area='4 / 1 / 5 / 3'>0</Button>
        <Button area='4 / 3 / 5 / 4'>.</Button>
        <Button area='1 / 4 / 2 / 5'>
          <Icon name='delete' size='28px' color='#606266' />
        </Button>
        <Button area='2 / 4 / 5 / 5' font='18px' primary={true}>
          提交
        </Button>
      </div>
    </div>
  );
};

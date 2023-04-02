import type { FC } from 'react';
import styled from 'styled-components';
import { DatePickerColumn } from './DatePickerColumn';

interface Props {
  start?: Date;
  end?: Date;
  value?: Date;
  itemsHeight?: number;
  pickerHeight?: string;
}
export const DatePicker: FC<Props> = (props) => {
  const { itemsHeight = 44, pickerHeight = '44vh' } = props;
  return (
    <div flex>
      <Selector style={{ '--items-height': itemsHeight }} />
      <DatePickerColumn {...props} />
      <DatePickerColumn {...props} />
      <DatePickerColumn {...props} />
    </div>
  );
};

const Selector = styled.div<{ style: any }>`
  position: absolute;
  top: calc(50% - (var(--items-height) / 2) * 1px);
  background: #00000009;
  height: calc(var(--items-height) * 1px);
  left: 12px;
  right: 12px;
  border-radius: 12px;
`;

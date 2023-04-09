import type { FC, ReactNode } from 'react';
import styled from 'styled-components';

export interface DateInputProps {
  align?: 'left' | 'center';
  label?: string | ReactNode;
  labelWidth?: string;
  value?: string;
  placeholder?: string;
  rightBtn?: ReactNode;
}

export const DateInput: FC<DateInputProps> = ({
  align = 'left',
  label,
  value,
  placeholder,
  rightBtn,
  labelWidth = '3em',
}) => {
  const labelNode = () => {
    if (!label) return null;
    if (typeof label === 'string') {
      return <StringLabel labelWidth={labelWidth}>{label}</StringLabel>;
    } else {
      return <NodeLabel labelWidth={labelWidth}>{label}</NodeLabel>;
    }
  };

  return (
    <div flex gap-12px items-center w-full relative mb-32px>
      {labelNode()}
      <div relative grow-1 shrink-1 w-full flex items-center>
        <MyInput
          value={value}
          align={align}
          className='b-1 b-transparent p-y-4px p-l-12px min-h-48px leading-24px text-16px font-bold w-full rounded-8px bg-[#00000009] focus:bg-[#00000004] focus:b-1 focus:b-solid  focus:b-[var(--color-primary)]'
          type='text'
          placeholder={placeholder}
          color='#303133'
          readOnly={true}
        />
      </div>
      {rightBtn && (
        <span grow-0 shrink-0>
          {rightBtn}
        </span>
      )}
    </div>
  );
};

const StringLabel = styled.span<{ labelWidth: string }>`
  width: ${({ labelWidth }) => labelWidth || '3em'};
  text-align: right;
  color: #303133;
  font-size: 14px;
  flex-basis: ${({ labelWidth }) => labelWidth || '3em'};
  flex-shrink: 0;
  flex-grow: 0;
  display: block;
`;

const NodeLabel = styled.span<{ labelWidth: string }>`
  width: 24px;
  height: 24px;
  flex-basis: 24px;
  flex-shrink: 0;
  flex-grow: 0;
  color: #303133;
  display: flex;
  align-items: center;
  justify-content: center;

  & > * {
    width: ${({ labelWidth }) => labelWidth || '24px'};
    height: ${({ labelWidth }) => labelWidth || '24px'};
  }
`;

const MyInput = styled.input<{
  align: 'left' | 'center';
}>`
  text-align: ${({ align }) => align};
  padding-right: 16px;
`;

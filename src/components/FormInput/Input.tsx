import type { ChangeEvent, FC, ReactNode } from 'react';
import styled from 'styled-components';

//
const StringLabel = styled.span`
  width: ${(props: { labelWidth: string }) => props.labelWidth || '3em'};
  text-align: right;
  color: #303133;
  font-size: 14px;
  flex-basis: ${(props: { labelWidth: string }) => props.labelWidth || '3em'};
  flex-shrink: 0;
  flex-grow: 0;
  display: block;
`;
const NodeLabel = styled.span`
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
    width: ${(props: { labelWidth: string }) => props.labelWidth || '24px'};
    height: ${(props: { labelWidth: string }) => props.labelWidth || '24px'};
  }
`;

interface Props {
  label: string | ReactNode;
  labelWidth?: string;
  type?: 'text' | 'password' | 'email';
  onChange?: (value: string) => void;
  placeholder?: string;
  rightBtn?: ReactNode;
}

export const Input: FC<Props> = ({
  label,
  type = 'text',
  onChange,
  placeholder = `请输入${label}`,
  rightBtn,
  labelWidth = '3em',
}) => {
  const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange?.(value);
  };

  const labelNode = () => {
    if (typeof label === 'string') {
      return <StringLabel labelWidth={labelWidth}>{label}</StringLabel>;
    } else {
      return <NodeLabel labelWidth={labelWidth}>{label}</NodeLabel>;
    }
  };

  return (
    <div flex gap-12px items-center w-full>
      {labelNode()}
      <input
        b-1
        b-transparent
        p-y-4px
        p-x-12px
        min-h-48px
        leading-24px
        text-16px
        font-bold
        grow-1
        shrink-1
        w-full
        rounded-8px
        className='bg-white:64  focus:bg-white:92 focus:b-primary'
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
        color='#303133'
      />
      {rightBtn && (
        <span grow-0 shrink-0>
          {rightBtn}
        </span>
      )}
    </div>
  );
};

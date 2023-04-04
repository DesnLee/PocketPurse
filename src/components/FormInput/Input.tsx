import { useRef } from 'react';
import type { ChangeEvent, FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Icon } from '../Icon';

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
const MyInput = styled.input<{ clearable: boolean }>`
  padding-right: ${({ clearable }) => (clearable ? '40px' : '16px')};
`;
const ErrorSpan = styled.span<{ hasLabel: boolean; labelWidth: string }>`
  position: absolute;
  bottom: -22px;
  font-size: 12px;
  color: #f56c6c;
  left: ${({ labelWidth }) => labelWidth || '3em'};
  transform: ${({ hasLabel }) => `translateX(${hasLabel ? '28px' : '16px'})`};
  );
`;

interface Props {
  label?: string | ReactNode;
  labelWidth?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  onChange?: (value: string) => void;
  onBlur?: () => void;
  clearable?: boolean;
  placeholder?: string;
  errors?: string[];
  rightBtn?: ReactNode;
}

export const Input: FC<Props> = ({
  label,
  type = 'text',
  onChange,
  onBlur,
  placeholder = `请输入${label}`,
  rightBtn,
  labelWidth = '3em',
  errors = [],
  clearable = false,
}) => {
  const input = useRef<HTMLInputElement>(null);

  const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    onChange?.(value);
  };

  const onClear = () => {
    onChange?.('');
    input.current?.focus();
    input.current!.value = '';
  };

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
          clearable={clearable}
          ref={input}
          className='b-1 b-transparent p-y-4px p-l-12px min-h-48px leading-24px text-16px font-bold w-full rounded-8px bg-[#00000009] focus:bg-[#00000004] focus:b-1 focus:b-solid  focus:b-[var(--color-primary)]'
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
          onBlur={() => onBlur?.()}
          color='#303133'
        />
        {clearable && input.current?.value && (
          <Icon
            name='clear'
            color='#0003'
            size='16px'
            className='absolute right-[16px]'
            onClick={onClear}
          />
        )}
      </div>
      {errors.length > 0 && (
        <ErrorSpan labelWidth={labelWidth} hasLabel={!!label}>
          {errors[0]}
        </ErrorSpan>
      )}
      {rightBtn && (
        <span grow-0 shrink-0>
          {rightBtn}
        </span>
      )}
    </div>
  );
};

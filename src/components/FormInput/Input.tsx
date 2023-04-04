import type { FC } from 'react';
import { EmojiInput } from './EmojiInput';
import type { EmojiInputProps } from './EmojiInput';
import { TextInput } from './TextInput';
import type { TextInputProps } from './TextInput';

type Props = {} & (
  | ({
      type: 'emoji';
    } & EmojiInputProps)
  | ({
      type: 'text' | 'email' | 'number';
    } & TextInputProps)
);

export const Input: FC<Props> = (props) => {
  if (props.type === 'emoji') {
    return <EmojiInput {...props} />;
  } else {
    return <TextInput {...props} />;
  }
};

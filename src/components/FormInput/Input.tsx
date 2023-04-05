import type { FC } from 'react';
import { EmojiInput } from './EmojiInput';
import type { EmojiInputProps } from './EmojiInput';
import { NavBarSelectInput } from './NavBarSelectInput';
import type { SelectInputProps } from './NavBarSelectInput';
import { TextInput } from './TextInput';
import type { TextInputProps } from './TextInput';

type Props = {} & (
  | ({
      type: 'emoji';
    } & EmojiInputProps)
  | ({
      type: 'text' | 'email' | 'number';
    } & TextInputProps)
  | ({
      type: 'navSelect';
    } & SelectInputProps)
);

export const Input: FC<Props> = (props) => {
  if (props.type === 'emoji') {
    return <EmojiInput {...props} />;
  } else if (props.type === 'navSelect') {
    return <NavBarSelectInput {...props} />;
  } else {
    return <TextInput {...props} />;
  }
};

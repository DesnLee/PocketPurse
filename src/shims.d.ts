import type { AttributifyAriaAttributes } from 'unocss/preset-attributify';

declare module 'react' {
  interface HTMLAttributes<T> extends AttributifyAriaAttributes {
    // extends React  HTMLAttributes
    flex?: boolean;
    h?: string;
    w?: string;
    absolute?: boolean;
    relative?: boolean;
    py?: string;
    px?: string;
    text?: string;
    bg?: string;
    fixed?: boolean;
    shadow?: string | boolean;
    sticky?: boolean;
  }
}

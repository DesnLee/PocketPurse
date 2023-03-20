import type { AttributifyAriaAttributes } from 'unocss/preset-attributify';

declare module 'react' {
  interface HTMLAttributes<T> extends AttributifyAriaAttributes {
    // extends React  HTMLAttributes
    flex?: boolean;
  }
}

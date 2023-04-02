import { animated, useSpring } from '@react-spring/web';
import { useState } from 'react';
import type { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PopupProps {
  isVisible: boolean;
  setVisible: (value: boolean) => void;
  children: ReactNode;
}
const PopupElement: FC<PopupProps> = ({ isVisible, setVisible, children }) => {
  const panelAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: `translateY(${isVisible ? '0%' : '100%'})`,
  });

  const maskAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    pointerEvents: (isVisible ? 'auto' : 'none') as 'auto' | 'none',
  });

  return (
    <>
      <animated.div
        style={panelAnimation}
        fixed
        bottom-0
        left-0
        bg-white
        w-full
        min-w-16em
        flex
        flex-col
        z='[var(--z-index-popup)]'
        touch-none
      >
        {children}
      </animated.div>
      <animated.div
        style={maskAnimation}
        fixed
        top-0
        left-0
        w-full
        h-full
        className='bg-black:56'
        z='[var(--z-index-popup)-1]'
        onClick={() => setVisible(false)}
        touch-none
      />
    </>
  );
};

interface UsePopupProps {
  children: ReactNode;
}

export const usePopup = ({ children }: UsePopupProps) => {
  const [isVisible, setVisible] = useState(false);
  const Popup = createPortal(
    <PopupElement isVisible={isVisible} setVisible={setVisible}>
      {children}
    </PopupElement>,
    document.body
  );

  const open = () => setVisible(true);
  const close = () => setVisible(false);
  const toggle = () => setVisible((value) => !value);

  return {
    Popup,
    open,
    close,
    toggle,
  };
};

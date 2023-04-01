import { animated, useSpring } from '@react-spring/web';
import { useState } from 'react';
import type { FC } from 'react';
import { createPortal } from 'react-dom';

interface PopupProps {
  isVisible: boolean;
  setVisible: (value: boolean) => void;
}
const PopupElement: FC<PopupProps> = ({ isVisible, setVisible }) => {
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
        h='1/3'
        min-w-16em
        flex
        flex-col
        z='[var(--z-index-popup)]'
      />
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
      />
    </>
  );
};

export const usePopup = () => {
  const [isVisible, setVisible] = useState(false);
  const Popup = createPortal(
    <PopupElement isVisible={isVisible} setVisible={setVisible} />,
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

import { animated, useSpring } from '@react-spring/web';
import { useState } from 'react';
import type { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PopupProps {
  isVisible: boolean;
  setVisible: (value: boolean) => void;
  children: ReactNode;
  position: 'center' | 'bottom';
  closeOnClickMask: boolean;
}

const PopupElement: FC<PopupProps> = ({
  isVisible,
  setVisible,
  children,
  position,
  closeOnClickMask,
}) => {
  const panelAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform:
      position === 'bottom' ? `translateY(${isVisible ? '0%' : '100%'})` : '',
  });

  const maskAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    pointerEvents: (isVisible ? 'auto' : 'none') as 'auto' | 'none',
  });

  const panel = () => {
    if (position === 'bottom') {
      return (
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
          rounded-t-12px
          overflow-hidden
        >
          {children}
        </animated.div>
      );
    } else if (position === 'center') {
      return (
        <animated.div
          style={panelAnimation}
          fixed
          top='50%'
          left='50%'
          translate-x='-50%'
          translate-y='-50%'
          z='[var(--z-index-popup)]'
          touch-none
          rounded-t-12px
          overflow-hidden
        >
          {children}
        </animated.div>
      );
    }
  };

  return (
    <>
      {panel()}
      <animated.div
        style={maskAnimation}
        fixed
        top-0
        left-0
        w-full
        h-full
        className='bg-black:56'
        z='[calc(var(--z-index-popup)-1)]'
        onClick={() => closeOnClickMask && setVisible(false)}
        touch-none
      />
    </>
  );
};

interface UsePopupProps {
  children: ReactNode;
  position?: 'center' | 'bottom';
  closeOnClickMask?: boolean;
}

export const usePopup = ({
  children,
  position = 'bottom',
  closeOnClickMask = true,
}: UsePopupProps) => {
  const [isVisible, setVisible] = useState(false);
  const Popup = createPortal(
    <PopupElement
      position={position}
      isVisible={isVisible}
      setVisible={setVisible}
      closeOnClickMask={closeOnClickMask}
    >
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

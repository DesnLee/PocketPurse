import { useState } from 'react';
import type { FC } from 'react';
import styled from 'styled-components';

const List = styled.ol<{ style: any }>`
  transform: translateY(calc(var(--axis-y) * 1px));
  transition: transform calc(var(--duration) * 1s) linear;

  > li {
    text-align: center;
    line-height: 44px;
  }
`;

export const TimePicker: FC = () => {
  const [isTouching, setIsTouching] = useState(false);
  const [oldY, setOldY] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [duration, setDuration] = useState(0);

  return (
    <div
      h-46vh
      text-16px
      relative
      overflow-hidden
      onTouchStart={(e) => {
        setDuration(0);
        setIsTouching(true);
        setOldY(e.touches[0].clientY);
      }}
      onTouchMove={(e) => {
        if (isTouching) {
          const deltaY = e.touches[0].clientY - oldY;
          setTranslateY((prev) => prev + deltaY);
          setOldY(e.touches[0].clientY);
        }
      }}
      onTouchEnd={() => {
        const reminder = translateY % 44;
        let target = translateY - reminder;
        target += Math.abs(reminder) > 22 ? (44 * reminder > 0 ? 1 : -1) : 0;
        setTranslateY(target);
        setDuration(0.08);
        setIsTouching(false);
      }}
    >
      <div
        absolute
        top='[calc(50%-22px)]'
        bg='#00000009'
        h-44px
        left-12px
        right-12px
        rounded-12px
      />
      <div absolute top='[calc(50%-22px)]' w-full>
        <List style={{ '--axis-y': translateY, '--duration': duration }}>
          <li>1231</li>
          <li>1223</li>
          <li>12433</li>
          <li>1243</li>
          <li>123</li>
          <li>1253</li>
          <li>1233</li>
          <li>12313</li>
          <li>1213</li>
          <li>1243</li>
          <li>125413</li>
          <li>1223</li>
          <li>1233</li>
          <li>123</li>
          <li>4</li>
          <li>123</li>
          <li>1623</li>
          <li>12423</li>
          <li>123</li>
          <li>15123</li>
          <li>12513</li>
          <li>123</li>
        </List>
      </div>
    </div>
  );
};

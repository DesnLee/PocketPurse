import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Icon, Input, TopNav, TopNavGradient } from '../../components';
import { emojis } from '../../lib/emojis';

export const NewTag: FC = () => {
  const [currentTab, setCurrentTab] = useState(emojis[0].key);
  const [currentEmoji, setCurrentEmoji] = useState(emojis[0].symbols[0]);
  const emojisPanel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    emojisPanel.current?.scrollTo({
      top: 0,
    });
  }, [currentTab]);

  const nav = useNavigate();
  return (
    <div pp-page-wrapper>
      <TopNavGradient disableShadow={true}>
        <TopNav
          title='新建标签'
          leftIcon={<Icon name='arrow_left' onClick={() => nav(-1)} />}
        />
      </TopNavGradient>

      <div flex justify-center mb-16px>
        <span
          h-96px
          w-96px
          bg='#0000000f'
          rounded-48px
          text-center
          leading-96px
          text-48px
        >
          {currentEmoji}
        </span>
      </div>

      <main flex-1 flex flex-col px-16px pb-16px overflow-auto>
        <Input align='center' labelWidth='0' placeholder='请输入标签名' />

        <div flex-1 flex flex-col overflow-auto gap-8px>
          <div
            flex-1
            overflow-auto
            flex
            flex-col
            b-1
            b-solid
            b='[var(--color-primary)]'
            rounded-12px
          >
            <ol
              flex
              overflow-auto
              className={'hide-scrollbar'}
              b-1
              b-b-solid
              b-b='#0000000f'
            >
              {emojis.map(({ key, name }) => (
                <TabItem
                  key={key}
                  onClick={() => setCurrentTab(key)}
                  className={currentTab === key ? 'selected' : ''}
                >
                  {name}
                </TabItem>
              ))}
            </ol>

            <div
              px-12px
              overflow-auto
              flex-1
              pt-8px
              pb-24px
              className={'hide-scrollbar'}
              grid
              grid-cols='[repeat(auto-fit,36px)]'
              grid-rows='[repeat(auto-fit,36px)]'
              gap-4px
              ref={emojisPanel}
              text-24px
            >
              {emojis
                .find(({ key }) => key === currentTab)
                ?.symbols.map((symbol) => (
                  <EmojiItem
                    onClick={() => setCurrentEmoji(symbol)}
                    className={currentEmoji === symbol ? 'selected' : ''}
                  >
                    {symbol}
                  </EmojiItem>
                ))}
            </div>
          </div>
          <p text-center text-12px color='#909399'>
            点击选择表情，记账页标签列表可长按编辑
          </p>
        </div>

        <button pp-btn-primary mt-24px>
          保存
        </button>
      </main>
    </div>
  );
};

const TabItem = styled.div`
  white-space: nowrap;
  padding: 8px 12px;
  border-bottom: 2px solid transparent;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  color: #909399;

  &.selected {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
`;

const EmojiItem = styled.span`
  border: 2px solid transparent;
  height: 36px;
  width: 36px;
  line-height: 32px;
  text-align: center;

  &.selected {
    border-color: var(--color-primary);
    background-color: #00000016;
    border-radius: 8px;
  }
`;

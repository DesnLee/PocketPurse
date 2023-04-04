import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, Input, TopNav, TopNavGradient } from '../../components';

export const NewTag: FC = () => {
  const currentEmoji = '😄';
  const nav = useNavigate();
  return (
    <div pp-page-wrapper>
      <TopNavGradient disableShadow={true}>
        <TopNav
          title='新建标签'
          leftIcon={<Icon name='arrow_left' onClick={() => nav(-1)} />}
        />
      </TopNavGradient>

      <main flex-1 flex flex-col px-16px pt-16px pb-28px overflow-auto>
        <Input
          labelWidth='0'
          placeholder='请输入标签名'
          clearable
          errors={['请输入标签名']}
        />

        <div flex-1 flex flex-col overflow-auto gap-8px>
          <p shrink-0 grow-0>
            Emoji {currentEmoji}
          </p>
          <div
            flex-1
            overflow-auto
            flex
            flex-col
            b-1
            b-solid
            b='[var(--color-primary)]'
          >
            <ol flex gap-8px overflow-auto shrink-0 grow-0>
              <li>表情</li>
              <li>风景</li>
              <li>人物</li>
            </ol>
            <div
              overflow-auto
              flex-1
              pt-16px
              pb-36px
              px-12px
              className={'hide-scrollbar'}
            >
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p> <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p> <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p> <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
              <p>表情</p>
            </div>
          </div>
          <p grow-0 shrink-0>
            点击选择表情，标签列表可长按编辑
          </p>
        </div>

        <button pp-btn-primary mt-16px>
          保存
        </button>
      </main>
    </div>
  );
};

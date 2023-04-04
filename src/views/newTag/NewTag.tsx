import { useState } from 'react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Icon, Input, TopNav, TopNavGradient } from '../../components';
import { emojis } from '../../lib/emojis';

export const NewTag: FC = () => {
  const nav = useNavigate();

  const index = Math.floor(Math.random() * emojis[0].symbols.length);
  const [emoji, setEmoji] = useState(emojis[0].symbols[index]);
  const [tagName, setTagName] = useState('');

  const onSubmit = () => {
    console.log(emoji, tagName);
  };
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
          {emoji}
        </span>
      </div>

      <Form
        className='flex-1 flex flex-col px-16px pb-16px overflow-auto'
        onSubmit={onSubmit}
      >
        <Input
          type='text'
          align='center'
          labelWidth='0'
          placeholder='请输入标签名'
          onChange={setTagName}
        />

        <div flex-1 flex flex-col overflow-auto gap-8px>
          <Input type='emoji' value={emoji} onChange={setEmoji} />
          <p text-center text-12px color='#909399'>
            点击选择表情，记账页标签列表可长按编辑
          </p>
        </div>

        <button pp-btn-primary mt-24px>
          保存
        </button>
      </Form>
    </div>
  );
};

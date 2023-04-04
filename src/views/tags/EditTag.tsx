import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, TopNav, TopNavGradient } from '../../components';
import { useEditStore } from '../../stores/useEditTagStore';
import { TagEditor } from './components/TagEditor';

interface Props {
  type: 'edit' | 'new';
  title: string;
}

export const EditTag: FC<Props> = ({ type, title }) => {
  const nav = useNavigate();
  const { data } = useEditStore();

  return (
    <div pp-page-wrapper>
      <TopNavGradient disableShadow={true}>
        <TopNav
          title={title}
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
          {data.sign}
        </span>
      </div>

      <TagEditor type={type} />
    </div>
  );
};

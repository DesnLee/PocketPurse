import type { Partial } from '@react-spring/web';
import { useEffect } from 'react';
import type { FC } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useApi } from '../../../api/useApi';
import { Form, Input } from '../../../components';
import { emojis } from '../../../lib/emojis';
import { hasError, validate } from '../../../lib/validate';
import type { Rules } from '../../../lib/validate';
import { useEditTagStore, useToastStore } from '../../../stores';

const rules: Rules<Partial<TagModel>> = [
  {
    key: 'name',
    type: 'required',
    message: '标签名不能为空',
  },
  {
    key: 'name',
    type: 'length',
    max: 6,
    message: '标签名最多 6 个字符',
  },
];

interface Props {
  type: 'new' | 'edit';
}

export const TagEditor: FC<Props> = ({ type }) => {
  const nav = useNavigate();
  const { api } = useApi();
  const { data, errors, setData, setErrors, resetData } = useEditTagStore();
  const [urlSearchParams] = useSearchParams();
  const { id } = useParams();

  // 新建标签
  useEffect(() => {
    if (type === 'new') {
      const kind = urlSearchParams.get('kind');
      if (!kind) {
        throw new Error('kind is required');
      }
      if (kind !== 'expenses' && kind !== 'income') {
        throw new Error('kind must be expenses or income');
      }

      const index = Math.floor(Math.random() * emojis[0].signs.length);
      setData({ sign: emojis[0].signs[index], kind });
    }
  }, [type, urlSearchParams]);

  // 编辑标签
  useEffect(() => {
    if (type === 'edit') {
      api.tag.getTag(Number(id)).then(({ data }) => {
        const { resource } = data;
        setData({
          id: resource.id,
          name: resource.name,
          sign: resource.sign,
          kind: resource.kind,
        });
      });
    }
  }, [type, id]);

  const { openToast } = useToastStore();
  const onSubmit = async () => {
    const newError = validate(data, rules);
    setErrors(newError);
    if (!hasError(newError)) {
      await api.tag.createTag(data);
      openToast({
        text: '保存成功',
        type: 'success',
        duration: 800,
      });
      nav(-1);
      resetData(); // 成功后重置数据
    }
  };

  return (
    <Form
      className='flex-1 flex flex-col px-16px pb-16px overflow-auto'
      onSubmit={onSubmit}
    >
      <Input
        type='text'
        align='center'
        labelWidth='0'
        placeholder='请输入标签名'
        value={data.name}
        onChange={(name) => setData({ name })}
        errors={errors.name}
      />

      <div flex-1 flex flex-col overflow-auto gap-8px>
        <Input
          type='emoji'
          value={data.sign}
          onChange={(sign) => setData({ sign })}
        />
        <p text-center text-12px color='#909399'>
          点击选择表情，记账页标签列表可长按编辑
        </p>
      </div>

      <button pp-btn-primary mt-24px>
        保存
      </button>
      {type === 'edit' && (
        <button pp-btn-info mt-24px>
          删除
        </button>
      )}
    </Form>
  );
};

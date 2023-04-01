import type { FC } from 'react';

export const Tags: FC = () => {
  const tags = Array.from<string>({ length: 30 }).fill('😄');
  return (
    <ol
      grid
      grid-cols='[repeat(auto-fit,56px)]'
      gap-x-28px
      gap-y-20px
      justify-center
      p-16px
      px-10px
    >
      {tags.map((tag, i) => (
        <li w-56px key={tag}>
          <div
            w-56px
            h-56px
            bg='#0000000b'
            rounded-28px
            text-16px
            text-center
            leading-56px
          >
            {tag}
          </div>
          <p text-12px leading-12px mt-6px text-center color='#606266'>
            tag{i}
          </p>
        </li>
      ))}
    </ol>
  );
};

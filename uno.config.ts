import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerAttributifyJsx,
} from 'unocss';

export default defineConfig({
  theme: {},
  shortcuts: {
    'pp-btn': 'w-full h-48px rounded-24px text-16px font-bold b-solid b-1',
    'pp-btn-primary': 'pp-btn bg-primary text-white b-transparent',
    'pp-btn-secondary': 'pp-btn bg-transparent text-primary b-primary',
    'pp-btn-info': 'pp-btn bg-transparent text-#c0c4cc b-#ddd ',
  },
  safelist: [],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
  ],
  rules: [
    [
      'gradient-primary',
      { background: 'linear-gradient(135deg, #ffefba88 0%, #ffffff 100%)' },
    ],
    [
      'gradient-topnav',
      {
        background: 'linear-gradient(180deg, #ffefba 0%, #ffffff 100%)',
      },
    ],
    ['shadow-primary', { 'box-shadow': '0 0 24px 0 #0002' }],
    ['bg-primary', { background: 'var(--color-primary)' }],
    ['b-primary', { border: '1px solid var(--color-primary)' }],
    ['color-primary', { color: 'var(--color-primary)' }],
    ['text-black', { color: 'var(--color-black)' }],
    ['text-primary', { color: 'var(--color-primary)' }],
    [
      'time-range-active',
      {
        'border-bottom': '2px solid var(--color-primary)',
        'color': 'var(--color-primary)',
      },
    ],
  ],
  transformers: [transformerAttributifyJsx()],
});

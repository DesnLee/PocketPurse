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
  shortcuts: {},
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
    ['bg-primary', { background: 'var(--color-primary)' }],
    ['text-black', { color: 'var(--color-black)' }],
    ['text-primary', { color: 'var(--color-primary)' }],
  ],
  transformers: [transformerAttributifyJsx()],
});

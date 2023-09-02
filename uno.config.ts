// Uno.config.ts
import {defineConfig} from 'unocss';
import presetUno from '@unocss/preset-uno';
import presetIcons from '@unocss/preset-icons';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import transformerDirectives from '@unocss/transformer-directives';
import presetWebFonts from '@unocss/preset-web-fonts';

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetWebFonts({
      // Prefer bunny provider, but it seems to be broken with 2 theme overrides (only loads the first)
      provider: 'google',
      fonts: {
        // Mono: ['Inconsolata'],
        sans: [
          {
            name: 'Open Sans',
            weights: ['400', '500'],
          },
        ],
        heading: [
          {
            name: 'Montserrat',
            weights: ['400', '600', '700'],
            // Italic: true,
          },
          {
            name: 'Open Sans',
            weights: ['400', '600', '700'],
          },
          {
            name: 'sans-serif',
            provider: 'none',
          },
        ],
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts: {
    'input-control': 'rounded-md p-2 bg-gray-200 text-black',
    btn: 'bg-pink rounded-lg p-4 font-heading tracking-[2px] font-semibold text-base uppercase hover:bg-dark-pink disabled:bg-gray-600',
    'help-border': 'z-1 border-pink border-3 rounded-lg',
    wizard: 'bg-gray-800 bg-opacity-95',
    body: 'bg-black',
    'wizard-highlight': 'text-pink',
    'wizard-container':
      'absolute hidden p-4 flex-row justify-end items-start pointer-events-none gap-2 text-white case-normal font-normal tracking-normal font-sans text-base',
    'wizard-overlay': 'bg-gray-800',
    highlight: 'text-pink font-bold',
    'shape-container': 'bg-gray-800 rounded-lg bg-opacity-80',
    'info-container':
      'bg-black bg-opacity-70 rounded-lg p-3 pointer-events-auto',
    logo: 'h-10 w-auto',
    'bg-popover': 'text-xl bg-gray-800 bg-opacity-85',
    'popover-container':
      'bg-black rounded-md shadow-gray-300 shadow-xl border-3 border-gray-700 bg-opacity-60',
  },
  theme: {
    colors: {
      pink: '#f08',
      'dark-pink': '#c51774',
    },
  },
  variants: [
    (matcher) => {
      if (!matcher.startsWith('help:')) {
        return matcher;
      }

      return {
        matcher: matcher.slice(5),
        selector: (s) => `div[data-help] ${s}`,
      };
    },
    (matcher) => {
      const matchResult = /^help-(?<helpIndex>\d+):/.exec(matcher);
      if (!matchResult) {
        return matcher;
      }

      return {
        matcher: matcher.slice(matchResult[0].length),
        selector: (s) =>
          `div[data-help="${matchResult.groups!.helpIndex}"] ${s}`,
      };
    },
  ],
});

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
    btn: 'bg-brand-primary text-brand-background p-4 rounded-lg font-heading tracking-[2px] font-semibold text-base uppercase hover:bg-brand-primary disabled:bg-gray-600',
    'help-border': 'z-1 border-brand-primary border-3 rounded-lg',
  },
  theme: {
    colors: {
      violet: '#409',
      magenta: '#a3238e',
      sapphire: '#005baa',
      tangerine: '#ff8200',
      caribbean: '#62b5e5',

      aqua: '#08b3c3',
      blue: '#3e85c7',
      'deep-blue': '#245cac',
      pink: '#f2aece',
      'deep-pink': '#b76cab',
      orange: '#ef9626',
      'deep-orange': '#c68813',
      red: '#f15d40',
      green: '#59bda0',
      'deep-green': '#0ea581',
      purple: '#882784',
      'deep-purple': '#231b4e',
      yellow: '#c1d82f',
      'light-blue': '#4891c6',
      'light-blue-l': '#52b9e9',
      white: '#ffffff',

      brand: {
        primary: '#409',
        // Background: '#330099',
      },
    },
  },
  variants: [
    // (matcher) => {
    //   if (!matcher.startsWith('help:')) {
    //     return matcher;
    //   }

    //   return {
    //     matcher: matcher.slice(5),
    //     selector: (s) => `div[data-help] ${s}`,
    //   };
    // },
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

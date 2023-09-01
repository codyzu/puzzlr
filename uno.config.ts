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
    pink: 'text-[#f08]',
    'input-control': 'rounded-md p-2 bg-gray-200 text-black',
    btn: 'bg-[#f08] p-4 rounded-lg font-heading tracking-[2px] font-semibold text-base uppercase hover:bg-[#c51774] disabled:bg-gray-600',
    'help-border': 'z-1 border-[#f08] border-3 rounded-lg',
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

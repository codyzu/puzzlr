// Uno.config.ts
import {defineConfig} from 'unocss';
import presetUno from '@unocss/preset-uno';
import presetIcons from '@unocss/preset-icons';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import transformerDirectives from '@unocss/transformer-directives';
import presetWebFonts from '@unocss/preset-web-fonts';
import {FileSystemIconLoader} from '@iconify/utils/lib/loader/node-loaders';

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        // eslint-disable-next-line new-cap
        logos: FileSystemIconLoader('./src/assets', (svg) =>
          svg.replace(/#fff/, 'currentColor'),
        ),
      },
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
    body: 'bg-black',
    highlight: 'text-pink font-bold',
    'shape-container': 'bg-gray-800 rounded-lg bg-opacity-80',
    'info-container':
      'bg-black bg-opacity-70 rounded-lg p-3 pointer-events-auto',
    'bg-popover': 'text-xl bg-gray-800 bg-opacity-85',
    'popover-container':
      'bg-black rounded-md shadow-gray-300 shadow-xl border-3 border-gray-700 bg-opacity-60',
    'admin-header': 'text-lg font-semibold mt-4',
    'help-icon': 'w-16 h-16 flex-shrink-1',
    'help-header': 'text-lg font-semibold flex-shrink-3',
    'help-container-common': 'justify-center h-full w-50% gap-3',
    'help-container': 'help-container-common px-2',
    'help-container-left':
      'help-container-common self-start items-end text-right pr-2 pl-3',
    'help-container-right':
      'help-container-common self-end items-start pr-3 pl-2',
    'missing-piece': 'bg-pink text-white',
    opensource: 'bg-pink text-white',
    'help-bg-0': 'bg-black',
    'help-bg-1': 'bg-white',
    'help-bg-2': 'bg-white',
    'help-bg-3': 'bg-white',
  },
  theme: {
    colors: {
      pink: '#f08',
      'dark-pink': '#c51774',
      purplish: '#D92CB6',
      green: '#369A54',
      orange: '#E68C00',
      'dark-orange': '#AB1F0F',
      purple: '#9752BB',
    },
    breakpoints: {
      sm: '480px',
    },
    animation: {
      keyframes: {
        emoji: `{
          from,to {
            transform: translate3d(0,0,0);
          }
          0% {
            bottom: -100px;
            opacity: 1;
          }
          10%,30%,50%,70%,90% {
            transform: translate3d(calc(var(--reaction-bounce-distance) * -1),0,0);
          }
          20%,40%,60%,80% {
            transform: translate3d(var(--reaction-bounce-distance),0,0);
          }
          60% {
            opacity: 1;
          }
          100% {
            bottom: 90vh;
            opacity: 0;
          }
        }`,
      },
      durations: {
        emoji: 'var(--reaction-duration)',
      },
      timingFns: {
        emoji: 'ease-out',
      },
    },
  },
});

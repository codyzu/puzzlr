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
            name: 'Montserrat',
            weights: ['400', '500'],
            italic: true,
          },
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
    btn: 'bg-dark-violet text-white p-4 font-heading tracking-[2px] font-semibold text-base uppercase hover:bg-dark-violet disabled:bg-gray-600',
    'help-border': 'z-1 border-tangerine border-3 rounded-lg',
    wizard:
      'from-sapphire to-violet bg-gradient-to-r bg-opacity-95 bg-gradient-from-opacity-90 bg-gradient-to-opacity-90',
    body: 'bg-magenta from-magenta to-tangerine bg-gradient-to-r',
    highlight: 'text-white font-bold',
    'shape-container': 'bg-dark-violet bg-opacity-80',
    'info-container': 'p-2 pointer-events-auto',
    'bg-popover': 'text-xl bg-deep-purple bg-opacity-85',
    'popover-container':
      'bg-deep-purple rounded-md shadow-tangerine shadow-xl border-3 border-purple bg-opacity-60',
    'admin-header': 'text-lg font-semibold mt-4',
    'help-icon': 'w-16 h-16 flex-shrink-1',
    'help-header': 'text-lg font-semibold flex-shrink-3',
    'help-container-common': 'justify-center h-full w-50% gap-3',
    'help-container': 'help-container-common px-2',
    'help-container-left':
      'help-container-common self-start items-end text-right pr-2 pl-3',
    'help-container-right':
      'help-container-common self-end items-start pr-3 pl-2',
  },
  theme: {
    colors: {
      // Found all of these colors while inspecting the GHC page
      violet: '#409',
      'dark-violet': '#309',
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

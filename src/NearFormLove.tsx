import clsx from 'clsx';
import neaformLogoStacked from './assets/nf-logo-stacked.svg';
import neaformLogoHorizontal from './assets/nf-logo-horizontal.svg';

export default function NearFormLove({vertical}: {vertical?: boolean}) {
  return (
    <div
      className={clsx(
        'items-center self-stretch justify-center text-xs',
        vertical ? 'items-center gap-2' : 'flex-row gap-3',
      )}
    >
      <div className="flex-row justify-center flex-shrink-0 items-center gap-1">
        <div className="">Made with</div>
        <div className="i-tabler-heart-filled w-5 h-5 text-pink animate-pulse" />
        <div>by</div>
      </div>
      <div className={vertical ? 'px-8' : ''}>
        <img
          className={vertical ? 'max-w-60 w-full' : 'h-4'}
          src={vertical ? neaformLogoStacked : neaformLogoHorizontal}
        />
      </div>
    </div>
  );
}

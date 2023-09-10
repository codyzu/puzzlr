import clsx from 'clsx';
import neaformLogo from './assets/nf-logo.svg';

export default function NearFormLove({large}: {large?: boolean}) {
  return (
    <div
      className={clsx(
        'flex-row items-stretch self-stretch font-semibold gap-1 justify-center',
        large ? 'text-base' : 'text-xs',
      )}
    >
      <div className="justify-center flex-shrink-0 items-end">
        <div className="text-center">made with</div>
        <div>
          <div className="i-tabler-heart-filled" />
        </div>
        <div className="flex-row gap-2">
          <div>by</div>
        </div>
      </div>
      <div className="justify-center">
        <img className={large ? 'w-13' : 'w-9'} src={neaformLogo} />
      </div>
    </div>
  );
}

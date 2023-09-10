import neaformLogo from './assets/nf-logo.svg';

export default function NearFormLove() {
  return (
    <div className="flex-row items-stretch self-stretch text-xs font-semibold gap-1 justify-center">
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
        <img className="w-9" src={neaformLogo} />
      </div>
    </div>
  );
}

import logo from './assets/logo.svg';
import neaformLogo from './assets/nf-logo.svg';

export default function Header() {
  return (
    <div className="info-container max-w-full">
      <div className="flex-row gap-2 items-center max-w-full">
        <div className="flex-shrink flex-grow">
          <img
            src={logo}
            className="w-full max-h-[clamp(2.25rem,10vw,3.8rem)] min-w-[60px]"
          />
        </div>
        <div className="font-heading text-size-[clamp(1.125rem,5vw,1.9rem)] line-height-none items-start flex-grow uppercase">
          <div className="font-normal whitespace-nowrap tracking-tighter">
            Grace Hopper
          </div>
          <div className="font-bold tracking-wide">Celebration</div>
        </div>
        <div className="flex-shrink flex-grow">
          <img
            className="w-full max-h-[clamp(2.25rem,10vw,3.8rem)] min-w-[40px] p-[3px]"
            src={neaformLogo}
          />
        </div>
      </div>
    </div>
  );
}

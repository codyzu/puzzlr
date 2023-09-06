import logo from './assets/logo.svg';

export default function Header() {
  return (
    <div className="info-container max-w-full">
      <div className="flex-row gap-2 items-center max-w-full">
        <div className="flex-shrink flex-grow">
          <img
            src={logo}
            className="w-full max-h-[clamp(3rem,12vw,3.8rem)] min-w-[60px]"
          />
        </div>
        <div className="font-heading text-size-[clamp(1.5rem,6vw,1.9rem)] line-height-none items-start flex-grow uppercase">
          <div className="font-normal whitespace-nowrap tracking-tighter">
            Grace Hopper
          </div>
          <div className="font-bold tracking-wide">Celebration</div>
        </div>
      </div>
    </div>
  );
}

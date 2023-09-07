import logo from './assets/logo.svg';

export default function Header() {
  return (
    <div className="info-container max-w-full items-center">
      <div className="flex-row gap-2 items-center max-w-full justify-center">
        <div className="flex-grow-1 flex-row justify-end">
          <img
            src={logo}
            className="h-[clamp(2rem,10vw,3.8rem)] min-w-[6rem]"
          />
        </div>
        <div className="font-heading text-size-[clamp(1rem,5vw,1.9rem)] line-height-[0.95] items-start uppercase align-text-bottom self-stretch justify-end">
          <div className="font-normal whitespace-nowrap tracking-tighter">
            Grace Hopper
          </div>
          <div className="font-bold tracking-wide">Celebration</div>
        </div>
      </div>
    </div>
  );
}

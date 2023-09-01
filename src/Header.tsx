import logo from './assets/logo.svg';

export default function Header() {
  return (
    <div className="info-container self-center">
      <div className="flex-row gap-2 items-center">
        <img src={logo} className="logo" />
        <div className="font-heading text-3xl items-start">
          <div className="font-normal">Grace Hopper</div>
          <div className="font-semibold">Celebration</div>
        </div>
      </div>
    </div>
  );
}

import logo from './assets/nc-logo.svg';

export default function Header() {
  return (
    <div className="info-container self-center">
      <div className="flex-row gap-2 items-center">
        <img src={logo} className="h-10 w-auto" />
        <div className="font-heading text-3xl items-start font-bold">
          NodeConf EU 2023
        </div>
      </div>
      <div className="font-heading font-semibold">
        at the Lyrath Estate, Kilkenny, Ireland
      </div>
    </div>
  );
}

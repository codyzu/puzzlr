import Cube from './Cube';
import logo from './logo.svg';

function App() {
  return (
    <div className="gap-4 p-2 w-full">
      <div className="flex flex-row gap-2">
        <img src={logo} className="h-10 w-10" />
        <div className="font-heading text-3xl font-700">NodeConf EU 2023</div>
      </div>
      <div className="font-heading font-600">
        at the Lyrath Estate, Kilkenny, Ireland
      </div>
      <div className="w-full h-400px ">
        <Cube />
      </div>
      <div className="prose">Find the pieces to complete the cube</div>
    </div>
  );
}

export default App;

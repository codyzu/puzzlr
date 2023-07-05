import Cube from './Cube';
import logo from './logo.svg';

function App() {
  return (
    <div className="gap-4 p-2">
      <div className="flex flex-row gap-2">
        <img src={logo} className="h-10 w-10" />
        <div className="font-heading text-3xl font-700">NodeConf EU 2023</div>
      </div>
      <div className="font-heading font-600">
        at the Lyrath Estate, Kilkenny, Ireland
      </div>
      <div className="w-400px h-400px rounded-xl overflow-hidden border-2 border-white shadow-gray-600 shadow-lg">
        <Cube />
      </div>
      <div className="prose">Find the pieces to complete the cube</div>
    </div>
  );
}

export default App;

import AllPiecesCanvas from './AllPiecesCanvas';
import logo from './assets/logo.png';
import Cube from './Cube';
import {db} from './db';
import SinglePieceRendered from './SinglePieceRendered';

function App() {
  return (
    <div className="gap-4 p-2 w-full">
      <AllPiecesCanvas />
      <div className="flex flex-row gap-2">
        <img src={logo} className="h-10 w-auto" />
        <div className="font-heading text-3xl font-700">NodeConf EU 2023</div>
      </div>
      <div className="font-heading font-600">
        at the Lyrath Estate, Kilkenny, Ireland
      </div>
      <div className="w-400px h-400px ">
        <Cube />
      </div>
      <div className="prose">Find the pieces to complete the cube</div>
      <div className="flex flex-row flex-wrap justify-center max-w-screen-md">
        <SinglePieceRendered piece="blue" />
        <SinglePieceRendered piece="pink" />
        <SinglePieceRendered piece="green" />
        <SinglePieceRendered piece="orange" />
        <SinglePieceRendered piece="purple" />
      </div>
      <button
        type="button"
        className="btn"
        onClick={() => {
          void db.transaction('rw', [db.pieces], async () => db.pieces.clear());
        }}
      >
        clear
      </button>
    </div>
  );
}

export default App;

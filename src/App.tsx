import Cube from './Cube';
import SinglePieceRendered from './SinglePieceRendered';

function App() {
  const pieceClasses =
    'w-100px h-100px border-2 border-gray-300 rounded overflow-hidden shadow-md shadow-gray-600';
  return (
    <div className="gap-4 p-2 w-full">
      <div className="flex flex-row gap-2">
        <img src='/logo-p-500.png' className="h-10 w-10" />
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
        <div className={pieceClasses}>
          <SinglePieceRendered piece="blue" />
        </div>
        <div className={pieceClasses}>
          <SinglePieceRendered piece="pink" />
        </div>
        <div className={pieceClasses}>
          <SinglePieceRendered piece="green" />
        </div>
        <div className={pieceClasses}>
          <SinglePieceRendered piece="orange" />
        </div>
        <div className={pieceClasses}>
          <SinglePieceRendered piece="purple" />
        </div>
      </div>
    </div>
  );
}

export default App;

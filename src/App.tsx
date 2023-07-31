import {useRef, lazy, useEffect, Suspense} from 'react';
import {useSearchParams} from 'react-router-dom';
import logo from './assets/logo.png';
import {db} from './db';
import {isPieceColor, type PieceColor} from './piece-types';
import SingleShape from './SingleShapeDom';
import usePieceRefs from './use-piece-refs';

const Canvas3D = lazy(async () => import('./Canvas3D'));
const Shapes3D = lazy(async () => import('./Shapes3D'));
const Cube3D = lazy(async () => import('./Cube3D'));

function App() {
  const [search, setSearch] = useSearchParams();
  useEffect(() => {
    let cancel = false;

    let timeoutHandle: number | undefined = setTimeout(() => {
      timeoutHandle = undefined;
      if (cancel) {
        console.log('skip');
        return;
      }

      if (search.has('add')) {
        console.log('adding', search.get('add'));
        const nextSearch = new URLSearchParams([...search.entries()]);
        nextSearch.delete('add');
        setSearch(nextSearch);

        if (isPieceColor(search.get('add'))) {
          void db.pieces.add({
            color: search.get('add') as PieceColor,
            added: new Date(),
          });
        }
      }
    }, 0);

    return () => {
      cancel = true;
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
      }
    };
  }, [search, setSearch]);

  const cubeRef = useRef<HTMLDivElement>(null!);
  const pieceRefs = usePieceRefs();

  return (
    <div className="relative w-full">
      <div className="gap-4 p-2 w-full max-w-screen-sm">
        <div className="flex flex-row gap-2">
          <img src={logo} className="h-10 w-auto" />
          <div className="font-heading text-3xl font-700">NodeConf EU 2023</div>
        </div>
        <div className="font-heading font-600">
          at the Lyrath Estate, Kilkenny, Ireland
        </div>
        <div className="flex flex-row w-full items-stretch">
          <div className="gap-2">
            {Object.entries(pieceRefs).map(([color, ref]) => (
              <SingleShape key={color} ref={ref} color={color as PieceColor} />
            ))}
          </div>
          <div ref={cubeRef} className="flex-grow-1" />
        </div>
        <div className="prose">Find the pieces to complete the cube</div>
        <button
          type="button"
          className="btn"
          onClick={() => {
            void db.transaction('rw', [db.pieces], async () =>
              db.pieces.clear(),
            );
          }}
        >
          clear
        </button>
      </div>
      <Suspense>
        <Canvas3D>
          <Shapes3D pieceRefs={pieceRefs} />
          <Cube3D cubeRef={cubeRef} />
        </Canvas3D>
      </Suspense>
    </div>
  );
}

export default App;

import {Canvas} from '@react-three/fiber';
import {useLiveQuery} from 'dexie-react-hooks';
import {pieces} from './Piece';
import {type PieceColor} from './piece-types';
import {db} from './db';

export default function SinglePieceRendered({piece}: {piece: PieceColor}) {
  const Piece = pieces[piece];
  const existingPieces = useLiveQuery(
    async () => db.pieces.where('color').equals(piece).toArray(),
    [piece],
  );
  return (
    <div className="flex">
      <div
        className="w-100px h-100px border-2 border-gray-300 rounded overflow-hidden shadow-md shadow-gray-600 select-none"
        onClick={() => {
          void db.pieces.add({color: piece, added: new Date()});
        }}
      >
        <Canvas>
          {/* eslint-disable-next-line react/no-unknown-property */}
          <ambientLight intensity={0.5} />
          {/* eslint-disable-next-line react/no-unknown-property */}
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          {/* eslint-disable-next-line react/no-unknown-property */}
          <pointLight position={[-10, -10, -10]} />
          {/* <OrthographicCamera> */}
          <Piece position={[0, 0, 0]} />
          {/* </OrthographicCamera> */}
          {/* <OrbitControls /> */}
        </Canvas>
      </div>
      count: {existingPieces?.length ?? 0}
    </div>
  );
}

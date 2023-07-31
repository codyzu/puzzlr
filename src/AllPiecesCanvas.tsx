import {Canvas} from '@react-three/fiber';
import {OrthographicCamera} from '@react-three/drei';
import AllPieces from './AllPieces';

export default function AllPiecesCanvas() {
  // Const existingPieces = useLiveQuery(
  //   async () => db.pieces.where('color').equals(piece).toArray(),
  //   [piece],
  // );

  return (
    <div className="flex">
      <div
        className="w-400px h-500px border-2 border-gray-300 rounded overflow-hidden shadow-md shadow-gray-600 select-none"
        // OnClick={() => {
        //   void db.pieces.add({color: piece, added: new Date()});
        // }}
      >
        <Canvas>
          {/* eslint-disable-next-line react/no-unknown-property */}
          <ambientLight intensity={0.5} />
          {/* eslint-disable-next-line react/no-unknown-property */}
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          {/* eslint-disable-next-line react/no-unknown-property */}
          <pointLight position={[-10, -10, -10]} />
          {/* <OrthographicCamera makeDefault> */}
          {/* <OrthographicCamera> */}
          <AllPieces />
          {/* <Piece offset={2} /> */}
          {/* </OrthographicCamera> */}
          {/* <OrbitControls /> */}
          {/* </OrthographicCamera> */}
        </Canvas>
      </div>
      {/* count: {existingPieces?.length ?? 0} */}
    </div>
  );
}

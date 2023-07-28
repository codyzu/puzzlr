import {Canvas} from '@react-three/fiber';
import {type PieceColor, pieces} from './Piece';

export default function SinglePieceRendered({piece}: {piece: PieceColor}) {
  const Piece = pieces[piece];
  return (
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
  );
}

import clsx from 'clsx';
import {Canvas, type Euler} from '@react-three/fiber';
import {rotatingPieces} from './RotatingPieces';
import {type PieceColor} from './piece-types';

export default function FixedPiece3D({
  color,
  setTakeSnapshot,
  rotation,
}: {
  rotation?: Euler;
  color: PieceColor;
  setTakeSnapshot: React.Dispatch<React.SetStateAction<() => string>>;
}) {
  const Piece = rotatingPieces[color];

  return (
    <Canvas
      // EventSource={mainRef}
      eventSource={document.querySelector<HTMLElement>('#root')!}
      // https://github.com/pmndrs/react-three-fiber/issues/251#issuecomment-558573141
      // Scrolling and mouse events seem to work best with fixed positioning
      className={clsx('w-full h-full')}
    >
      {/* eslint-disable-next-line react/no-unknown-property */}
      <ambientLight intensity={0.5} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <pointLight position={[-10, -10, -10]} />
      <Piece rotation={rotation} setTakeSnapshot={setTakeSnapshot} />
      {/* <OrbitControls /> */}
    </Canvas>
  );
}

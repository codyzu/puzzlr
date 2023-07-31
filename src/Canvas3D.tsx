import {Canvas} from '@react-three/fiber';
import {type MutableRefObject} from 'react';
import {PerspectiveCamera, View} from '@react-three/drei';
import {type PieceColor} from './piece-types';
import {pieces} from './Piece';
import Shapes from './Shapes';

export default function Canvas3D({
  pieceRefs,
  cubeRef,
}: {
  pieceRefs: {[key in PieceColor]: MutableRefObject<HTMLDivElement>};
  cubeRef: MutableRefObject<HTMLDivElement>;
}) {
  return (
    <Canvas
      // EventSource={mainRef}
      eventSource={document.querySelector<HTMLElement>('#root')!}
      className="important-absolute top-0 left-0 w-screen h-full"
    >
      {Object.entries(pieceRefs).map(([color, ref]) => {
        const Piece = pieces[color as PieceColor];
        return (
          <View key={color} track={ref}>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <ambientLight intensity={0.5} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <pointLight position={[-10, -10, -10]} />
            {/* <OrbitControls /> */}
            <Piece x={0} y={0} z={0} />
          </View>
        );
      })}

      <View track={cubeRef}>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <ambientLight intensity={0.5} />
        {/* eslint-disable-next-line react/no-unknown-property */}
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        {/* eslint-disable-next-line react/no-unknown-property */}
        <pointLight position={[-10, -10, -10]} />
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        {/* <OrbitControls /> */}
        <Shapes position={[0, 0, 0]} />
      </View>
    </Canvas>
  );
}

import {type MutableRefObject} from 'react';
import {View} from '@react-three/drei';
import {type PieceColor} from './piece-types';
import {rotatingPieces} from './RotatingPieces';

export default function RotatingPieces3D({
  pieceRefs,
}: {
  pieceRefs: {
    [key in PieceColor]: MutableRefObject<HTMLDivElement>;
  };
}) {
  return (
    <>
      {Object.entries(pieceRefs).map(([color, ref]) => {
        const Piece = rotatingPieces[color as PieceColor];
        return (
          <View key={color} track={ref}>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <ambientLight intensity={0.5} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <pointLight position={[-10, -10, -10]} />
            {/* <OrbitControls /> */}
            <Piece />
          </View>
        );
      })}
    </>
  );
}

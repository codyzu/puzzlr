import {type Euler, type Vector3} from '@react-three/fiber';
import {type ForwardedRef, forwardRef} from 'react';
import {type Group} from 'three';
import {type PieceColor, type Piece2D} from './piece-types';

export const pieceMaps: {[key in PieceColor]: Piece2D} = {
  purple: [
    [0, 0, 0],
    [0, 0, 0],
    [1, 0, 0],
  ],
  green: [
    [0, 0, 0],
    [1, 0, 0],
    [1, 1, 0],
  ],
  pink: [
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
  ],
  orange: [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  blue: [
    [0, 0, 0],
    [0, 0, 0],
    [1, 1, 0],
  ],
};

export const pieceColorValues: {[key in PieceColor]: string} = {
  purple: '#4BC17D',
  green: '#C1D32E',
  pink: '#A3238E',
  orange: '#FF8200',
  blue: '#2284C6',
};

export type ColoredPieceProps = {
  // eslint-disable-next-line react/require-default-props
  position?: Vector3;
  // eslint-disable-next-line react/require-default-props
  scale?: Vector3;
  // eslint-disable-next-line react/require-default-props
  rotation?: Euler;
};

export type GenericPieceProps = ColoredPieceProps & {
  color: PieceColor;
};

export const GenericPiece = forwardRef<Group, GenericPieceProps>(function (
  {color, position, scale, rotation},
  ref,
) {
  const piece: Piece2D = pieceMaps[color];
  const colorValue = pieceColorValues[color];
  const props: ColoredPieceProps & {ref?: ForwardedRef<Group>} = {};
  if (ref) {
    props.ref = ref;
  }

  if (position !== undefined) {
    props.position = position;
  }

  if (scale !== undefined) {
    props.scale = scale;
  }

  if (rotation !== undefined) {
    props.rotation = rotation;
  }

  return (
    <group {...props}>
      {piece.map((dim1, dim1Index) =>
        dim1.map((point, pointIndex) => {
          if (point === 0) {
            return null;
          }

          return (
            <mesh
              // eslint-disable-next-line react/no-array-index-key
              key={`cube-${dim1Index}-${pointIndex}`}
              // eslint-disable-next-line react/no-unknown-property
              position={[dim1.length - pointIndex, piece.length - dim1Index, 0]}
              scale={0.92}
            >
              {/* eslint-disable-next-line react/no-unknown-property */}
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={colorValue} />
            </mesh>
          );
        }),
      )}
    </group>
  );
});

// Export GenericPiece;

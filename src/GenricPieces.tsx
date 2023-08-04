import {type Color, type Vector3} from '@react-three/fiber';
import {
  type ForwardedRef,
  forwardRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from 'react';
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
  purple: '#9752BB',
  green: '#A0C539',
  pink: '#DE52C4',
  orange: '#E68C00',
  blue: '#00ACA7',
};

export type ColoredPieceProps = {
  // eslint-disable-next-line react/require-default-props
  position?: Vector3;
  // eslint-disable-next-line react/require-default-props
  scale?: Vector3;
};

export type GenericPieceProps = ColoredPieceProps & {
  piece: Piece2D;
  color: Color;
};

type ColoredPiece = ForwardRefExoticComponent<
  ColoredPieceProps & RefAttributes<Group>
>;

export const pieces: Record<PieceColor, ColoredPiece> = {
  purple: forwardRef<Group, ColoredPieceProps>((props, ref) => (
    <GenericPiece
      ref={ref}
      piece={pieceMaps.purple}
      color={pieceColorValues.purple}
      {...props}
    />
  )),
  green: forwardRef<Group, ColoredPieceProps>((props, ref) => (
    <GenericPiece
      ref={ref}
      piece={pieceMaps.green}
      color={pieceColorValues.green}
      {...props}
    />
  )),
  pink: forwardRef<Group, ColoredPieceProps>((props, ref) => (
    <GenericPiece
      ref={ref}
      piece={pieceMaps.pink}
      color={pieceColorValues.pink}
      {...props}
    />
  )),
  orange: forwardRef<Group, ColoredPieceProps>((props, ref) => (
    <GenericPiece
      ref={ref}
      piece={pieceMaps.orange}
      color={pieceColorValues.orange}
      {...props}
    />
  )),
  blue: forwardRef<Group, ColoredPieceProps>((props, ref) => (
    <GenericPiece
      ref={ref}
      piece={pieceMaps.blue}
      color={pieceColorValues.blue}
      {...props}
    />
  )),
};

const GenericPiece = forwardRef<Group, GenericPieceProps>(function (
  {piece, color, position, scale},
  ref,
) {
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
              <meshStandardMaterial color={color} />
            </mesh>
          );
        }),
      )}
    </group>
  );
});

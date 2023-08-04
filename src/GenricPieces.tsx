import {type Euler, type Color, type Vector3} from '@react-three/fiber';
import {
  type ForwardedRef,
  forwardRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
  useRef,
  useEffect,
} from 'react';
import {Box3, MathUtils, type Group, Vector3 as V3} from 'three';
import {type PieceColor, type Piece2D, allPieceColors} from './piece-types';

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
      color="#9752BB"
      {...props}
    />
  )),
  green: forwardRef<Group, ColoredPieceProps>((props, ref) => (
    <GenericPiece
      ref={ref}
      piece={pieceMaps.green}
      color="#A0C539"
      {...props}
    />
  )),
  pink: forwardRef<Group, ColoredPieceProps>((props, ref) => (
    <GenericPiece ref={ref} piece={pieceMaps.pink} color="#DE52C4" {...props} />
  )),
  orange: forwardRef<Group, ColoredPieceProps>((props, ref) => (
    <GenericPiece
      ref={ref}
      piece={pieceMaps.orange}
      color="#E68C00"
      {...props}
    />
  )),
  blue: forwardRef<Group, ColoredPieceProps>((props, ref) => (
    <GenericPiece ref={ref} piece={pieceMaps.blue} color="#00ACA7" {...props} />
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

export function RotatedPiece({
  color,
  rotation,
  position,
  scale,
}: ColoredPieceProps & {
  color: PieceColor;
  rotation?: number;
}) {
  const ref = useRef<Group>(null!);
  const GenericPiece = pieces[color];

  useEffect(() => {
    if (!rotation) {
      return;
    }

    console.log('rotation', rotation);
    const originalPosition = ref.current.position.clone();
    console.log('original', originalPosition);

    // Const pieceBox = new Box3(new V3(0, 0, 0), new V3(3, 3, 0));

    ref.current.translateX(-1.5);
    ref.current.translateY(-1.5);

    console.log('moved', ref.current.position);
    // Const bbox = new Box3().setFromObject(ref.current);
    // bbox.getCenter(ref.current.position);
    // ref.current.position.multiplyScalar(-1);
    // console.log('centered', ref.current.position);
    ref.current.rotation.z = MathUtils.degToRad(rotation);
    // Ref.current.translateX(1.5);
    // ref.current.translateY(1.5);
    ref.current.position.copy(originalPosition);
    console.log('final', ref.current.position, ref.current.rotation);
  }, [rotation]);

  return <GenericPiece ref={ref} scale={scale} position={position} />;
}

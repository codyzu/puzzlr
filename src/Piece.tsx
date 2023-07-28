import {useFrame, type Color, type Vector3} from '@react-three/fiber';
import {useRef, useEffect} from 'react';
import {type Group, Box3} from 'three';
import {type PieceColor, type Piece2D} from './piece-types';

const PurplePieceMap: Piece2D = [
  [0, 0, 0],
  [0, 0, 0],
  [1, 0, 0],
];

const GreenPieceMap: Piece2D = [
  [0, 0, 0],
  [1, 0, 0],
  [1, 1, 0],
];

const PinkPieceMap: Piece2D = [
  [1, 0, 0],
  [1, 0, 0],
  [1, 1, 1],
];

const OrangePieceMap: Piece2D = [
  [0, 1, 0],
  [0, 1, 0],
  [1, 1, 1],
];

const BluePieceMap: Piece2D = [
  [0, 0, 0],
  [0, 0, 0],
  [1, 1, 0],
];

type ColoredPieceProps = {position: Vector3};
type ColoredPiece = (props: ColoredPieceProps) => JSX.Element;

export const pieces: Record<PieceColor, ColoredPiece> = {
  purple: (props: ColoredPieceProps) => (
    <Piece piece={PurplePieceMap} color="#9752BB" {...props} />
  ),
  green: (props: ColoredPieceProps) => (
    <Piece piece={GreenPieceMap} color="#A0C539" {...props} />
  ),
  pink: (props: ColoredPieceProps) => (
    <Piece piece={PinkPieceMap} color="#DE52C4" {...props} />
  ),
  orange: (props: ColoredPieceProps) => (
    <Piece piece={OrangePieceMap} color="#E68C00" {...props} />
  ),
  blue: (props: ColoredPieceProps) => (
    <Piece piece={BluePieceMap} color="#00ACA7" {...props} />
  ),
};

function Piece({
  piece,
  // Position,
  color,
}: {
  piece: Piece2D;
  // Position: Vector3;
  color: Color;
}) {
  const innerGroupRef = useRef<Group>(null!);
  const pivotGroupRef = useRef<Group>(null!);

  // Const [groupPosition, setGroupPosition] = useState<Vector3>([0, 0, 0]);

  useEffect(() => {
    const bbox = new Box3().setFromObject(innerGroupRef.current);
    bbox.getCenter(innerGroupRef.current.position);
    innerGroupRef.current.position.multiplyScalar(-1);
  }, []);

  useFrame((_state, delta) => {
    // Ref.current.rotation.x += 0.1;
    pivotGroupRef.current.rotation.x += delta;
    pivotGroupRef.current.rotation.y += delta;
  });

  return (
    <group ref={pivotGroupRef} scale={1.5}>
      {/* deslint-disable-next-line react/no-unknown-property */}
      {/* <group ref={innerGroupRef} position={groupPosition}> */}
      <group ref={innerGroupRef}>
        {piece.map((dim1, dim1Index) =>
          dim1.map((point, pointIndex) => {
            if (point === 0) {
              return null;
            }

            return (
              <mesh
                // eslint-disable-next-line react/no-array-index-key
                key={`cube-${dim1Index}-${pointIndex}`}
                // Ref={ref}
                // eslint-disable-next-line react/no-unknown-property
                position={[pointIndex, 3 - dim1Index, 0]}
              >
                {/* eslint-disable-next-line react/no-unknown-property */}
                <boxGeometry args={[1, 1, 1]} />
                {/* <meshNormalMaterial /> */}
                <meshStandardMaterial color={color} />
              </mesh>
            );
          }),
        )}
      </group>
    </group>
  );
}

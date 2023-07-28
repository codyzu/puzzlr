import {useFrame, type Color, type Vector3} from '@react-three/fiber';
import {type ReactNode, useRef, useEffect, useState} from 'react';
import {type Mesh, type Group, Box3, Vector3 as V3} from 'three';

export type Point = 0 | 1;
export type Piece1D = [Point, Point, Point];
export type Piece2D = [Piece1D, Piece1D, Piece1D];

const allPieceColors = ['purple', 'green', 'pink', 'orange', 'blue'] as const;
type PieceColorTuple = typeof allPieceColors;
export type PieceColor = PieceColorTuple[number];

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
    <Piece piece={PurplePieceMap} color="purple" {...props} />
  ),
  green: (props: ColoredPieceProps) => (
    <Piece piece={GreenPieceMap} color="green" {...props} />
  ),
  pink: (props: ColoredPieceProps) => (
    <Piece piece={PinkPieceMap} color="pink" {...props} />
  ),
  orange: (props: ColoredPieceProps) => (
    <Piece piece={OrangePieceMap} color="orange" {...props} />
  ),
  blue: (props: ColoredPieceProps) => (
    <Piece piece={BluePieceMap} color="blue" {...props} />
  ),
};

function Piece({
  piece,
  position,
  color,
}: {
  piece: Piece2D;
  position: Vector3;
  color: Color;
}) {
  const innerGroupRef = useRef<Group>(null!);
  const pivotGroupRef = useRef<Group>(null!);
  console.log('piece ref', innerGroupRef.current);

  const [groupPosition, setGroupPosition] = useState<Vector3>([0, 0, 0]);

  useEffect(() => {
    console.log('group', innerGroupRef.current);
    // Const bbox = new Box3().setFromObject(ref.current);
    // const size = new V3();
    // bbox.getSize(size);
    // console.log('size', size);
    // setGroupPosition([
    //   -(bbox.min.x + bbox.max.x) / 2,
    //   -(bbox.min.y + bbox.max.y) / 2,
    //   -(bbox.min.z + bbox.max.z) / 2,
    // ]);
    const bbox = new Box3().setFromObject(innerGroupRef.current);
    bbox.getCenter(innerGroupRef.current.position);
    innerGroupRef.current.position.multiplyScalar(-1);
  }, []);

  useFrame((_state, delta) => {
    // Ref.current.rotation.x += 0.1;
    pivotGroupRef.current.rotation.x += delta;
    pivotGroupRef.current.rotation.y += delta;
    // PivotGroupRef.current.rotation.z += delta;
    // Ref.current.rotation.z += delta;
    // Ref.current.rotation.x += delta;
    // ref.current.rotation.y += delta;
    // ref.current.rotation.z += delta;
    // Const bbox = new Box3().setFromObject(ref.current);
    // const size = new V3();
    // bbox.getSize(size);
    // ref.current.position.x = -(bbox.min.x + bbox.max.x) / 2;
    // ref.current.position.y = -(bbox.min.y + bbox.max.y) / 2;
    // ref.current.position.z = -(bbox.min.z + bbox.max.z) / 2;
  });

  return (
    <group ref={pivotGroupRef} scale={1.5}>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <group ref={innerGroupRef} position={groupPosition}>
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

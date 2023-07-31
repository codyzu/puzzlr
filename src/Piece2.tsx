import {useFrame, type Color, useThree} from '@react-three/fiber';
import {useRef, useEffect, useState} from 'react';
import {type Group, Box3, Vector3 as V3} from 'three';
import {useAspect} from '@react-three/drei';
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

type ColoredPieceProps = {x: number; y: number; z: number};
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
  // Offset,
  x,
  y,
  z,
  color,
}: {
  piece: Piece2D;
  // Offset: number;
  x: number;
  y: number;
  z: number;
  color: Color;
}) {
  const innerGroupRef = useRef<Group>(null!);
  const [moveDistance, setMoveDistance] = useState<number>();
  const [moveDirection, setMoveDirection] = useState<V3>();
  const [moveBackDirection, setMoveBackDirection] = useState<V3>();
  const {viewport, camera} = useThree();
  // Console.log('viewport', viewport);

  // https://stackoverflow.com/a/28860849
  // https://stackoverflow.com/a/54611417
  useEffect(() => {
    const center = new V3(x, y, z);
    const bbox = new Box3().setFromObject(innerGroupRef.current);
    bbox.getCenter(innerGroupRef.current.position);
    innerGroupRef.current.position.multiplyScalar(-1);
    innerGroupRef.current.position.add(center);

    const directionToCenter = new V3().subVectors(
      center,
      innerGroupRef.current.position,
    );
    directionToCenter.normalize();
    const distanceToCenter = innerGroupRef.current.position.distanceTo(center);
    const directionFromCenter = directionToCenter.clone().multiplyScalar(-1);

    setMoveDistance(distanceToCenter);
    setMoveDirection(directionToCenter);
    setMoveBackDirection(directionFromCenter);

    console.log({
      moveDir: directionToCenter,
      moveDist: distanceToCenter,
      moveBack: directionFromCenter,
    });
  }, [x, y, z]);

  useFrame((_state, delta) => {
    // Wait until the effect has executed
    if (!moveDirection || !moveDistance || !moveBackDirection) {
      return;
    }

    // https://stackoverflow.com/a/63597379
    // https://stackoverflow.com/a/72647926
    innerGroupRef.current.translateOnAxis(moveDirection, moveDistance);
    innerGroupRef.current.rotation.x += delta;
    innerGroupRef.current.rotation.y += delta;
    innerGroupRef.current.rotation.z += delta;
    innerGroupRef.current.translateOnAxis(moveBackDirection, moveDistance);
  });

  // Const scale = useAspect(10_000, 10_000, 1);
  // console.log('scale', scale);

  // const scale = [1, 1, -100];

  return (
    <group ref={innerGroupRef} scale={1.2}>
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
              position={[pointIndex, 3 - dim1Index, 0]}
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
}

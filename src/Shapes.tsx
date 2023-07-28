import {useFrame, type Vector3} from '@react-three/fiber';
import {useEffect, useRef} from 'react';
import {type Group, Box3} from 'three';
import Shape from './Shape';

export type Point = 0 | 1;
export type Line = [Point, Point, Point];
export type Plain = [Line, Line, Line];
export type Shape3d = [Plain, Plain, Plain];

const orange: Shape3d = [
  [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
  [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
];

const blue: Shape3d = [
  [
    [0, 0, 0],
    [0, 0, 0],
    [1, 1, 1],
  ],
  [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 1],
  ],
  [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 1],
  ],
];

const green: Shape3d = [
  [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  [
    [1, 1, 0],
    [1, 0, 0],
    [0, 0, 0],
  ],
  [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
];

export default function Shapes({position}: {position: Vector3}) {
  const shapeRef = useRef<Group>(null!);
  const pivotRef = useRef<Group>(null!);

  useEffect(() => {
    // Center the group shape based on it's bounding box
    // https://stackoverflow.com/a/28860849
    const bbox = new Box3().setFromObject(shapeRef.current);
    bbox.getCenter(shapeRef.current.position);
    shapeRef.current.position.multiplyScalar(-1);
  }, []);

  useFrame((_state, delta) => {
    // Rotate around the pivot ref
    // https://stackoverflow.com/a/28860849
    pivotRef.current.rotation.x += delta;
    pivotRef.current.rotation.y += delta;
  });

  return (
    // <group position={position} rotation={[90, 0, 180]}>
    <group ref={pivotRef}>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <group ref={shapeRef} position={position}>
        <Shape coordinates={orange} position={[0, 0, 0]} color="orange" />
        <Shape coordinates={blue} position={[0, 0, 0]} color="blue" />
        <Shape coordinates={green} position={[0, 0, 0]} color="green" />
        <Shape coordinates={green} position={[1, 1, 1]} color="green" />
        <Shape coordinates={blue} position={[1, 1, 1]} color="blue" />
      </group>
    </group>
  );
}

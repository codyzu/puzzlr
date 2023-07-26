import {
  /* Canvas, */ /* useFrame, */ type Color,
  type Vector3,
} from '@react-three/fiber';
import {useRef} from 'react';
import {Vector3 as V3, type Mesh /* , Group */} from 'three';
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
  const ref = useRef<Mesh>(null!);

  return (
    // <group position={position} rotation={[90, 0, 180]}>
    // eslint-disable-next-line react/no-unknown-property
    <group position={position}>
      <Shape coordinates={orange} position={[0, 0, 0]} color="orange" />
      <Shape coordinates={blue} position={[0, 0, 0]} color="blue" />
      <Shape coordinates={green} position={[0, 0, 0]} color="green" />
      <Shape coordinates={green} position={[1, 1, 1]} color="green" />
      <Shape coordinates={blue} position={[1, 1, 1]} color="blue" />
    </group>
  );
}

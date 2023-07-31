import {useFrame, useThree, type Vector3} from '@react-three/fiber';
import {useEffect, useRef, useState} from 'react';
import {type Group, Box3, Sphere, Vector3 as V3} from 'three';
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

  const {viewport} = useThree();

  const [radius, setRadius] = useState<number>();
  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    // Center the group shape based on it's bounding box
    // https://stackoverflow.com/a/28860849
    const bbox = new Box3().setFromObject(shapeRef.current);
    bbox.getCenter(shapeRef.current.position);
    shapeRef.current.position.multiplyScalar(-1);

    // Calculate the distance between the diagonals of the cube
    const sphere = new Sphere();
    bbox.getBoundingSphere(sphere);
    console.log('radius', sphere.radius);

    setRadius(sphere.radius);
  }, []);

  useEffect(() => {
    if (radius === undefined) {
      return;
    }

    const smallestAxis = Math.min(viewport.height, viewport.width);
    const scaleFactor = smallestAxis / (radius * 2);

    // 90% to be sure the object fits in the view
    setScale(scaleFactor * 0.9);
  }, [viewport.width, viewport.height, radius]);

  useFrame((_state, delta) => {
    // Rotate around the pivot ref
    // https://stackoverflow.com/a/28860849
    pivotRef.current.rotation.x += delta;
    pivotRef.current.rotation.y += delta;
  });

  return (
    // <group position={position} rotation={[90, 0, 180]}>
    <group scale={scale}>
      <group ref={pivotRef} scale={1}>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <group ref={shapeRef} position={position} scale={1}>
          <Shape coordinates={orange} position={[0, 0, 0]} color="orange" />
          <Shape coordinates={blue} position={[0, 0, 0]} color="blue" />
          <Shape coordinates={green} position={[0, 0, 0]} color="green" />
          <Shape coordinates={green} position={[1, 1, 1]} color="green" />
          <Shape coordinates={blue} position={[1, 1, 1]} color="blue" />
        </group>
      </group>
    </group>
  );
}

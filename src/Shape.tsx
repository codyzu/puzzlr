import {
  /* Canvas, */ /* useFrame, */ type Color,
  type Vector3,
} from '@react-three/fiber';
import {useRef} from 'react';
import {Vector3 as V3, type Mesh /* , Group */} from 'three';

export type Point = 0 | 1;
export type Line = [Point, Point, Point];
export type Plain = [Line, Line, Line];
export type Shape3d = [Plain, Plain, Plain];

export default function Shape({
  coordinates,
  position,
  color,
}: {
  coordinates: Shape3d;
  position: Vector3;
  color: Color;
}) {
  const ref = useRef<Mesh>(null!);

  return (
    // <group position={position} rotation={[90, 0, 180]}>
    // eslint-disable-next-line react/no-unknown-property
    <group position={position}>
      {/* hdfd */}
      {coordinates.map((plain, plainIndex) =>
        plain.map((line, lineIndex) =>
          line.map((point, pointIndex) => {
            if (point === 0) {
              return null;
            }

            return (
              <mesh
                ref={ref}
                // eslint-disable-next-line react/no-array-index-key
                key={`cube-${plainIndex}-${lineIndex}-${pointIndex}`}
                // Ref={ref}
                // eslint-disable-next-line react/no-unknown-property
                position={[pointIndex, lineIndex, plainIndex]}
              >
                {/* eslint-disable-next-line react/no-unknown-property */}
                <boxGeometry args={[1, 1, 1]} />
                {/* <meshNormalMaterial /> */}
                <meshStandardMaterial color={color} />
              </mesh>
            );
          }),
        ),
      )}
    </group>
  );
}

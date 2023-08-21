import {animated} from '@react-spring/three';

export default function WireframeSegment3D({
  x,
  y,
  z,
}: {
  x: number;
  y: number;
  z: number;
}) {
  return (
    <animated.mesh position={[x, y, z]} scale={0.92}>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <boxGeometry args={[1, 1, 1]} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <meshStandardMaterial wireframe color="white" />
    </animated.mesh>
  );
}

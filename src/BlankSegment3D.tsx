import {animated} from '@react-spring/three';

export default function BlankSegment3D({x, y}: {x: number; y: number}) {
  return (
    <animated.mesh position={[x, y, 0]} scale={0.92}>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <boxGeometry args={[1, 1, 1]} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <meshStandardMaterial wireframe color="white" />
    </animated.mesh>
  );
}

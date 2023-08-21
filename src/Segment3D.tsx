import {useSpring, animated} from '@react-spring/three';
import {type PieceColor} from './piece-types';

export default function Segment3D({
  color,
  highlight,
  x,
  y,
  z,
}: {
  color: PieceColor;
  highlight: boolean;
  x: number;
  y: number;
  z: number;
}) {
  const {color: highlightColor} = useSpring({
    from: {color},
    to: [
      {color: '#ffffff'},
      {color},
      {color: '#ffffff'},
      {color},
      {color: '#ffffff'},
      {color},
      {color: '#ffffff'},
      {color},
      {color: '#ffffff'},
      {color},
    ],
    // Loop: true,
    config: {
      // ...config.slow,
      duration: 300,
    },
  });

  const {scale: highlightScale} = useSpring({
    from: {scale: 0.92},
    to: [
      {scale: 1.2},
      {scale: 0.92},
      {scale: 1.2},
      {scale: 0.92},
      {scale: 1.2},
      {scale: 0.92},
      {scale: 1.2},
      {scale: 0.92},
      {scale: 1.2},
      {scale: 0.92},
    ],
    // Loop: true,
    config: {
      // ...config.slow,
      duration: 300,
    },
  });

  return (
    <animated.mesh
      key={`cube-${y}-${x}`}
      position={[x, y, z]}
      scale={highlight ? highlightScale : 0.92}
    >
      {/* eslint-disable-next-line react/no-unknown-property */}
      <boxGeometry args={[1, 1, 1]} />
      {/* @ts-expect-error TS does not like the animated MeshStandardMaterial */}
      <animated.meshStandardMaterial
        color={highlight ? highlightColor : color}
      />
    </animated.mesh>
  );
}

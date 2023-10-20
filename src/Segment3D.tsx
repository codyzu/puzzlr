import {useSpring, animated} from '@react-spring/three';
import {useEffect} from 'react';
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
  const [{scale: highlightScale, color: highlightColor}, api] = useSpring(
    () => ({
      scale: 0.92,
      // Keep TS happy
      color: color as PieceColor | '#ffffff',
      config: {
        duration: 300,
      },
    }),
    [],
  );

  useEffect(() => {
    if (highlight) {
      api.start({
        to: [
          {scale: 1.2, color: '#ffffff'},
          {scale: 0.92, color},
          {scale: 1.2, color: '#ffffff'},
          {scale: 0.92, color},
          {scale: 1.2, color: '#ffffff'},
          {scale: 0.92, color},
          {scale: 1.2, color: '#ffffff'},
          {scale: 0.92, color},
          {scale: 1.2, color: '#ffffff'},
          {scale: 0.92, color},
          {scale: 1.2, color: '#ffffff'},
          {scale: 0.92, color},
        ],
      });
    } else {
      api.stop();
      api.set({
        scale: 0.92,
        color,
      });
    }
  }, [highlight, api, color]);

  return (
    <animated.mesh
      key={`cube-${y}-${x}`}
      position={[x, y, z]}
      scale={highlightScale}
    >
      {/* eslint-disable-next-line react/no-unknown-property */}
      <boxGeometry args={[1, 1, 1]} />
      {/* @ts-expect-error TS does not like the animated MeshStandardMaterial */}
      <animated.meshStandardMaterial color={highlightColor} />
    </animated.mesh>
  );
}

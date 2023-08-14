import {useEffect, type MutableRefObject, useState, useRef} from 'react';
import {OrbitControls, PerspectiveCamera, View} from '@react-three/drei';
import {useLiveQuery} from 'dexie-react-hooks';
import {Box3, MathUtils, type Group, Sphere} from 'three';
import {useSpring, animated, config} from '@react-spring/three';
import {useThree} from '@react-three/fiber';
import {db} from './db';
import {pieceColorValues} from './GenricPieces';
import {type PieceColor} from './piece-types';
import {pieceLayout, placedToColorMap} from './piece-layout';

export default function AssembledCube3D({
  cubeRef,
}: {
  cubeRef: MutableRefObject<HTMLDivElement>;
}) {
  const allPieces = useLiveQuery(async () =>
    db.pieces.orderBy('added').toArray(),
  );

  const [layer, setLayer] = useState<Array<Array<undefined | PieceColor>>>([
    [],
  ]);
  useEffect(() => {
    const placed = pieceLayout(allPieces?.map((piece) => piece.color) ?? []);
    const layerMap = placedToColorMap(placed);
    setLayer(layerMap);
  }, [allPieces]);

  const piecesRef = useRef<Group>(null!);
  const pivotRef = useRef<Group>(null!);

  const [pause, setPause] = useState(true);
  const [centered, setCentered] = useState(false);
  const [radius, setRadius] = useState<number>();
  const [scale, setScale] = useState<number>(1);

  const {rotate} = useSpring({
    from: {rotate: MathUtils.degToRad(0)},
    to: {rotate: MathUtils.degToRad(360)},
    loop: true,
    config: {
      ...config.wobbly,
      duration: 5000,
    },
    pause,
  });

  useEffect(() => {
    if (layer.flat().length === 0) {
      return;
    }

    if (centered) {
      return;
    }

    piecesRef.current.position.multiplyScalar(0);
    pivotRef.current.position.multiplyScalar(0);

    const bbox = new Box3().setFromObject(piecesRef.current);
    bbox.getCenter(piecesRef.current.position);
    piecesRef.current.position.multiplyScalar(-1);

    // Calculate the distance between the diagonals of the cube
    const sphere = new Sphere();
    bbox.getBoundingSphere(sphere);

    setRadius(sphere.radius);
    setPause(false);
    setCentered(true);
  }, [layer, centered]);

  const {viewport} = useThree();

  useEffect(() => {
    if (radius === undefined) {
      return;
    }

    const smallestAxis = Math.min(viewport.height, viewport.width);
    const scaleFactor = smallestAxis / (radius * 2);

    // 90% to be sure the object fits in the view
    setScale(scaleFactor * 0.9);
  }, [viewport.width, viewport.height, radius]);

  return (
    <View track={cubeRef}>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <ambientLight intensity={0.5} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <pointLight position={[-10, -10, -10]} />
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />

      <animated.group
        ref={pivotRef}
        rotation-x={rotate}
        rotation-y={rotate}
        rotation-z={rotate}
        scale={scale}
      >
        <group ref={piecesRef}>
          {layer.map((row, yIndex) =>
            row.map((color, xIndex) => {
              const props: {
                color?: string;
                visible?: boolean;
              } = {};
              if (color) {
                props.color = pieceColorValues[color];
              } else {
                props.visible = false;
              }

              return (
                <mesh
                  // eslint-disable-next-line react/no-array-index-key
                  key={`cube-${yIndex}-${xIndex}`}
                  // eslint-disable-next-line react/no-unknown-property
                  position={[xIndex, yIndex, 0]}
                  scale={0.92}
                >
                  {/* eslint-disable-next-line react/no-unknown-property */}
                  <boxGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial {...props} />
                </mesh>
              );
            }),
          )}
        </group>
      </animated.group>

      <OrbitControls />
    </View>
  );
}

import {useEffect, type MutableRefObject, useState, useRef} from 'react';
import {OrbitControls, PerspectiveCamera, View} from '@react-three/drei';
import {useLiveQuery} from 'dexie-react-hooks';
import {Box3, type Group, MathUtils, type Mesh, type Vector3} from 'three';
import {useFrame} from '@react-three/fiber';
import {db} from './db';
import {RotatedPiece, pieceColorValues, pieces} from './GenricPieces';
import {type PieceColor} from './piece-types';
import {pieceLayout, placedToColorMap, type PlacedPiece} from './piece-layout';

export default function AssembledCube3D({
  cubeRef,
}: {
  cubeRef: MutableRefObject<HTMLDivElement>;
}) {
  const allPieces = useLiveQuery(async () =>
    db.pieces.orderBy('added').toArray(),
  );

  const [placed, setPlaced] = useState<Array<Array<undefined | PieceColor>>>([
    [],
  ]);
  useEffect(() => {
    const nextPlaced = pieceLayout(
      allPieces?.map((piece) => piece.color) ?? [],
    );
    console.log('placed', nextPlaced);
    const layerMap = placedToColorMap(nextPlaced);
    console.log('layer', layerMap);
    setPlaced(layerMap);
  }, [allPieces]);

  const meshRef = useRef<Group>(null!);

  const [moveDistance, setMoveDistance] = useState<number>();
  const [moveDirection, setMoveDirection] = useState<Vector3>();
  const [moveBackDirection, setMoveBackDirection] = useState<Vector3>();

  useEffect(() => {
    if (placed.flat().length === 0) {
      return;
    }

    meshRef.current.position.x = 0;
    meshRef.current.position.y = 0;
    meshRef.current.position.z = 0;

    meshRef.current.rotation.x = 0;
    meshRef.current.rotation.y = 0;
    meshRef.current.rotation.z = 0;

    const bbox = new Box3().setFromObject(meshRef.current);
    bbox.getCenter(meshRef.current.position);
    meshRef.current.position.multiplyScalar(-1);

    const directionFromCenter = meshRef.current.position.clone().normalize();
    const directionToCenter = directionFromCenter.clone().multiplyScalar(-1);
    const distanceToCenter = meshRef.current.position.length();

    setMoveDistance(distanceToCenter);
    setMoveDirection(directionToCenter);
    setMoveBackDirection(directionFromCenter);
  }, [placed]);

  useFrame((_state, delta) => {
    if (!moveDirection || !moveDistance || !moveBackDirection) {
      return;
    }

    meshRef.current.translateOnAxis(moveDirection, moveDistance);
    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta;
    meshRef.current.rotation.z += delta;
    meshRef.current.translateOnAxis(moveBackDirection, moveDistance);
  });

  return (
    <View track={cubeRef}>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <ambientLight intensity={0.5} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <pointLight position={[-10, -10, -10]} />
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />

      <group ref={meshRef}>
        <group>
          {placed.map((row, yIndex) =>
            row.map((color, xIndex) => {
              if (!color) {
                return null;
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
                  <meshStandardMaterial color={pieceColorValues[color]} />
                </mesh>
              );
            }),
          )}
        </group>
      </group>

      <OrbitControls />

      {/* <group>
        {countEntries.flatMap(([color, count]) =>
          Array.from({length: count as number}).map((_, index) => {
            const Piece = pieces[color as PieceColor];
            return <Piece key={`${color}-${index}`} />;
          }),
        )}
      </group> */}
      {/* <Shapes position={[0, 0, 0]} /> */}
    </View>
  );
}

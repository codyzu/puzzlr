import {useRef, useEffect, useState, type FunctionComponent} from 'react';
import {type Group, Box3, type Vector3 as V3} from 'three';
import {useFrame} from '@react-three/fiber';
import {type PieceColor} from './piece-types';
import {pieces} from './GenricPieces';

// @ts-expect-error not sure how to do this in TS
export const rotatingPieces: {[key in PieceColor]: FunctionComponent} =
  Object.fromEntries(
    (Object.keys(pieces) as PieceColor[]).map((color) => [
      color,
      () => <RotatingPiece color={color} />,
    ]),
  );

function RotatingPiece({color}: {color: PieceColor}) {
  const ref = useRef<Group>(null!);
  const [moveDistance, setMoveDistance] = useState<number>();
  const [moveDirection, setMoveDirection] = useState<V3>();
  const [moveBackDirection, setMoveBackDirection] = useState<V3>();
  const GenericPiece = pieces[color];

  // https://stackoverflow.com/a/28860849
  // https://stackoverflow.com/a/54611417
  useEffect(() => {
    const bbox = new Box3().setFromObject(ref.current);
    bbox.getCenter(ref.current.position);
    ref.current.position.multiplyScalar(-1);

    const directionFromCenter = ref.current.position.clone().normalize();
    const directionToCenter = directionFromCenter.clone().multiplyScalar(-1);
    const distanceToCenter = ref.current.position.length();

    console.log({directionFromCenter, directionToCenter, distanceToCenter});

    setMoveDistance(distanceToCenter);
    setMoveDirection(directionToCenter);
    setMoveBackDirection(directionFromCenter);
  }, []);

  useFrame((_state, delta) => {
    // Wait until the effect has executed
    if (!moveDirection || !moveDistance || !moveBackDirection) {
      return;
    }

    // https://stackoverflow.com/a/63597379
    // https://stackoverflow.com/a/72647926
    ref.current.translateOnAxis(moveDirection, moveDistance);
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta;
    ref.current.rotation.z += delta;
    ref.current.translateOnAxis(moveBackDirection, moveDistance);
  });

  return <GenericPiece ref={ref} scale={1.2} />;
}

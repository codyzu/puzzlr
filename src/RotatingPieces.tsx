import {useRef, useEffect, useState, type FunctionComponent} from 'react';
import {type Group, Box3, type Vector3 as V3} from 'three';
import {type Euler, useFrame, useThree} from '@react-three/fiber';
import {type PieceColor} from './piece-types';
import {GenericPiece, pieceColorValues} from './GenricPieces';

type OptionalPieceProps = {
  rotation?: Euler;
  setTakeSnapshot?: React.Dispatch<React.SetStateAction<() => string>>;
  scale?: number;
};

// @ts-expect-error not sure how to do this in TS
export const rotatingPieces: {
  [key in PieceColor]: FunctionComponent<OptionalPieceProps>;
} = Object.fromEntries(
  Object.keys(pieceColorValues).map((color) => [
    color,
    (props) => <RotatingPiece color={color as PieceColor} {...props} />,
  ]),
);

function RotatingPiece({
  color,
  rotation,
  scale,
  setTakeSnapshot,
}: {
  color: PieceColor;
} & OptionalPieceProps) {
  const ref = useRef<Group>(null!);
  const [moveDistance, setMoveDistance] = useState<number>();
  const [moveDirection, setMoveDirection] = useState<V3>();
  const [moveBackDirection, setMoveBackDirection] = useState<V3>();
  // Const GenericPiece = pieces[color];

  // https://stackoverflow.com/a/28860849
  // https://stackoverflow.com/a/54611417
  useEffect(() => {
    const bbox = new Box3().setFromObject(ref.current);
    bbox.getCenter(ref.current.position);
    ref.current.position.multiplyScalar(-1);

    const directionFromCenter = ref.current.position.clone().normalize();
    const directionToCenter = directionFromCenter.clone().multiplyScalar(-1);
    const distanceToCenter = ref.current.position.length();

    setMoveDistance(distanceToCenter);
    setMoveDirection(directionToCenter);
    setMoveBackDirection(directionFromCenter);
  }, []);

  const {gl, scene, camera} = useThree();
  useEffect(() => {
    function takeSnapshot() {
      gl.render(scene, camera);
      const data = gl.domElement.toDataURL();
      return data;
    }

    setTakeSnapshot?.(() => takeSnapshot);
  }, [gl, scene, camera, setTakeSnapshot]);

  // UseEffect(() => {
  //   if (rotation !== undefined) {
  //     console.log('rotating');
  //     ref.current.rotation.x = rotation[0];
  //     ref.current.rotation.y = rotation[1];
  //     ref.current.rotation.z = rotation[2];
  //   }
  // }, [rotation]);

  useFrame((_state, delta) => {
    // Wait until the effect has executed
    if (
      !moveDirection ||
      !moveDistance ||
      !moveBackDirection ||
      rotation !== undefined
    ) {
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

  return (
    <GenericPiece
      ref={ref}
      scale={scale ?? 1.2}
      color={color}
      rotation={rotation}
    />
  );
}

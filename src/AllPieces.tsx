import {useEffect, useRef} from 'react';
import {type Group} from 'three';
import {useThree} from '@react-three/fiber';
import {pieces} from './Piece2';

export default function AllPieces() {
  // Const existingPieces = useLiveQuery(
  //   async () => db.pieces.where('color').equals(piece).toArray(),
  //   [piece],
  // );

  const groupRef = useRef<Group>(null!);

  useEffect(() => {
    // Console.log('group', groupRef.current);
    // if (groupRef.current) {
    //   console.log('ok');
    //   const bbox = new Box3().setFromObject(groupRef.current);
    //   bbox.getCenter(groupRef.current.position);
    //   groupRef.current.position.multiplyScalar(-1);
    // }
  }, []);

  // UseFrame(() => {
  //   if (groupRef.current) {
  //     console.log('ok');
  //     const bbox = new Box3().setFromObject(groupRef.current);
  //     bbox.getCenter(groupRef.current.position);
  //     groupRef.current.position.multiplyScalar(-1);
  //   }
  // });

  // const PieceBlue = pieces.blue;
  const PieceOrange = pieces.orange;

  const {viewport, camera} = useThree();
  console.log('viewport', viewport);
  console.log('camera', camera);
  console.log(groupRef.current?.scale);

  return (
    <group
      ref={groupRef}
      // Scale={[viewport.width, viewport.height, 1]}
      // Position={[0, Object.keys(pieces).length * 3 * 0.5 * -1, 0]}
    >
      {/* <PieceOrange x={0} y={0} z={0} /> */}
      {Object.entries(pieces).map(([color, Piece], index) => {
        return (
          <Piece
            key={color}
            x={0}
            y={index * 2 - Object.keys(pieces).length * 2 * 0.5}
            z={0}
          />
        );
      })}
      {/* <PieceBlue x={0} y={3} z={0} />
      <PieceBlue x={0} y={0} z={0} />
      <PieceOrange x={0} y={-3} z={0} /> */}

      {/* {Object.entries(pieces).map(([color, Piece], index) => (
        <Piece key={color} offset={index} />
      ))} */}
    </group>
  );
}

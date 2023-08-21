import {useEffect, type MutableRefObject, useState, useRef} from 'react';
import {OrbitControls, PerspectiveCamera, View} from '@react-three/drei';
import {useLiveQuery} from 'dexie-react-hooks';
import {Box3, MathUtils, type Group, Sphere, Vector3} from 'three';
import {useSpring, animated, config} from '@react-spring/three';
import {useThree} from '@react-three/fiber';
import {db} from './db';
import {type LayerPoint, pieceLayout, placedToColorMap} from './piece-layout';
import CubeLayer3D from './CubeLayer3D';

export default function AssembledCube3D({
  cubeRef,
}: {
  cubeRef: MutableRefObject<HTMLDivElement>;
}) {
  const allPieces = useLiveQuery(async () =>
    db.pieces.orderBy('added').toArray(),
  );

  const [layers, setLayers] = useState<
    Array<Array<Array<undefined | LayerPoint>>>
  >([[]]);
  useEffect(() => {
    if (allPieces === undefined) {
      return;
    }

    console.log('all', allPieces);
    const nextLayers = pieceLayout(
      allPieces?.map((piece) => piece.color) ?? [],
    );
    const layerMaps = nextLayers.map((layer) => placedToColorMap(layer));

    // Push an empty layer if the last layer was complete
    if (layerMaps.length < 4 && layerMaps.at(-1)!.flat().every(Boolean)) {
      layerMaps.push(
        Array.from({
          length: 4,
        }).map(() => Array.from({length: 4}).map(() => undefined)),
      );
    }

    setLayers(layerMaps);
  }, [allPieces]);

  const piecesRef = useRef<Group>(null!);
  const pivotRef = useRef<Group>(null!);

  const [centered, setCentered] = useState(false);
  const [radius, setRadius] = useState<number>();
  const [scale, setScale] = useState<number>(1);

  const [{rotate}] = useSpring(
    () => ({
      from: {rotate: MathUtils.degToRad(0)},
      to: {rotate: MathUtils.degToRad(360)},
      loop: true,
      config: {
        ...config.wobbly,
        duration: 6000,
      },
    }),
    [layers],
  );

  useEffect(() => {
    if (layers.flat(2).length === 0) {
      return;
    }

    if (centered) {
      return;
    }

    piecesRef.current.position.multiplyScalar(0);
    pivotRef.current.position.multiplyScalar(0);

    const bbox = new Box3().setFromObject(piecesRef.current);
    console.log('original', bbox);
    bbox.getCenter(piecesRef.current.position);
    piecesRef.current.position.multiplyScalar(-1);

    // Calculate the distance between the diagonals of the cube
    const sphere = new Sphere();
    bbox.getBoundingSphere(sphere);

    setRadius(sphere.radius);
    setCentered(true);
  }, [layers, centered]);

  useEffect(() => {
    if (centered) {
      // Const xyPos = ((4 - (1 - 0.92)) / 2) * -1;
      // const zPos = ((layers.length - (1 - 0.92)) / 2) * -1;
      // piecesRef.current.position.x = xyPos;
      // piecesRef.current.position.y = xyPos;
      // piecesRef.current.position.z = zPos;

      const center = new Vector3();
      const bbox = new Box3().setFromObject(piecesRef.current);
      bbox.getCenter(center);
      piecesRef.current.worldToLocal(center);
      piecesRef.current.position.copy(center);
      piecesRef.current.position.multiplyScalar(-1);

      // Makes the scale jump, the sphere doesn't behave well with the axis bound bounding box
      // Const sphere = new Sphere();
      // bbox.getBoundingSphere(sphere);
      // setRadius(sphere.radius);
      // Console.log(
      //   'pos',
      //   piecesRef.current.localToWorld(piecesRef.current.position.clone()),
      // );
    }
  }, [layers, centered]);

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
          {layers.map((layer, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <CubeLayer3D key={`layer-${index}`} layer={layer} z={index} />
          ))}
        </group>
      </animated.group>

      <OrbitControls />
    </View>
  );
}

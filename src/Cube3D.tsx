import {type MutableRefObject} from 'react';
import {PerspectiveCamera, View} from '@react-three/drei';
import Shapes from './Shapes';

export default function Cube3D({
  cubeRef,
}: {
  cubeRef: MutableRefObject<HTMLDivElement>;
}) {
  return (
    <>
      {/* <View track={cubeRef}> */}
      {/* eslint-disable-next-line react/no-unknown-property */}
      <ambientLight intensity={0.5} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <pointLight position={[-10, -10, -10]} />
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      {/* <OrbitControls /> */}
      <Shapes position={[0, 0, 0]} />
      {/* </View> */}
    </>
  );
}

import {Canvas} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import {Vector3 as V3} from 'three';
import Shapes from './Shapes';

export default function Cube() {
  const v1 = new V3(1, 0, 0);
  const v2 = new V3(0, 1, 0);
  const v3 = new V3();
  const center = new V3(0, 0, 0);
  const offset = new V3(-1.5, -1.5, -1.5);

  const p = center.clone().add(offset);

  console.log({center, offset, p});
  v3.crossVectors(v1, v2);
  console.log(v3);
  return (
    <Canvas>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <ambientLight intensity={0.5} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <pointLight position={[-10, -10, -10]} />

      <Shapes position={[0, 0, 0]} />

      <OrbitControls />
    </Canvas>
  );
}

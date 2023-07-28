import {useRef} from 'react';
import {Canvas, /* useFrame, */ type Vector3} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import {Vector3 as V3, type Mesh /* , Group */} from 'three';
import Shape, {type Shape3d} from './Shape';
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
      {/* <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} /> */}

      {/* <Box position={[0, 0, 0]} />
      <Box position={[0, 0, 1]} />
      <Box position={[0, 0, -1]} />
      <Box position={[0, 1, 0]} />
      <Box position={[0, 1, 1]} />
      <Box position={[0, 1, -1]} />
      <Box position={[0, -1, 0]} />
      <Box position={[0, -1, 1]} />
      <Box position={[0, -1, -1]} />

      <Box position={[1, 0, 0]} />
      <Box position={[1, 0, 1]} />
      <Box position={[1, 0, -1]} />
      <Box position={[1, 1, 0]} />
      <Box position={[1, 1, 1]} />
      <Box position={[1, 1, -1]} />
      <Box position={[1, -1, 0]} />
      <Box position={[1, -1, 1]} />
      <Box position={[1, -1, -1]} />

      <Box position={[-1, 0, 0]} />
      <Box position={[-1, 0, 1]} />
      <Box position={[-1, 0, -1]} />
      <Box position={[-1, 1, 0]} />
      <Box position={[-1, 1, 1]} />
      <Box position={[-1, 1, -1]} />
      <Box position={[-1, -1, 0]} />
      <Box position={[-1, -1, 1]} />
      <Box position={[-1, -1, -1]} /> */}
      {/* <BoxGroup position={[0, 0, 0]} /> */}

      <Shapes position={[0, 0, 0]} />

      <OrbitControls />
    </Canvas>
  );
}

function Box({position}: {position: Vector3}) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<Mesh>(null!);

  ref.current.geometry.center();
  // Hold state for hovered and clicked events
  // const [hover, setHover] = useState(false);
  // const [clicked, setClicked] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((_state, delta) => {
  //   ref.current.rotation.x += delta;
  //   ref.current.rotation.y += delta;
  //   ref.current.rotation.z += delta;
  // });
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      ref={ref}
      // Scale={clicked ? 1.5 : 1}
      // eslint-disable-next-line react/no-unknown-property
      position={position}
      // OnClick={() => {
      //   setClicked(!clicked);
      // }}
      // onPointerOver={() => {
      //   setHover(true);
      // }}
      // onPointerOut={() => {
      //   setHover(false);
      // }}
      // {...props}
    >
      {/* eslint-disable-next-line react/no-unknown-property */}
      <boxGeometry args={[1, 1, 1, 6, 6, 6]} />
      <meshNormalMaterial />
      {/* <meshStandardMaterial color={hover ? 'hotpink' : 'orange'} /> */}
    </mesh>
  );
}

function BoxGroup({position}: {position: Vector3}) {
  // This reference gives us direct access to the THREE.Mesh object
  // const ref = useRef<Mesh>(null!);
  // Hold state for hovered and clicked events
  // const [hover, setHover] = useState(false);
  // const [clicked, setClicked] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((_state, delta) => {
  //   ref.current.rotation.x += delta;
  //   ref.current.rotation.y += delta;
  //   ref.current.rotation.z += delta;
  // });
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    // eslint-disable-next-line react/no-unknown-property
    <group position={position} rotation={[90, 0, 180]}>
      <Box position={[0, 0, 0]} />
      <Box position={[0, 0, 1]} />
      <Box position={[0, 0, -1]} />
      <Box position={[0, 1, 0]} />
      <Box position={[0, 1, 1]} />
      <Box position={[0, 1, -1]} />
      <Box position={[0, -1, 0]} />
      <Box position={[0, -1, 1]} />
      <Box position={[0, -1, -1]} />

      <Box position={[1, 0, 0]} />
      <Box position={[1, 0, 1]} />
      <Box position={[1, 0, -1]} />
      <Box position={[1, 1, 0]} />
      <Box position={[1, 1, 1]} />
      <Box position={[1, 1, -1]} />
      <Box position={[1, -1, 0]} />
      <Box position={[1, -1, 1]} />
      <Box position={[1, -1, -1]} />

      <Box position={[-1, 0, 0]} />
      <Box position={[-1, 0, 1]} />
      <Box position={[-1, 0, -1]} />
      <Box position={[-1, 1, 0]} />
      <Box position={[-1, 1, 1]} />
      <Box position={[-1, 1, -1]} />
      <Box position={[-1, -1, 0]} />
      <Box position={[-1, -1, 1]} />
      <Box position={[-1, -1, -1]} />
    </group>
  );
}

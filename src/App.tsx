import {type MutableRefObject, useRef} from 'react';
import {Canvas} from '@react-three/fiber';
import {View} from '@react-three/drei';
import logo from './assets/logo.png';
import {db} from './db';
import {pieces} from './Piece';
import {type PieceColor} from './piece-types';
import Shapes from './Shapes';
import SingleShape from './SingleShapeDom';

function App() {
  const orangeRef = useRef<HTMLDivElement>(null!);
  const greenRef = useRef<HTMLDivElement>(null!);
  const blueRef = useRef<HTMLDivElement>(null!);
  const purpleRef = useRef<HTMLDivElement>(null!);
  const pinkRef = useRef<HTMLDivElement>(null!);
  const cubeRef = useRef<HTMLDivElement>(null!);

  const pieceRefs: {[key in PieceColor]: MutableRefObject<HTMLDivElement>} = {
    orange: orangeRef,
    green: greenRef,
    blue: blueRef,
    purple: purpleRef,
    pink: pinkRef,
  };

  return (
    <div className="w-full">
      <div className="gap-4 p-2 w-full max-w-screen-sm">
        <div className="flex flex-row gap-2">
          <img src={logo} className="h-10 w-auto" />
          <div className="font-heading text-3xl font-700">NodeConf EU 2023</div>
        </div>
        <div className="font-heading font-600">
          at the Lyrath Estate, Kilkenny, Ireland
        </div>
        <div className="flex flex-row w-full items-stretch">
          <div className="gap-2">
            {Object.entries(pieceRefs).map(([color, ref]) => (
              <SingleShape key={color} ref={ref} color={color as PieceColor} />
            ))}
          </div>
          <div ref={cubeRef} className="flex-grow-1" />
        </div>
        <div className="prose">Find the pieces to complete the cube</div>
        <button
          type="button"
          className="btn"
          onClick={() => {
            void db.transaction('rw', [db.pieces], async () =>
              db.pieces.clear(),
            );
          }}
        >
          clear
        </button>
      </div>
      <Canvas
        // EventSource={mainRef}
        eventSource={document.querySelector<HTMLElement>('#root')!}
        className="important-absolute top-0 left-0 w-screen h-screen"
      >
        {Object.entries(pieceRefs).map(([color, ref]) => {
          const Piece = pieces[color as PieceColor];
          return (
            <View key={color} track={ref}>
              {/* eslint-disable-next-line react/no-unknown-property */}
              <ambientLight intensity={0.5} />
              {/* eslint-disable-next-line react/no-unknown-property */}
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              {/* eslint-disable-next-line react/no-unknown-property */}
              <pointLight position={[-10, -10, -10]} />
              {/* <OrbitControls /> */}
              <Piece x={0} y={0} z={0} />
            </View>
          );
        })}

        <View track={cubeRef}>
          {/* eslint-disable-next-line react/no-unknown-property */}
          <ambientLight intensity={0.5} />
          {/* eslint-disable-next-line react/no-unknown-property */}
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          {/* eslint-disable-next-line react/no-unknown-property */}
          <pointLight position={[-10, -10, -10]} />
          {/* <OrbitControls /> */}
          <Shapes position={[0, 0, 0]} />
        </View>
      </Canvas>
    </div>
  );
}

export default App;

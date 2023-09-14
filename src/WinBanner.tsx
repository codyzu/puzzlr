import {Suspense, lazy, useEffect, useRef} from 'react';
import {Reactions} from './reactions/Reactions';
import useReactions from './reactions/use-reactions';
import reactionsIconMap from './reactions/reaction-icons-map';
import {type CubeLayout} from './use-cube-layout';
import ResetButton from './ResetButton';
import NearFormLove from './NearFormLove';
import Header from './Header';

const AssembledCube3D = lazy(async () => import('./AssembedCube3D'));
const Canvas3D = lazy(async () => import('./Canvas3D'));

export default function WinBanner({cubeLayout}: {cubeLayout: CubeLayout}) {
  const {addReactions, reactions, removeReaction} = useReactions();

  useEffect(() => {
    let handle: number | undefined;
    function addRandomReaction() {
      handle = undefined;
      const randomReaction = Array.from(reactionsIconMap.keys())[
        Math.floor(Math.random() * reactionsIconMap.size)
      ];
      addReactions([[Date.now().toString(), {reaction: randomReaction}]]);
      handle = setTimeout(addRandomReaction, Math.random() * 800);
    }

    addRandomReaction();

    return () => {
      if (handle !== undefined) {
        clearTimeout(handle);
      }
    };
  }, [addReactions]);

  const cubeRef = useRef<HTMLDivElement>(null!);
  const controlsRef = useRef<HTMLDivElement>(null!);

  return (
    <div className="relative w-full h-[100dvh] justify-between p-4 from-magenta to-sapphire bg-gradient-to-br bg-gradient-from-opacity-75 bg-gradient-to-opacity-75 items-stretch">
      <div ref={cubeRef} className="absolute w-full h-full top-0 left-0">
        <Suspense>
          <Canvas3D className="">
            <AssembledCube3D
              demo
              cubeRef={cubeRef}
              controlsRef={controlsRef}
              {...cubeLayout}
            />
          </Canvas3D>
        </Suspense>
      </div>
      <Header />
      <div className="mt-7 backdrop-blur-lg backdrop-filter z-1 animate-bounce p-2 self-center rounded">
        <div className="relative text-4xl font-bold animate-bounce-in-left">
          Congratulations!
        </div>
        <div className="text-center animate-bounce-in-right inline-block">
          You&apos;ve completed the Puzzlr challenge. Tweet a screen capture of
          this page and tag <span className="font-bold">@NearForm</span> to
          claim your prize.
        </div>
      </div>
      <div className="flex-grow-1 px-6 py-2 pointer-events-auto items-center">
        <div
          ref={controlsRef}
          className="relative pointer-events-auto flex-grow-1 w-[90%] max-w-screen-md"
        />
      </div>

      <div className="relative flex-row-reverse justify-center flex-wrap gap-2">
        <ResetButton />
        <NearFormLove />
      </div>
      <Reactions reactions={reactions} removeReaction={removeReaction} />
    </div>
  );
}

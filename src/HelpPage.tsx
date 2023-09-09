import clsx from 'clsx';
import {ParallaxLayer, Parallax, type IParallax} from '@react-spring/parallax';
import {Suspense, useEffect, useRef, useState} from 'react';
import Collapsable from './Collapsable';
import Canvas3D from './Canvas3D';
import RotatingPieces3D from './RotatingPieces3D';
import usePieceRefs from './use-piece-refs';
import SingleShape from './SingleShapeDom';
import {type PieceColor} from './piece-types';
import AssembledCube3D from './AssembedCube3D';

export default function HelpPage({onClose}: {onClose: () => void}) {
  const parallaxRef = useRef<IParallax>(null);
  console.log(parallaxRef.current?.current);
  const [showClose, setShowClose] = useState(false);
  const pieceRefs = usePieceRefs();
  const cubeRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    function handleScroll() {
      if (parallaxRef.current) {
        // Console.log(parallaxRef.current.current);
        if (parallaxRef.current.current / parallaxRef.current.space > 4) {
          setShowClose(true);
        } else {
          setShowClose(false);
        }
      }
    }

    const current = parallaxRef.current?.container?.current as
      | HTMLDivElement
      | undefined;

    current?.addEventListener('scroll', handleScroll);

    return () => {
      current?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="absolute w-full top-0 left-0 h-[100dvh] wizard">
      <Parallax
        ref={parallaxRef}
        // OnClick={() => {
        //   advanceHelp();
        // }}
        config={{}}
        pages={6}
        // ClassName="absolute top-0 left-0 w-full p-4 wizard important-h-[100dvh]"
        className=""
        onScroll={() => {
          console.log('scrolled');
        }}
      >
        <ParallaxLayer className="bg-magenta" offset={1} speed={1} />
        <ParallaxLayer className="bg-tangerine" offset={3} speed={1} />
        <ParallaxLayer className="bg-violet" offset={5} speed={1} />
        <ParallaxLayer
          offset={0}
          speed={2}
          className="max-w-screen-sm justify-center gap-3 p4"
        >
          <div className="font-bold inline text-center text-lg">
            Welcome to Puzzlr! The Ultimate Cube-Building Challenge!
          </div>
          <div className="text-center">
            Your mission is simple: collect puzzle pieces and construct your
            very own unique cube. Here&apos;s how it all comes together...
          </div>
        </ParallaxLayer>
        <ParallaxLayer
          offset={1}
          speed={0}
          sticky={{start: 1, end: 2}}
          className="justify-center"
        >
          <div className="w-50% self-start">
            <div className="relative gap-2 lt-sm:gap-1 pointer-events-auto help-2:(help-border) help-3:(help-border)">
              <div className="highlight font-bold help:wizard-highlight text-sm">
                Inventory
              </div>
              {Object.entries(pieceRefs).map(([color, ref]) => (
                <SingleShape
                  key={color}
                  ref={ref}
                  color={color as PieceColor}
                  // AttemptPlacement={attemptPlacement}
                />
              ))}
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0} className="">
          <Collapsable
            className="w-50% self-end"
            title={
              <>
                <div className="i-tabler-puzzle-filled w-10 h-10" />
                <div className="font-semibold">Find QR Codes</div>
              </>
            }
          >
            Keep your eyes peeled for QR codes on people and posters throughout
            the venue. Scanning these codes will magically add puzzle pieces to
            your inventory.
          </Collapsable>
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={0}>
          <Collapsable
            className="w-50% self-end"
            title={
              <>
                <div className="i-tabler-shape w-10 h-10" />
                {/* <div className="i-tabler-shape" /> */}
                <div className="font-semibold">Five Unique Shapes</div>
              </>
            }
          >
            There are five distinct shapes of puzzle pieces waiting to be
            collected. With infinite possibilities, you&apos;ll create a cube
            that&apos;s truly your own.
          </Collapsable>
        </ParallaxLayer>
        <ParallaxLayer offset={3}>
          <div ref={cubeRef} className="w-50% h-full self-end" />
        </ParallaxLayer>
        <ParallaxLayer offset={3} speed={0}>
          <Collapsable
            className="w-50% self-start"
            title={
              <>
                <div className="i-tabler-crane w-10 h-10" />
                {/* <div className="i-tabler-crane" /> */}
                <div className="font-semibold">Building Your Cube</div>
              </>
            }
          >
            The ultimate goal? Craft your cube, layer by layer, using multiple
            pieces of various shapes. The challenge lies in assembling it just
            right.
          </Collapsable>
        </ParallaxLayer>
        <ParallaxLayer offset={4}>
          <Collapsable
            className="w-50% self-end"
            title={
              <>
                <div className="i-tabler-brand-twitter w-10 h-10" />
                {/* <div className="i-tabler-brand-twitter" /> */}
                <div className="font-semibold">Tweet Your Success</div>
              </>
            }
          >
            Once your cube is complete, shout it out to the world! Tweet a
            screenshot of your masterpiece to @NearForm. Exciting prizes await
            the first 100 people to tweet a completed cube.
          </Collapsable>
        </ParallaxLayer>
        <ParallaxLayer
          offset={5}
          onClick={() => {
            onClose();
          }}
        >
          <Collapsable
            className="w-50% self-start"
            title={
              <>
                <div className="i-tabler-sparkles w-10 h-10" />
                {/* <div className="i-tabler-sparkles" /> */}
                <div className="font-semibold">Join Us at NodeConf EU</div>
              </>
            }
          >
            Don&apos;t stop at the cube; there&apos;s more puzzling excitement
            waiting for you at NodeConf EU.
          </Collapsable>
        </ParallaxLayer>
      </Parallax>
      <div
        className={clsx(
          'absolute bottom-0 animate-bounce transition-opacity ease-out duration-800 pb-8',
          showClose ? 'opacity-0' : 'opacity-100',
        )}
        onClick={() => {
          console.log('o', parallaxRef.current);
        }}
      >
        <div className="i-tabler-chevron-compact-down w-40 h-40" />
        <div>scroll</div>
      </div>
      <div
        className={clsx(
          'absolute bottom-0 transition-opacity ease-out duration-800 pb-4',
          showClose ? 'animate-wobble opacity-100' : 'opacity-0',
        )}
        onClick={() => {
          onClose();
        }}
      >
        <div className="w-20 h-20 i-tabler-square-rounded-check" />
        <div className="w-20 h-20 text-center">click anywhere to close</div>
      </div>
      <div className="absolute top-0 left-0">
        <Suspense>
          <Canvas3D className="pointer-events-none help-2:z-1 help-3:z-1">
            <RotatingPieces3D pieceRefs={pieceRefs} />
          </Canvas3D>
        </Suspense>
      </div>
      <div className="absolute top-0 left-0 w-50%">
        <Suspense>
          <Canvas3D className="help-3:z-1">
            <AssembledCube3D cubeRef={cubeRef} />
          </Canvas3D>
        </Suspense>
      </div>
    </div>
  );
}

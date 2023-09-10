import clsx from 'clsx';
import {ParallaxLayer, Parallax, type IParallax} from '@react-spring/parallax';
import {Suspense, lazy, useEffect, useRef, useState} from 'react';
import usePieceRefs from './use-piece-refs';
import SingleShape from './SingleShapeDom';
import {type PieceColor} from './piece-types';
import logoNodeConf from './assets/logo.png';
import NearFormLove from './NearFormLove';

const AssembledCube3D = lazy(async () => import('./AssembedCube3D'));
const RotatingPieces3D = lazy(async () => import('./RotatingPieces3D'));
const Canvas3D = lazy(async () => import('./Canvas3D'));

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
      <Parallax ref={parallaxRef} config={{}} pages={6} className="">
        <ParallaxLayer className="bg-magenta" offset={1} speed={1} />
        <ParallaxLayer className="bg-tangerine" offset={3} speed={1} />
        <ParallaxLayer className="bg-violet" offset={5} speed={1} />
        <ParallaxLayer offset={0} speed={2} className="justify-start p4">
          <div className="min-h-70% gap-3 justify-center">
            <div className="i-tabler-cube w-40 h-40" />
            <div className="help-header text-center">
              Welcome to Puzzlr! The Ultimate Cube-Building Challenge!
            </div>
            <div className="text-center">
              Your mission is simple: collect puzzle pieces and construct your
              very own unique cube. Learn how it all comes together...
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer
          offset={1}
          speed={1}
          sticky={{start: 1, end: 2}}
          className="justify-center"
        >
          <div className="w-50% self-start">
            <div className="gap-2 lt-sm:gap-1">
              <div className="highlight font-bold text-sm">Inventory</div>
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
        <ParallaxLayer offset={1} speed={0}>
          <div className="help-container self-end">
            <div className="flex flex-row gap-2 items-end">
              <div className="i-tabler-puzzle help-icon" />
              <div className="help-header">Find QR Codes</div>
            </div>
            <div>
              Keep your eyes peeled for QR codes on people and posters
              throughout the venue. Scanning these codes will magically add
              puzzle pieces to your inventory.
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={0}>
          <div className="help-container self-end">
            <div className="flex flex-row gap-2 items-end">
              <div className="i-tabler-shape help-icon" />
              <div className="help-header">Five Unique Shapes</div>
            </div>
            <div>
              There are five distinct shapes of puzzle pieces waiting to be
              collected. With infinite possibilities, you&apos;ll create a cube
              that&apos;s truly your own.
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={3} speed={1}>
          <div ref={cubeRef} className="help-container self-end">
            <div ref={cubeRef} className="w-full aspect-square" />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={3} speed={0}>
          <div className="help-container self-start text-right">
            <div className="flex flex-row gap-2 items-end">
              <div className="help-header">Building Your Cube</div>
              <div className="i-tabler-crane help-icon" />
            </div>

            <div>
              The ultimate goal? Craft your cube, layer by layer, using multiple
              pieces of various shapes. The challenge lies in assembling it just
              right.
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={4} speed={1}>
          <div className="help-container self-start">
            <NearFormLove large />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={4}>
          <div className="help-container self-end">
            <div className="flex flex-row gap-2 items-end">
              <div className="i-tabler-brand-twitter help-icon" />
              <div className="help-header">Tweet Your Success</div>
            </div>
            <div>
              Once your cube is complete, shout it out to the world! Tweet a
              screenshot of your masterpiece to @NearForm. Exciting prizes await
              the first 100 people to tweet a completed cube.
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={5} speed={1}>
          <div className="help-container self-end p-4 max-w-60">
            <img src={logoNodeConf} className="" />
          </div>
        </ParallaxLayer>
        <ParallaxLayer
          offset={5}
          onClick={() => {
            onClose();
          }}
        >
          <div className="help-container self-start text-right">
            <div className="flex flex-row gap-2 items-end">
              <div className="help-header">Join Us at NodeConf EU</div>
              <div className="i-tabler-sparkles help-icon" />
            </div>
            Don&apos;t stop at the cube; there&apos;s more puzzling excitement
            waiting for you at NodeConf EU.
          </div>
        </ParallaxLayer>
      </Parallax>
      <div
        className={clsx(
          'absolute bottom-0 animate-bounce transition-opacity ease-out duration-800 pb-8 pointer-events-none',
          showClose ? 'opacity-0' : 'opacity-100',
        )}
      >
        <div className="i-tabler-chevron-compact-down w-30 h-30" />
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
          <Canvas3D className="pointer-events-none">
            <RotatingPieces3D pieceRefs={pieceRefs} />
          </Canvas3D>
        </Suspense>
      </div>
      <div className="absolute top-0 left-0">
        <Suspense>
          <Canvas3D className="help-3:z-1">
            <AssembledCube3D cubeRef={cubeRef} />
          </Canvas3D>
        </Suspense>
      </div>
    </div>
  );
}

import clsx from 'clsx';
import {ParallaxLayer, Parallax, type IParallax} from '@react-spring/parallax';
import {Suspense, lazy, useEffect, useRef, useState} from 'react';
import usePieceRefs from './use-piece-refs';
import logoNodeConf from './assets/nc-logo.svg';
import NearFormLove from './NearFormLove';
import Inventory from './Inventory';
import {type CubeLayout} from './use-cube-layout';

const AssembledCube3D = lazy(async () => import('./AssembedCube3D'));
const RotatingPieces3D = lazy(async () => import('./RotatingPieces3D'));
const Canvas3D = lazy(async () => import('./Canvas3D'));

export default function HelpPage({
  onClose,
  cubeLayout,
}: {
  onClose: () => void;
  cubeLayout: CubeLayout;
}) {
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
            <div className="text-center text-xl font-bold">
              Welcome to Puzzlr!
            </div>
            <div className="text-xl text-center">
              The Ultimate Cube-Building Challenge!
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
            <Inventory pieceRefs={pieceRefs} />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0}>
          <div className="help-container-right">
            <div className="gap-2 items-start">
              <div className="i-tabler-puzzle help-icon ml--2" />
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
          <div className="help-container-right">
            <div className="gap-2 items-start">
              <div className="i-tabler-shape help-icon ml--2" />
              <div className="help-header">Five Unique Shapes</div>
            </div>
            <div>
              There are five distinct shapes of puzzle pieces waiting to be
              collected. With infinite possibilities, you&apos;ll create a cube
              that&apos;s truly your own. Click on pieces in your inventory to
              add them to the cube.
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={3} speed={1}>
          <div className="help-container self-end w-100% mr--25%">
            <div
              ref={cubeRef}
              className="w-full max-w-[min(100vh,calc(100vw_*_0.75))] aspect-square"
            />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={3} speed={0}>
          <div className="help-container-left">
            <div className="gap-2 items-end">
              <div className="i-tabler-crane help-icon" />
              <div className="help-header">Building Your Cube</div>
            </div>

            <div>
              The ultimate goal? Craft your cube, layer by layer, using multiple
              pieces of various shapes. The challenge lies in assembling it just
              right.
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={4} speed={1}>
          <div className="help-container-left">
            <NearFormLove vertical />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={4}>
          <div className="help-container-right">
            <div className="gap-2 items-start">
              <div className="i-tabler-brand-twitter help-icon" />
              <div className="help-header">Tweet Your Success</div>
            </div>
            <div className="inline">
              Once your cube is complete, shout it out to the world! Tweet a
              screenshot of your masterpiece to{' '}
              <a
                className="underline font-semibold"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  'I just completed my Puzzlr cube challenge by @NearForm at the @AnitaB_org #GHC23!',
                )}`}
              >
                @NearForm
              </a>
              . Exciting prizes await the first 100 people to tweet a completed
              cube.
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={5} speed={1}>
          <div className="help-container-right p-4 items-center">
            <img src={logoNodeConf} className="max-w-60 w-full" />
          </div>
        </ParallaxLayer>
        <ParallaxLayer
          offset={5}
          onClick={() => {
            onClose();
          }}
        >
          <div className="help-container-left">
            <div className="gap-2 items-end">
              <div className="i-tabler-sparkles help-icon mr--2" />
              <div className="help-header">Join Us at NodeConf EU</div>
            </div>
            <div className="inline">
              Don&apos;t stop at the cube; there&apos;s more puzzling excitement
              waiting for you at{' '}
              <a className="underline font-semibold" href="https://nodeconf.eu">
                NodeConf EU
              </a>
              .
            </div>
            {/* <MissingPiece className="items-end text-right" /> */}
          </div>
        </ParallaxLayer>
      </Parallax>
      <div
        className={clsx(
          'absolute bottom-0 animate-bounce transition-opacity ease-out duration-800 pointer-events-none',
          showClose ? 'opacity-0' : 'opacity-100',
        )}
      >
        <div className="i-tabler-chevron-compact-down w-24 h-24" />
      </div>
      <div
        className={clsx(
          'absolute bottom-0 transition-opacity ease-out duration-800 pointer-events-none pb-1',
          showClose ? 'animate-wobble opacity-100' : 'opacity-0',
        )}
      >
        <div className="w-16 h-16 i-tabler-square-rounded-check" />
        <div className="w-16 text-center text-sm">click anywhere to close</div>
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
          <Canvas3D className="">
            <AssembledCube3D demo cubeRef={cubeRef} {...cubeLayout} />
          </Canvas3D>
        </Suspense>
      </div>
    </div>
  );
}

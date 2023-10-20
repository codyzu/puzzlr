import {useRef, lazy, useEffect, Suspense, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import clsx from 'clsx';
import {db} from './db';
import {isPieceColor, type PieceColor} from './piece-types';
import usePieceRefs from './use-piece-refs';
import Popover from './Popover';
import Header from './Header';
import NearFormLove from './NearFormLove';
import Inventory from './Inventory';
import HelpButton from './HelpButton';
import LevelIndicator from './LevelIndicator';
import ResetButton from './ResetButton';
import useCubeLayout from './use-cube-layout';
import MissingPiece from './MissingPiece';

const AssembledCube3D = lazy(async () => import('./AssembedCube3D'));
const RotatingPieces3D = lazy(async () => import('./RotatingPieces3D'));
const Canvas3D = lazy(async () => import('./Canvas3D'));
const HelpPage = lazy(async () => import('./HelpPage'));
const WinBanner = lazy(async () => import('./WinBanner'));

function App() {
  useEffect(() => {
    console.log(
      `%cPuzzlr - ${import.meta.env.VITE_EVENT_NAME}`,
      `font-size: 30px; font-family: Montserrat, "Open Sans", sans-serif;
      font-weight: 700; color: white; background-color: black;`,
    );
    console.log(
      `%cThanks for taking the time to look here.
It looks like you know what your doing. 👏

If you dig around enough, you can probably cheat this game. Honestly, that's your call, and we're proud of you.

Have you ever thought about working for a company like NearForm? Check us out on LinkedIn ( https://www.linkedin.com/company/nearform/ ) or stop by our booth at the conference to chat!`,
      `font-size: 16px; font-family: "Open Sans",ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
      color: #A0C539; background-color: black`,
    );
    console.log(`%c`, 'min-width: 500px');
  }, []);

  const [search, setSearch] = useSearchParams();
  const [message, setMessage] = useState('');
  const [imageSource, setImageSource] = useState('');
  const [help, setHelp] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('helpDone')) {
      setHelp(true);
    }
  }, []);

  // Test params: message=NearForm%20❤%EF%B8%8F%20node.js!&image=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fd%2Fd9%2FNode.js_logo.svg

  useEffect(() => {
    let cancel = false;

    let timeoutHandle: number | undefined = setTimeout(() => {
      timeoutHandle = undefined;
      if (cancel) {
        return;
      }

      if (search.has('p')) {
        console.log('adding', search.get('p'));
        const nextSearch = new URLSearchParams([...search.entries()]);
        nextSearch.delete('p');
        setSearch(nextSearch);

        if (isPieceColor(search.get('p'))) {
          void db.pieces.add({
            color: search.get('p') as PieceColor,
            added: new Date(),
          });
        }
      }

      if (search.has('m')) {
        setMessage(decodeURIComponent(search.get('m')!));
      }

      if (search.has('i')) {
        setImageSource(decodeURIComponent(search.get('i')!));
      }
    }, 0);

    return () => {
      cancel = true;
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
      }
    };
  }, [search, setSearch]);

  const cubeLayout = useCubeLayout(help);

  const cubeRef = useRef<HTMLDivElement>(null!);
  const pieceRefs = usePieceRefs();
  const controlsRef = useRef<HTMLDivElement>(null!);

  function onHelpClose() {
    setHelp(false);
    localStorage.setItem('helpDone', String(true));
  }

  if (help) {
    return (
      <HelpPage
        cubeLayout={cubeLayout}
        onClose={() => {
          onHelpClose();
        }}
      />
    );
  }

  if (cubeLayout.isComplete) {
    return <WinBanner cubeLayout={cubeLayout} />;
  }

  return (
    // TODO: is 100dvh fully compatible? Should there be a fallback?
    <div className="relative w-full min-h-[100dvh] touch-pan-y">
      <div className="relative w-full h-full flex-grow-1">
        <div ref={cubeRef} className="absolute w-full h-full top-0 left-0">
          <Suspense>
            <Canvas3D>
              <AssembledCube3D
                cubeRef={cubeRef}
                controlsRef={controlsRef}
                {...cubeLayout}
              />
            </Canvas3D>
          </Suspense>
        </div>
        <div className="relative w-full flex-grow-1 p-2 gap-1 items-stretch pointer-events-none">
          <Header />
          <div className="flex-row items-stretch gap-2 flex-grow-1">
            <div className="justify-start h-auto self-start">
              <Inventory pieceRefs={pieceRefs} />
            </div>
            <div className="flex-grow justify-end items-stretch">
              <HelpButton
                onClick={() => {
                  setHelp(true);
                }}
              />
              <div className="flex-grow-1 px-6 py-2 pointer-events-auto items-center">
                <div
                  ref={controlsRef}
                  className="pointer-events-auto flex-grow-1 w-[90%] max-w-screen-md"
                />
              </div>
            </div>
          </div>
          <div className="flex-row gap-2 w-full flex-wrap justify-center items-end">
            <div className="flex-row flex-grow-1 justify-center">
              <div className="flex-row items-stretch">
                <div className="info-container justify-center">
                  <LevelIndicator layerCount={cubeLayout.cube.length} />
                </div>
                <div className="justify-center">
                  <ResetButton />
                </div>
              </div>
            </div>
          </div>
        </div>
        <MissingPiece />
        <div className="px-2 py-2">
          <NearFormLove />
        </div>
      </div>
      <Suspense>
        <Canvas3D className="pointer-events-none">
          <RotatingPieces3D pieceRefs={pieceRefs} />
        </Canvas3D>
      </Suspense>
      <div
        className={clsx(
          !message && !imageSource && 'hidden',
          'absolute top-0 left-0 w-full h-full',
        )}
        onClick={() => {
          setMessage('');
          setImageSource('');
          const nextSearch = new URLSearchParams([...search.entries()]);
          nextSearch.delete('m');
          nextSearch.delete('i');
          setSearch(nextSearch);
        }}
      >
        <Popover message={message} imageSource={imageSource} />
      </div>
    </div>
  );
}

export default App;

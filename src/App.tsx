import {useRef, lazy, useEffect, Suspense, useState, useCallback} from 'react';
import {useSearchParams} from 'react-router-dom';
import clsx from 'clsx';
import {useLiveQuery} from 'dexie-react-hooks';
import logo from './assets/logo.png';
import {db} from './db';
import {isPieceColor, type PieceColor} from './piece-types';
import SingleShape from './SingleShapeDom';
import usePieceRefs from './use-piece-refs';
import Popover from './Popover';
import {pieceLayout, placedToCubeColorMap} from './piece-layout';

const AssembledCube3D = lazy(async () => import('./AssembedCube3D'));
const RotatingPieces3D = lazy(async () => import('./RotatingPieces3D'));
const Canvas3D = lazy(async () => import('./Canvas3D'));

const levelMessages = [
  'Noob, go find some QR codes to scan and start building your cube!',
  "Hey Rookie, you're getting the hang of this, but there's still work to do.",
  "You're almost there, keeping adding pieces so you can level up.",
  "We've found a master, complete the cube and collect your prize!",
];

function App() {
  useEffect(() => {
    console.log(
      '%cNodeConf EU 2023 - Scavenger Hunt',
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
  const [help, setHelp] = useState(0);

  const placedPieces = useLiveQuery(async () =>
    db.pieces.where('placement').aboveOrEqual(0).sortBy('placement'),
  );

  const [layerCount, setLayerCount] = useState(0);
  useEffect(() => {
    if (placedPieces === undefined) {
      return;
    }

    const laidOutPieces = pieceLayout(
      placedPieces?.map((piece) => piece.color) ?? [],
    );
    const cubeColorMap = placedToCubeColorMap(laidOutPieces);
    setLayerCount(cubeColorMap.length);
  }, [placedPieces]);

  useEffect(() => {
    if (!localStorage.getItem('helpDone')) {
      setHelp(1);
    }
  }, []);

  function advanceHelp() {
    const nextHelp = (help + 1) % 6;

    if (nextHelp === 0) {
      localStorage.setItem('helpDone', String(true));
    }

    setHelp(nextHelp);
  }

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

  const attemptPlacement = useCallback(async (pieceId: number) => {
    const piece = await db.pieces.get(pieceId);

    if (!piece) {
      return;
    }

    const placed = await db.pieces
      .where('placement')
      .aboveOrEqual(0)
      .sortBy('placement');

    const attempt = placed.map((placed) => placed.color);
    attempt.push(piece.color);

    const result = pieceLayout(attempt).flat();

    if (
      result.length > 0 &&
      result.length === attempt.length &&
      result.length === placed.length + 1
    ) {
      void db.pieces.update(pieceId, {
        placement: result.length - 1,
      });
    }
  }, []);

  const cubeRef = useRef<HTMLDivElement>(null!);
  const pieceRefs = usePieceRefs();

  const helpProps: {'data-help'?: number} = {};
  if (help) {
    helpProps['data-help'] = help;
  }

  return (
    // TODO: is 100dvh fully compatible? Should there be a fallback?
    <div {...helpProps} className="relative w-full min-h-[100dvh]">
      <div className="relative w-full h-full max-w-screen-sm flex-grow-1">
        <div ref={cubeRef} className="absolute w-full h-full top-0 left-0">
          <Suspense>
            <Canvas3D className="help-3:z-1">
              <AssembledCube3D cubeRef={cubeRef} />
            </Canvas3D>
          </Suspense>
        </div>
        <div className="relative w-full flex-grow-1 p-2 gap-4 items-stretch pointer-events-none">
          <div className="info-container self-center">
            <div className="flex-row gap-2 items-center">
              <img src={logo} className="logo" />
              <div className="font-heading text-3xl items-start font-bold">
                NodeConf EU 2023
              </div>
            </div>
            <div className="font-heading font-semibold">
              at the Lyrath Estate, Kilkenny, Ireland
            </div>
          </div>
          <div className="flex-row items-stretch gap-2 flex-grow-1">
            <div className="justify-start">
              <div className="relative gap-2 pointer-events-auto help-2:(help-border) help-3:(help-border)">
                <div className="highlight font-bold help:wizard-highlight">
                  Inventory
                </div>
                {Object.entries(pieceRefs).map(([color, ref]) => (
                  <SingleShape
                    key={color}
                    ref={ref}
                    color={color as PieceColor}
                    attemptPlacement={attemptPlacement}
                  />
                ))}
                <div className="wizard-container left-[100%] top-0 w-[calc(min(640px,100vw)_-_5rem_-_1rem)] help-2:(flex z-1)">
                  <div className="i-tabler-arrow-wave-left-up flex-shrink-0 w-20 h-20 wizard-highlight" />
                  <div className="items-start gap-3">
                    <div className="block">
                      Every time you scan a piece, it will be collected in your{' '}
                      <span className="wizard-highlight">inventory</span> here.
                    </div>
                    <div>
                      Remember, you can&apos;t scan the same piece twice in a
                      row. Instead, come back after scanning other pieces.
                    </div>
                    <div className="wizard-highlight">Click to continue...</div>
                  </div>
                </div>
                <div className="wizard-container left-[100%] top-0 w-[calc(min(640px,100vw)_-_5rem_-_1rem)] help-3:(flex z-1)">
                  <div className="i-tabler-arrow-wave-left-up w-20 h-20 wizard-highlight flex-shrink-0" />
                  <div className="items-start gap-3 rounded-lg wizard-overlay p-2 bg-opacity-85">
                    <div className="block">
                      Once you&apos;ve collected some pieces in your{' '}
                      <span className="wizard-highlight">inventory</span>, you
                      can start assembling your cube!
                    </div>
                    <div>
                      Click on the pieces in your inventory to add them to the
                      cube. You must complete a layer of the cube before
                      starting the next layer.
                    </div>
                    <div className="wizard-highlight">Click to continue...</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-grow justify-end items-stretch">
              <div className="flex-row justify-end">
                <button
                  type="button"
                  className="highlight self-start relative help-5:(help-border wizard-highlight) w-20 pointer-events-auto"
                  onClick={() => {
                    setHelp(1);
                  }}
                >
                  <div className="i-tabler-help h-8 w-8" />
                  <div className="text-sm">help</div>
                  <div className="wizard-container top-[100%] right-0 w-[calc(min(640px,100vw)_-_1rem)] help-5:(flex z-1)">
                    <div className="items-end text-right gap-4">
                      <div className="i-tabler-arrow-wave-right-down w-20 h-20 wizard-highlight flex-shrink-0 rotate-270" />
                      <div className="font-bold wizard-highlight text-lg">
                        Help
                      </div>
                      <div>
                        You can re-start this tutorial at any time by clicking
                        the help button.
                      </div>
                      <div>Thanks for playing and good luck!</div>
                      <div className="wizard-highlight">
                        Click to start playing...
                      </div>
                    </div>
                  </div>
                </button>
              </div>
              <div className="flex-grow-1" />
              <div className="flex-row gap-2 items-stretch">
                <div className="info-container justify-center">
                  <div className="">
                    Level {layerCount}: {levelMessages[layerCount - 1]}
                  </div>
                </div>
                <button
                  className="btn pointer-events-auto self-center relative help-4:(z-1 help-border)"
                  type="button"
                  onClick={() => {
                    void db.pieces
                      .toCollection()
                      .modify({placement: undefined});
                  }}
                >
                  reset
                  <div className="wizard-container bottom-[100%] right-0 w-[calc(min(640px,100vw)_-_1rem)] help-4:(flex z-1)">
                    <div className="items-end text-right gap-4">
                      <div className="font-bold wizard-highlight text-lg">
                        Reset
                      </div>
                      <div className="block">
                        You can always click the{' '}
                        <span className="wizard-highlight">reset</span> button
                        to dissemble your cube and return all of the pieces to
                        your inventory and restart building your cube!
                      </div>
                      <div className="wizard-highlight">
                        Click to continue...
                      </div>
                      <div className="i-tabler-arrow-wave-right-down w-20 h-20 wizard-highlight flex-shrink-0 rotate-90" />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Suspense>
        <Canvas3D className="pointer-events-none help-2:z-1 help-3:z-1">
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
      {help ? (
        <div
          className="absolute top-0 left-0 w-full h-full p-4 wizard"
          onClick={() => {
            advanceHelp();
          }}
        >
          <div className="text-lg font-bold">Cubework Tutorial</div>
          <div className="text-sm italic">click to advance</div>
          <div className="flex-row gap-2 mt-4">
            {Array.from({length: 5}).map((_, index) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index + 1}
                className={clsx(
                  help === index + 1
                    ? 'i-tabler-circle-filled wizard-highlight'
                    : 'i-tabler-circle',
                  'w-3 h-3',
                )}
              />
            ))}
          </div>
          <div className="hidden help-1:flex text-center mt-4 max-w-screen-sm gap-2">
            <div className="font-bold">Welcome to Cubework!</div>
            <div>
              Keep an eye out during the conference for QR codes that add pieces
              to complete the cube.
            </div>
            <div>The goal is to collect pieces to fill the cube.</div>
            <div className="wizard-highlight">Click to continue...</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;

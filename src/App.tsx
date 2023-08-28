import {useRef, lazy, useEffect, Suspense, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import clsx from 'clsx';
import logo from './assets/logo.png';
import {db} from './db';
import {isPieceColor, type PieceColor} from './piece-types';
import SingleShape from './SingleShapeDom';
import usePieceRefs from './use-piece-refs';
import Popover from './Popover';

const AssembledCube3D = lazy(async () => import('./AssembedCube3D'));
const RotatingPieces3D = lazy(async () => import('./RotatingPieces3D'));
const Canvas3D = lazy(async () => import('./Canvas3D'));

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
        console.log('skip');
        return;
      }

      if (search.has('add')) {
        console.log('adding', search.get('add'));
        const nextSearch = new URLSearchParams([...search.entries()]);
        nextSearch.delete('add');
        setSearch(nextSearch);

        if (isPieceColor(search.get('add'))) {
          void db.pieces.add({
            color: search.get('add') as PieceColor,
            added: new Date(),
          });
        }
      }

      if (search.has('message')) {
        console.log('showing', search.get('message'));
        setMessage(decodeURIComponent(search.get('message')!));
      }

      if (search.has('image')) {
        setImageSource(decodeURIComponent(search.get('image')!));
      }
    }, 0);

    return () => {
      cancel = true;
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
      }
    };
  }, [search, setSearch]);

  const cubeRef = useRef<HTMLDivElement>(null!);
  const pieceRefs = usePieceRefs();

  const helpProps: {'data-help'?: number} = {};
  if (help) {
    helpProps['data-help'] = help;
  }

  return (
    <div {...helpProps} className="relative w-full min-h-screen">
      <div className="relative w-full min-h-screen max-w-screen-sm">
        <div ref={cubeRef} className="absolute w-full h-full top-0 left-0">
          <Canvas3D className="help-3:z-1">
            <AssembledCube3D cubeRef={cubeRef} />
          </Canvas3D>
        </div>
        <div className="relative w-full min-h-screen p-2 gap-4 items-stretch pointer-events-none">
          <div className="bg-black bg-opacity-70 self-center rounded-lg p-3  shadow-white pointer-events-auto">
            <div className="flex-row gap-2">
              <img src={logo} className="h-10 w-auto" />
              <div className="font-heading text-3xl font-700">
                NodeConf EU 2023
              </div>
            </div>
            <div className="font-heading font-600">
              at the Lyrath Estate, Kilkenny, Ireland
            </div>
          </div>
          <div className="flex-row items-stretch gap-2">
            <div className="relative gap-2 pointer-events-auto help-2:(help-border) help-3:(help-border)">
              <div className="pink font-700">Inventory</div>
              {Object.entries(pieceRefs).map(([color, ref]) => (
                <SingleShape
                  key={color}
                  ref={ref}
                  color={color as PieceColor}
                />
              ))}
              <div
                className={clsx(
                  'absolute hidden left-[100%] top-0 hidden w-[calc(min(640px,100vw)_-_5rem_-_1rem)] p-4 flex-row justify-start items-start pointer-events-none gap-2 help-2:(flex z-1)',
                )}
              >
                <div className="i-tabler-arrow-wave-left-up flex-shrink-0 w-20 h-20 pink" />
                <div className="items-start gap-3">
                  <div className="block">
                    Every time you scan a piece, it will be collected in your{' '}
                    <span className="pink">inventory</span> here.
                  </div>
                  <div>
                    Remember, you can&apos;t scan the same piece twice in a row.
                    Instead, come back after scanning other pieces.
                  </div>
                  <div className="pink">Click to continue...</div>
                </div>
              </div>
              <div
                className={clsx(
                  'absolute hidden left-[100%] top-0 hidden w-[calc(min(640px,100vw)_-_5rem_-_1rem)] p-4 flex-row justify-start items-start pointer-events-none gap-2 help-3:(flex z-1)',
                )}
              >
                <div className="i-tabler-arrow-wave-left-up w-20 h-20 pink flex-shrink-0" />
                <div className="items-start gap-3">
                  <div className="items-start gap-3 rounded-lg bg-gray-800 p-2 bg-opacity-85">
                    <div className="block">
                      Once you&apos;ve collected some pieces in your{' '}
                      <span className="pink">inventory</span>, you can start
                      assembling your cube!
                    </div>
                    <div>
                      Click on the pieces in your inventory to add them to the
                      cube. You must complete a layer of the cube before
                      starting the next layer.
                    </div>
                    <div className="pink">Click to continue...</div>
                  </div>
                  {/* <div className="i-tabler-arrow-wave-right-up rotate-90 w-20 h-20 pink" /> */}
                </div>
              </div>
            </div>
            <div className="flex-grow justify-end items-stretch">
              <div className="flex-row justify-end">
                <button
                  type="button"
                  // ClassName="pink help-1:(z-1 border-pink border-3 rounded-lg) relative after:(absolute top-0 left-[100%] content-['hello'] w-10 h-10 bg-red)"
                  className="pink self-start relative help-5:(help-border) w-20 pointer-events-auto"
                  onClick={() => {
                    setHelp(1);
                  }}
                >
                  <div className="i-tabler-help h-8 w-8" />
                  <div className="text-sm">help</div>
                  <div
                    className={clsx(
                      'absolute hidden top-[100%] right-0 hidden w-[calc(min(640px,100vw)_-_1rem)] p-4 flex-row justify-end items-start pointer-events-none gap-2 help-5:(flex z-1) text-white',
                    )}
                  >
                    <div className="items-end text-right gap-4">
                      <div className="i-tabler-arrow-wave-right-down w-20 h-20 pink flex-shrink-0 rotate-270" />
                      <div className="font-700 pink text-lg">Help</div>
                      <div>
                        You can re-start this tutorial at any time by clicking
                        the help button.
                      </div>
                      <div>Thanks for playing and good luck!</div>
                      <div className="pink">Click to continue...</div>
                    </div>
                  </div>
                </button>
              </div>
              <div className="flex-grow-1" />
              <div className="flex-row gap-2 items-stretch">
                <div className="bg-black bg-opacity-70 rounded-lg p-3 pointer-events-auto justify-center">
                  <div className="">You&apos;re current at level 0.</div>
                </div>
                <button
                  className="btn pointer-events-auto self-center relative help-4:(z-1)"
                  type="button"
                >
                  reset
                  <div
                    className={clsx(
                      'absolute hidden bottom-[100%] right-0 hidden w-[calc(min(640px,100vw)_-_1rem)] p-4 flex-row justify-end items-start pointer-events-none gap-2 help-4:(flex z-1) text-white case-normal font-400 tracking-normal font-sans text-base',
                    )}
                  >
                    <div className="items-end text-right gap-4">
                      <div className="font-700 pink text-lg">Reset</div>
                      <div className="block">
                        You can always click the{' '}
                        <span className="pink">reset</span> button to dissemble
                        your cube and return all of the pieces to your inventory
                        and restart building your cube!
                      </div>
                      <div className="pink">Click to continue...</div>
                      <div className="i-tabler-arrow-wave-right-down w-20 h-20 pink flex-shrink-0 rotate-90" />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="items-start self-start pointer-events-auto">
            <div className="items-stretch">
              <div className="gap-2">
                <div className="flex-row relative" />
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
          nextSearch.delete('message');
          nextSearch.delete('image');
          setSearch(nextSearch);
        }}
      >
        <Popover message={message} imageSource={imageSource} />
      </div>
      {help ? (
        <div
          className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-95 p-4"
          onClick={() => {
            advanceHelp();
          }}
        >
          <div className="text-lg font-700">Cubework Tutorial</div>
          <div className="text-sm italic">click to advance</div>
          <div className="flex-row gap-2 mt-4">
            {Array.from({length: 5}).map((_, index) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index + 1}
                className={clsx(
                  help === index + 1
                    ? 'i-tabler-circle-filled pink'
                    : 'i-tabler-circle',
                  'w-3 h-3',
                )}
              />
            ))}
          </div>
          <div className="hidden help-1:flex text-center mt-4 max-w-screen-sm gap-2">
            <div className="font-700">Welcome to Cubework!</div>
            <div>
              Keep an eye out during the conference for QR codes that add pieces
              to complete the cube.
            </div>
            <div>The goal is to collect pieces to fill the cube.</div>
            <div className="pink">Click to continue...</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;

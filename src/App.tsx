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
  const [help, setHelp] = useState(1);

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
      <div className="relative w-full max-w-screen-sm">
        <div ref={cubeRef} className="absolute w-full h-full top-0 left-0">
          <Canvas3D className="">
            <AssembledCube3D cubeRef={cubeRef} />
          </Canvas3D>
        </div>
        <div className="relative gap-4 p-2 w-full pointer-events-none">
          <div className="bg-black self-center rounded-lg p-3 shadow-md shadow-white pointer-events-auto">
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
          <div className="relative items-start self-start pointer-events-auto">
            <div className="items-stretch">
              <div
                // ClassName="pink help-1:(z-1 border-pink border-3 rounded-lg) relative after:(absolute top-0 left-[100%] content-['hello'] w-10 h-10 bg-red)"
                className="pink help-3:(help-border)"
                onClick={() => {
                  setHelp(1);
                }}
              >
                <div className="i-tabler-help h-8 w-8" />
                <div className="text-sm">help</div>
              </div>
              <div className="gap-2">
                <div className="flex-row relative">
                  <div
                    className={clsx(
                      'absolute hidden left-[100%] top-0 hidden w-200 p-4 flex-row justify-start items-center pointer-events-none gap-2 help-3:(flex visible z-1)',
                    )}
                  >
                    <div className="i-tabler-arrow-wave-left-up w-12 h-12 pink" />
                    <div className="items-start">
                      <div className="font-700 pink">Help</div>
                      <div>
                        You can re-start this tutorial at any time by clicking
                        the help button.
                        <br />
                        Thanks for playing and good luck!
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gap-2 relative z-2 help-2:(help-border)">
                  {Object.entries(pieceRefs).map(([color, ref]) => (
                    <SingleShape
                      key={color}
                      ref={ref}
                      color={color as PieceColor}
                    />
                  ))}
                  <div
                    className={clsx(
                      'absolute hidden left-[100%] top-0 hidden w-200 p-4 flex-row justify-start items-center pointer-events-none gap-2 help-2:(flex visible z-1)',
                    )}
                  >
                    <div className="i-tabler-arrow-wave-left-up w-12 h-12 pink" />
                    <div className="items-start">
                      <div className="font-700 pink">Inventory</div>
                      <div>
                        Every time you scan a piece, it will be collected here.
                        <br />
                        Remember, you can&apos;t scan the same piece twice in a
                        row.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="prose pointer-events-auto bg-black p-3 rounded-lg shadow-white shadow-md">
            Find the pieces to complete the cube
          </div>
        </div>
      </div>
      <Suspense>
        <Canvas3D className="pointer-events-none z-2">
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
            setHelp((help) => (help + 1) % 4);
          }}
        >
          <div className="text-lg font-700">Cubework Tutorial</div>
          <div className="text-sm italic">click to advance</div>
          <div className="flex-row gap-2 mt-4">
            <div
              className={clsx(
                help === 1 ? 'i-tabler-circle-filled pink' : 'i-tabler-circle',
                'w-3 h-3',
              )}
            />
            <div
              className={clsx(
                help === 2 ? 'i-tabler-circle-filled pink' : 'i-tabler-circle',
                'w-3 h-3',
              )}
            />
            <div
              className={clsx(
                help === 3 ? 'i-tabler-circle-filled pink' : 'i-tabler-circle',
                'w-3 h-3',
              )}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;

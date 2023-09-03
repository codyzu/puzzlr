import QRCode from 'react-qr-code';
import {Fragment, useEffect, useState} from 'react';
import Canvas3D from './Canvas3D';
import usePieceRefs from './use-piece-refs';
import Generator from './Generator';
import RotatingPieces3D from './RotatingPieces3D';
import FixedPiece3D from './FixedPiece3D';

export default function Admin() {
  const pieceRefs = usePieceRefs();
  useEffect(() => {
    document.title = 'Cubework secret admin interface';
  }, []);
  const [takeSnapshot, setTakeSnapshot] = useState<() => string>(() => '');

  return (
    <>
      <div className="max-w-screen-sm w-full">
        <Generator />
      </div>
      <div>Quick examples:</div>
      <div className="h-full grid grid-cols-[auto_auto] lt-sm:grid-cols-1 gap-x-4 gap-y-8 lt-sm:gap-y-4 justify-items-center my-6">
        {Object.entries(pieceRefs).map(([color, ref]) => {
          const url = `${window.location.origin}${
            import.meta.env.BASE_URL
          }?p=${color}`;
          return (
            <Fragment key={color}>
              <div className="h-full lt-sm:w-auto lt-sm:w-full shape-container p-2 lt-sm:mb-0 justify-center">
                <div ref={ref} className="w-20 h-20" />
                <a className="underline" href={url}>
                  Add {color}
                </a>
              </div>
              <div className="w-200px h-200px bg-white p-2 lt-sm:mb-10">
                {/* @ts-expect-error title is used but not defined in the libraries typings */}
                <QRCode value={url} title={`${color} piece`} />
              </div>
            </Fragment>
          );
        })}
        <div>
          <FixedPiece3D
            setTakeSnapshot={setTakeSnapshot}
            color="pink"
            rotation={[Math.PI / 12, Math.PI / 3.8, Math.PI / 12]}
          />
          <button
            type="button"
            onClick={() => {
              const data = takeSnapshot();
              console.log('data', data);
            }}
          >
            snapshot
          </button>
        </div>
      </div>
      <Canvas3D className="pointer-events-none">
        <RotatingPieces3D pieceRefs={pieceRefs} />
      </Canvas3D>
    </>
  );
}

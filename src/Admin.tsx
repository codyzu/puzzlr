import QRCode from 'react-qr-code';
import {Fragment} from 'react';
import Canvas3D from './Canvas3D';
import {Shapes3D} from './Shapes3D';
import usePieceRefs from './use-piece-refs';

export default function Admin() {
  const pieceRefs = usePieceRefs();
  return (
    <>
      <div className="h-full grid grid-cols-[auto_auto] lt-sm:grid-cols-1 gap-x-4 gap-y-8 lt-sm:gap-y-4 justify-items-center mt-6">
        {Object.entries(pieceRefs).map(([color, ref]) => {
          const url = `${window.location.origin}${
            import.meta.env.BASE_URL
          }?add=${color}`;
          return (
            <Fragment key={color}>
              <div className="prose h-full lt-sm:w-auto lt-sm:w-full rounded-lg bg-gray-800 p-2 lt-sm:mb-0">
                <div ref={ref} className="w-20 h-20" />
                <a href={url}>Add {color}</a>
              </div>
              <div className="w-200px h-200px bg-white p-2 lt-sm:mb-10">
                <QRCode value={url} />
              </div>
            </Fragment>
          );
        })}
      </div>
      <Canvas3D>
        <Shapes3D pieceRefs={pieceRefs} />
      </Canvas3D>
    </>
  );
}

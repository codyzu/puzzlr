import {forwardRef} from 'react';
import {useLiveQuery} from 'dexie-react-hooks';
import {type PieceColor} from './piece-types';
import {db} from './db';

const SingleShape = forwardRef<HTMLDivElement, {color: PieceColor}>(function (
  {color},
  ref,
) {
  const existingPieces = useLiveQuery(
    async () => db.pieces.where('color').equals(color).count(),
    [color],
  );

  return (
    <div
      className="bg-gray-800 rounded-lg bg-opacity-80"
      onClick={() => {
        void db.pieces.add({color, added: new Date()});
      }}
    >
      <div ref={ref} className="w-20 h-20" />
      count {existingPieces}
    </div>
  );
});

export default SingleShape;

import {forwardRef} from 'react';
import {useLiveQuery} from 'dexie-react-hooks';
import {type PieceColor} from './piece-types';
import {db} from './db';

const SingleShape = forwardRef<
  HTMLDivElement,
  {
    color: PieceColor;
    attemptPlacement: (pieceIndex: number) => void;
  }
>(function ({color, attemptPlacement}, ref) {
  const existingPieces = useLiveQuery(
    async () =>
      db.pieces
        .where('color')
        .equals(color)
        .and((piece) => piece.placement === undefined)
        .sortBy('id'),
    [color],
  );

  return (
    <div
      className="bg-gray-800 rounded-lg bg-opacity-80"
      onClick={() => {
        if (
          existingPieces &&
          existingPieces.length > 0 &&
          existingPieces[0].id
        ) {
          attemptPlacement(existingPieces[0].id);
        }
      }}
    >
      <div ref={ref} className="w-20 h-20" />
      count {existingPieces?.length ?? 0}
    </div>
  );
});

export default SingleShape;

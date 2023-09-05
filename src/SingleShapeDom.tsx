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
    <button
      className="shape-container"
      type="button"
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
      <div className="text-sm">count: {existingPieces?.length ?? 0}</div>
    </button>
  );
});

export default SingleShape;

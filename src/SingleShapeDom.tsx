import {forwardRef, useEffect, useRef, useState} from 'react';
import {useLiveQuery} from 'dexie-react-hooks';
import clsx from 'clsx';
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

  const count = existingPieces?.length;
  const [shake, setShake] = useState(false);

  const previousCount = useRef<number | undefined>(count);

  useEffect(() => {
    if (previousCount.current !== undefined) {
      setShake(true);
    }

    previousCount.current = count;
  }, [count]);

  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={buttonRef}
      className={clsx(
        'shape-container',
        shake && 'animate-shake-x important-animate-[shake-x_0.6s_linear_1]',
      )}
      type="button"
      onAnimationEnd={() => {
        setShake(false);
      }}
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

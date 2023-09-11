import {useCallback} from 'react';
import SingleShape from './SingleShapeDom';
import {type PieceColor} from './piece-types';
import {db} from './db';
import {pieceLayout} from './piece-layout';

export default function Inventory({
  pieceRefs,
}: {
  pieceRefs: {[key in PieceColor]: React.MutableRefObject<HTMLDivElement>};
}) {
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

  return (
    <div className="gap-2 lt-sm:gap-1 pointer-events-auto">
      <div className="highlight font-bold text-sm">Inventory</div>
      {Object.entries(pieceRefs).map(([color, ref]) => (
        <SingleShape
          key={color}
          ref={ref}
          color={color as PieceColor}
          attemptPlacement={attemptPlacement}
        />
      ))}
    </div>
  );
}

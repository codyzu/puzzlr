import {useLiveQuery} from 'dexie-react-hooks';
import {useEffect, useState} from 'react';
import {db} from './db';
import {
  type PlacedPiece,
  pieceLayout,
  placedToCubeColorMap,
  type CubeColorMap,
  cubeLength,
} from './piece-layout';
import {type PieceColor} from './piece-types';

const colorWeights: Array<[PieceColor, number]> = [
  ['pink', 0.15],
  ['orange', 0.3],
  ['green', 0.5],
  ['blue', 0.75],
  ['purple', 1],
];

export type CubeLayout = {
  cube: CubeColorMap;
  isComplete: boolean;
};

export default function useCubeLayout(demo?: boolean): CubeLayout {
  const placedPieces = useLiveQuery(async () =>
    db.pieces.where('placement').aboveOrEqual(0).sortBy('placement'),
  );

  const [isComplete, setIsComplete] = useState(false);
  const [cube, setCube] = useState<CubeColorMap>([[]]);

  useEffect(() => {
    if (placedPieces === undefined) {
      return;
    }

    const laidOutPieces = pieceLayout(
      (demo ? generateRandomCubePieces() : placedPieces)?.map(
        (piece) => piece.color,
      ) ?? [],
    );
    const cubeColorMap = placedToCubeColorMap(laidOutPieces);

    // Determine if the cube is complete by checking that every point is defined
    const nextIsComplete =
      cubeColorMap.length === cubeLength &&
      cubeColorMap.every((layer) => layer.flat().every(Boolean));
    setIsComplete(nextIsComplete);

    if (nextIsComplete) {
      for (const point of cubeColorMap.flat(2)) {
        point!.highlight = true;
      }
    }

    setCube(cubeColorMap);
  }, [placedPieces, demo]);

  return {cube, isComplete};
}

function generateRandomCubePieces() {
  const pieces: Array<{color: PieceColor}> = [];

  function isComplete(laidOutPieces: PlacedPiece[][]) {
    const cubeColorMap = placedToCubeColorMap(laidOutPieces);

    // Determine if the cube is complete by checking that every point is defined
    const nextIsComplete =
      cubeColorMap.length === cubeLength &&
      cubeColorMap.every((layer) => layer.flat().every(Boolean));

    return nextIsComplete;
  }

  function tryPiece() {
    const randomColor = colorWeights.find(
      ([_, maxWeight]) => Math.random() <= maxWeight,
    )?.[0];

    const piece = {
      color: randomColor ?? 'purple',
    };

    const attemptedPieces = [...pieces, piece];
    const laidOutPieces = pieceLayout(
      attemptedPieces.map((piece) => piece.color),
    );

    if (laidOutPieces.flat(2).length === pieces.length + 1) {
      pieces.push(piece);
    }

    return laidOutPieces;
  }

  let laidOutPieces: PlacedPiece[][] = [[]];
  while (!isComplete(laidOutPieces)) {
    laidOutPieces = tryPiece();
    pieces.push();
  }

  return pieces;
}

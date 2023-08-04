import {pieceMaps} from './GenricPieces';
import {type PieceColor, type Piece2D} from './piece-types';

type PieceMeta = {
  index: number;
  color: PieceColor;
  piece: Piece2D;
  weight: number;
};

export type PlacedPiece = PieceMeta & {
  rotation: number;
  x: number;
  y: number;
};

export function pieceLayout(pieces: PieceColor[]) {
  const piecesToPlace = pieces.map((color, index) => ({
    index,
    color,
    piece: pieceMaps[color],
    weight: pieceMaps[color].flat().filter(Boolean).length,
  }));
  if (piecesToPlace.length === 0) {
    return [];
  }

  const placedPieces: PlacedPiece[] = [];

  let layer = Array.from({length: 4}).map(() =>
    Array.from({length: 4}).map(() => 0),
  );

  for (const piece of piecesToPlace) {
    const positions = Array.from({length: 4 * 4}).map((_, index) => index);

    let placed = false;

    for (const positionIndex of positions) {
      const x = positionIndex % 4;
      const y = Math.floor(positionIndex / 4);

      const rotations = Array.from({length: 4}).map((_, index) => index);

      for (const rotation of rotations) {
        const rotated = rotateMatrixTimes(piece.piece, rotation);
        const tryResult = replaceMatrix(layer, rotated, x, y);

        if (
          matrixCount(tryResult) ===
          matrixCount(layer) + matrixCount(piece.piece)
        ) {
          placedPieces.push({...piece, x, y, rotation});
          placed = true;
          layer = tryResult;
          break;
        }
      }

      if (placed) {
        break;
      }
    }

    if (matrixIsComplete(layer)) {
      break;
    }

    if (!placed) {
      console.log('skipped', piece);
    }
  }

  console.log('layer done', {layer, placedPieces});

  return placedPieces;
}

export function placedToColorMap(pieces: PlacedPiece[]) {
  const layer: Array<Array<undefined | PieceColor>> = Array.from({
    length: 4,
  }).map(() => Array.from({length: 4}).map(() => undefined));

  for (const piece of pieces) {
    const rotatedPieceMap = rotateMatrixTimes(piece.piece, piece.rotation);
    for (const [yIndex, element] of rotatedPieceMap.entries()) {
      for (const [xIndex, element_] of element.entries()) {
        const yDest = piece.y + yIndex;
        const xDest = piece.x + xIndex;
        if (element_ === 1) {
          layer[yDest][xDest] = piece.color;
        }
      }
    }
  }

  return layer;
}

function matrixCount(matrix: number[][]) {
  return matrix.flat().filter((v) => v === 1).length;
}

function matrixIsComplete(matrix: number[][]) {
  return matrixCount(matrix) === matrix.flat().length;
}

function rotateMatrix(matrix: number[][]) {
  return matrix.map((row, yIndex) =>
    row.map((_, xIndex) => {
      const fromX = row.length - 1 - yIndex;
      const fromY = xIndex;
      return matrix[fromY][fromX];
    }),
  );
}

function rotateMatrixTimes(matrix: number[][], times: number) {
  let rotated: number[][] = matrix;

  for (let count = 0; count < times; count++) {
    rotated = rotateMatrix(rotated);
  }

  return rotated;
}

function replaceMatrix(
  source: number[][],
  submatrix: number[][],
  x: number,
  y: number,
) {
  return source.map((row, sourceY) =>
    row.map((value, sourceX) => {
      if (
        sourceX >= x &&
        sourceX < x + submatrix[0].length &&
        sourceY >= y &&
        sourceY < y + submatrix.length
      ) {
        const submatrixValue = submatrix[sourceY - y][sourceX - x];

        if (submatrixValue === 1) {
          return 1;
        }
      }

      return value;
    }),
  );
}
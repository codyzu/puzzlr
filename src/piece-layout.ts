import {create, all} from 'mathjs';
import {pieceMaps} from './GenricPieces';
import {type PieceColor, type Piece2D} from './piece-types';

const math = create(all, {});

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

type MatrixValue = 0 | PieceMeta;

export function pieceLayout(pieces: PieceColor[]) {
  // Const pieceObjs = Object.entries(pieces).flatMap(
  //   ([color, count], colorIndex) =>
  //     Array.from({length: count}).map((_, pieceIndex) => {
  //       const piece = pieceMaps[color as PieceColor];
  //       const pieceMeta: PieceMeta = {
  //         index: colorIndex * 5 + pieceIndex,
  //         color: color as PieceColor,
  //         piece,
  //         weight: piece.flat().filter(Boolean).length,
  //       };
  //       return pieceMeta;
  //     }),
  // );

  const piecesToPlace = pieces.map((color, index) => ({
    index,
    color,
    piece: pieceMaps[color],
    weight: pieceMaps[color].flat().filter(Boolean).length,
  }));
  // Const randomizeByWeight = pieceObjs;
  // .sort((a, b) => b.weight - a.weight);

  // const pieceMap = new Map<number, PieceMeta[]>();

  // for (const piece of pieceObjs) {
  //   const forWeight = [...(pieceMap.get(piece.weight) ?? []), piece];
  //   pieceMap.set(piece.weight, forWeight);
  // }

  // const randomizeByWeight = [...pieceMap.entries()].flatMap(([_, pieces]) =>
  //   pieces.sort(() => (Math.random() > 0.5 ? 1 : -1)),
  // );

  // console.log('pieceObjs', randomizeByWeight);

  // Const acceptedPieces: PieceMeta[] = [];
  // // Const piecesWithIds = pieces.map((piece, index) => ({index, piece}));
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

// Function toBinaryMatrix(matrix: MatrixValue[][]) {
//   return matrix.map((row) => row.map((value) => (value === 0 ? 0 : 1)));
// }

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
  return math.map(source, (value, [currentY, currentX]) => {
    // Check if the submatrix indexes are in the currentindex
    if (
      currentX >= x &&
      currentX < x + submatrix[0].length &&
      currentY >= y &&
      currentY < y + submatrix.length &&
      submatrix[currentY - y][currentX - x] === 1
    ) {
      return submatrix[currentY - y][currentX - x];
    }

    return value;
  });
}

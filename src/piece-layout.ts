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
  highlight: boolean;
};

export type LayerPoint = {
  color: PieceColor;
  highlight: boolean;
};

export type LayerColorMap = Array<Array<undefined | LayerPoint>>;

export type CubeColorMap = LayerColorMap[];

export const cubeLength = 3;

export function pieceLayout(pieces: PieceColor[]): PlacedPiece[][] {
  let remainingPieces: PieceMeta[] = pieces.map((color, index) => ({
    index,
    color,
    piece: pieceMaps[color],
    weight: pieceMaps[color].flat().filter(Boolean).length,
  }));

  const lastPiece = remainingPieces.at(-1);

  const layers: PlacedPiece[][] = [];

  // Layout layer by layer
  for (let i = 0; i < cubeLength; i++) {
    const layerPlaced = layoutLayer(remainingPieces, lastPiece!);
    remainingPieces = remainingPieces.filter(
      (piece) =>
        !layerPlaced.some((layerPiece) => layerPiece.index === piece.index),
    );
    layers.push(layerPlaced);

    // Stop laying out if the current layer is not complete
    if (!placedToColorMap(layerPlaced).flat().every(Boolean)) {
      break;
    }

    // Stop laying out if there are no more pieces
    if (remainingPieces.length === 0) {
      break;
    }
  }

  return layers;
}

export function placedToCubeColorMap(
  placedPieces: PlacedPiece[][],
): CubeColorMap {
  // No pieces, return an empty cube that will be wire-framed
  if (placedPieces.flat().length === 0) {
    return Array.from({length: cubeLength}).map(() => emptyLayer(undefined));
  }

  const layerMaps = placedPieces.map((layer) => placedToColorMap(layer));

  // Push an empty layer (that will be wire-framed) if the last layer was complete
  if (
    layerMaps.length < cubeLength &&
    layerMaps.at(-1)!.flat().every(Boolean)
  ) {
    layerMaps.push(emptyLayer(undefined));
  }

  return layerMaps;
}

function layoutLayer(availablePieces: PieceMeta[], lastPiece: PieceMeta) {
  // The longest edge of a piece is 3. In order to try all possible position, start testing at -2
  const possiblePositionCount = cubeLength + 2;
  const placedPieces: PlacedPiece[] = [];

  let layer = emptyLayer(0);

  for (const piece of availablePieces) {
    const positions = Array.from({length: possiblePositionCount ** 2}).map(
      (_, index) => index,
    );

    let placed = false;

    for (const positionIndex of positions) {
      const x = (positionIndex % possiblePositionCount) - 2;
      const y = Math.floor(positionIndex / possiblePositionCount) - 2;

      const rotations = Array.from({length: 360 / 90}).map((_, index) => index);

      for (const rotation of rotations) {
        const rotated = rotateMatrixTimes(piece.piece, rotation);
        const tryResult = replaceMatrix(layer, rotated, x, y);

        if (
          matrixCount(tryResult) ===
          matrixCount(layer) + matrixCount(piece.piece)
        ) {
          placedPieces.push({
            ...piece,
            x,
            y,
            rotation,
            highlight: piece === lastPiece,
          });
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
      // SKIPPED piece
    }
  }

  return placedPieces;
}

function placedToColorMap(pieces: PlacedPiece[]) {
  const layer: LayerColorMap = emptyLayer(undefined);

  for (const piece of pieces) {
    const rotatedPieceMap = rotateMatrixTimes(piece.piece, piece.rotation);
    for (const [yIndex, row] of rotatedPieceMap.entries()) {
      for (const [xIndex, point] of row.entries()) {
        const yDest = piece.y + yIndex;
        const xDest = piece.x + xIndex;
        if (point === 1) {
          layer[yDest][xDest] = {
            color: piece.color,
            highlight: piece.highlight,
          };
        }
      }
    }
  }

  return layer;
}

function emptyLayer<T>(value: T): T[][] {
  return Array.from({
    length: cubeLength,
  }).map(() => Array.from({length: cubeLength}).map(() => value));
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
        const submatrixValue = submatrix[sourceY - y]?.[sourceX - x];

        if (submatrixValue === 1) {
          return 1;
        }
      }

      return value;
    }),
  );
}

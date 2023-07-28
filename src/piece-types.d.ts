export type Point = 0 | 1;
export type Piece1D = [Point, Point, Point];
export type Piece2D = [Piece1D, Piece1D, Piece1D];

const allPieceColors = ['purple', 'green', 'pink', 'orange', 'blue'] as const;
type PieceColorTuple = typeof allPieceColors;
export type PieceColor = PieceColorTuple[number];

export type PieceRow = {
  id?: number;
  color: PieceColor;
  added: Date;
};

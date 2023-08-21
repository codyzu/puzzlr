import WireframeSegment3D from './WireframeSegement3D';
import {pieceColorValues} from './GenricPieces';
import Segment3D from './Segment3D';
import {type LayerPoint} from './piece-layout';
import {type PieceColor} from './piece-types';

export default function CubeLayer3D({
  layer,
  z,
}: {
  layer: Array<Array<undefined | LayerPoint>>;
  z: number;
}) {
  return (
    <>
      {layer.map((row, yIndex) =>
        row.map((point, xIndex) =>
          point ? (
            <Segment3D
              // eslint-disable-next-line react/no-array-index-key
              key={`cube-${yIndex}-${xIndex}`}
              color={pieceColorValues[point.color] as PieceColor}
              highlight={point.highlight}
              x={xIndex}
              y={yIndex}
              z={z}
            />
          ) : (
            <WireframeSegment3D
              // eslint-disable-next-line react/no-array-index-key
              key={`cube-${yIndex}-${xIndex}`}
              x={xIndex}
              y={yIndex}
              z={z}
            />
          ),
        ),
      )}
    </>
  );
}

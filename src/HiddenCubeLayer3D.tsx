import HiddenSegment3D from './HiddenSegement3D';
import {cubeLength} from './piece-layout';

export default function HiddenCubeLayer3D({z}: {z: number}) {
  return (
    <>
      {Array.from({length: cubeLength}).map((_, yIndex) =>
        Array.from({length: cubeLength}).map((_, xIndex) => (
          <HiddenSegment3D
            // eslint-disable-next-line react/no-array-index-key
            key={`cube-${yIndex}-${xIndex}`}
            x={xIndex}
            y={yIndex}
            z={z}
          />
        )),
      )}
    </>
  );
}

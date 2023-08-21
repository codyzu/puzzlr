import HiddenSegment3D from './HiddenSegement3D';

export default function HiddenCubeLayer3D({z}: {z: number}) {
  return (
    <>
      {Array.from({length: 4}).map((_, yIndex) =>
        Array.from({length: 4}).map((_, xIndex) => (
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

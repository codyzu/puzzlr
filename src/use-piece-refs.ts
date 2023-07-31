import {type MutableRefObject, useRef, useMemo} from 'react';
import {type PieceColor} from './piece-types';

export default function usePieceRefs() {
  const orangeRef = useRef<HTMLDivElement>(null!);
  const greenRef = useRef<HTMLDivElement>(null!);
  const blueRef = useRef<HTMLDivElement>(null!);
  const purpleRef = useRef<HTMLDivElement>(null!);
  const pinkRef = useRef<HTMLDivElement>(null!);

  const pieceRefs: {[key in PieceColor]: MutableRefObject<HTMLDivElement>} =
    useMemo(
      () => ({
        orange: orangeRef,
        green: greenRef,
        blue: blueRef,
        purple: purpleRef,
        pink: pinkRef,
      }),
      [],
    );

  return pieceRefs;
}

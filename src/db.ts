import Dexie, {type Table} from 'dexie';
import {type PieceColor} from './piece-types';

type PieceRow = {
  id?: number;
  color: PieceColor;
  added: Date;
  placement?: number;
};

export class MySubClassedDexie extends Dexie {
  // 'pieces' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  pieces!: Table<PieceRow>;

  constructor() {
    super(`puzzlr - ${import.meta.env.VITE_EVENT_NAME}`);
    this.version(1).stores({
      pieces: '++id, color, added, placement', // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();

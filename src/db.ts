import Dexie, {type Table} from 'dexie';
import {type PieceRow} from './piece-types';

export class MySubClassedDexie extends Dexie {
  // 'pieces' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  pieces!: Table<PieceRow>;

  constructor() {
    super('nodeconf-23-scavenger');
    this.version(1).stores({
      pieces: '++id, color, added', // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();

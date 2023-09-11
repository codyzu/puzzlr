import {db} from './db';

export default function ResetButton() {
  return (
    <button
      className="btn pointer-events-auto self-center"
      type="button"
      onClick={() => {
        void db.pieces.toCollection().modify({placement: undefined});
      }}
    >
      reset
    </button>
  );
}

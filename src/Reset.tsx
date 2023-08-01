import {useNavigate} from 'react-router-dom';
import {db} from './db';

export default function Reset() {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-screen-sm mt-6 gap-4">
      <div className="i-tabler-alert-triangle w-20 h-20" />
      <div>Click the button below to reset your cube.</div>
      <div className="italic">This cannot be undone.</div>
      <button
        type="button"
        className="btn"
        onClick={async () => {
          await db.transaction('rw', [db.pieces], async () =>
            db.pieces.clear(),
          );
          navigate('/');
        }}
      >
        reset
      </button>
    </div>
  );
}

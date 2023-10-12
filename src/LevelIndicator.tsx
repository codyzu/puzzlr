import {cubeLength} from './piece-layout';

const levelMessages = [
  'Noob, go find some QR codes to scan and start building your cube!',
  "Hey Rookie, you're getting the hang of this, but there's still work to do.",
  // "You're almost there, keeping adding pieces so you can level up.",
  "We've found a master, complete the cube and collect your prize!",
];

export default function LevelIndicator({layerCount}: {layerCount: number}) {
  return (
    <div className="text-sm">
      Level {layerCount}/{cubeLength}: {levelMessages[layerCount - 1]}
    </div>
  );
}

import {Canvas} from '@react-three/fiber';
import {type PropsWithChildren} from 'react';

export default function Canvas3D({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  // https://www.reddit.com/r/threejs/comments/w639rz/how_do_i_render_a_3d_element_for_each_item_in/ihbms5a/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
  return (
    <Canvas
      // EventSource={mainRef}
      eventSource={document.querySelector<HTMLElement>('#root')!}
      className="important-absolute top-0 left-0 w-screen h-full"
    >
      {children}
    </Canvas>
  );
}

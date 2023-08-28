import {Canvas} from '@react-three/fiber';
import clsx from 'clsx';
import {type PropsWithChildren} from 'react';

export default function Canvas3D({
  children,
  className,
}: PropsWithChildren<{className?: string}>) {
  // https://www.reddit.com/r/threejs/comments/w639rz/how_do_i_render_a_3d_element_for_each_item_in/ihbms5a/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
  return (
    <Canvas
      // EventSource={mainRef}
      eventSource={document.querySelector<HTMLElement>('#root')!}
      // https://github.com/pmndrs/react-three-fiber/issues/251#issuecomment-558573141
      // Scrolling and mouse events seem to work best with fixed positioning
      className={clsx(
        'important-fixed top-0 left-0 w-screen h-full',
        className,
      )}
    >
      {children}
    </Canvas>
  );
}

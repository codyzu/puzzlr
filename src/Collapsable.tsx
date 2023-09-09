import clsx from 'clsx';
import {
  type PropsWithChildren,
  useState,
  type ReactNode,
  useRef,
  useEffect,
} from 'react';

export default function Collapsable({
  className,
  children,
  title,
}: PropsWithChildren<{title: ReactNode; className?: string}>) {
  const [collapsed, setCollapsed] = useState(false);

  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null!);

  // ScrollHieght is the same prop that react-collapsed uses
  // https://github.com/roginfarrer/collapsed/blob/main/packages/core/src/Collapse.ts
  // Other ideas: https://stackoverflow.com/questions/3508605/how-can-i-transition-height-0-to-height-auto-using-css
  useEffect(() => {
    const nextHeight = ref.current?.scrollHeight ?? 0;
    setHeight(nextHeight);
  }, []);

  return (
    <div className={clsx('items-start justify-center pl-2 h-full', className)}>
      {/* <div> */}
      <div
        // Type="button"
        className="flex flex-row gap-2 items-end"
        // OnClick={(event) => {
        //   setCollapsed((current) => !current);
        //   event.stopPropagation();
        // }}
      >
        {title}
      </div>
      {/* </div> */}
      <div
        ref={ref}
        // ClassName={clsx('transition-max-height duration-800 ease-in-out')}
        className={clsx('')}
        // Style={{maxHeight: collapsed ? 0 : height}}
      >
        {children}
      </div>
    </div>
  );
}

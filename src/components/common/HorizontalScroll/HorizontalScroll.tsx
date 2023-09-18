import {
  MouseEvent,
  PropsWithChildren,
  useEffect,
  useRef,
  useState
} from 'react';

interface HorizontalScrollProps {
  className?: string;
}

const HorizontalScroll = ({
  children,
  className
}: PropsWithChildren<HorizontalScrollProps>) => {
  const [dragState, setDragState] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      setDragState(false);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!dragState || startX === null || !containerRef.current) return;

      const x = event.clientX - startX;
      containerRef.current.scrollLeft = scrollLeft - x;
    };

    if (dragState) {
      document.addEventListener(
        'mousemove',
        handleMouseMove as unknown as EventListener
      );
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener(
        'mousemove',
        handleMouseMove as unknown as EventListener
      );
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState, startX, scrollLeft]);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setDragState(true);
    setStartX(e.clientX);
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const defaults =
    'no-scrollbar overflow-x-auto whitespace-nowrap [&>*]:inline-flex';

  return (
    <div
      className={`${defaults} ${className}`}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      style={{ cursor: dragState ? 'grabbing' : 'grab' }}
    >
      {children}
    </div>
  );
};

export default HorizontalScroll;

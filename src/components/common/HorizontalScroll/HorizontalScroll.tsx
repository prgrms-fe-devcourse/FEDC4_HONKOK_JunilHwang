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
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || startX === null || !containerRef.current) return;

      const x = e.clientX - startX;
      containerRef.current.scrollLeft = scrollLeft - x;
    };

    if (isDragging) {
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
  }, [isDragging, startX, scrollLeft]);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
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
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {children}
    </div>
  );
};

export default HorizontalScroll;

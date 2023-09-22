import { useRef, useEffect } from 'react';

const useNextPosts = (nextPage: any) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            nextPage();
          }
        });
      },
      {
        threshold: 0
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [nextPage]);

  return { ref };
};

export default useNextPosts;

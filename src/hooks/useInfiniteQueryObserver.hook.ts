import { useCallback, useEffect, useRef } from "react";

type UseInfiniteQueryObserverProps = {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
};

export const useInfiniteQueryObserver = (
  infiniteProps: UseInfiniteQueryObserverProps | undefined
) => {
  if (!infiniteProps) return null;

  const { fetchNextPage, hasNextPage, isLoading } = infiniteProps;

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLButtonElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;

      if (target.isIntersecting && hasNextPage && !isLoading) {
        fetchNextPage();
      }
    },
    [isLoading]
  );

  useEffect(() => {
    if (!lastElementRef.current) return;

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: `0px 0px 5px 0px`,
      threshold: 0.1
    };

    observerRef.current = new IntersectionObserver(handleObserver, options);
    observerRef.current.observe(lastElementRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver, lastElementRef.current]);

  return { lastElementRef };
};

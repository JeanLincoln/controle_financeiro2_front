import { useCallback, useEffect, useRef, type RefObject } from "react";

type UseInfiniteQueryObserverProps = {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
  rootElement?: RefObject<null | HTMLDivElement>;
};

export const useInfiniteQueryObserver = (
  infiniteProps: UseInfiniteQueryObserverProps | undefined
) => {
  if (!infiniteProps) return null;

  const { fetchNextPage, hasNextPage, isLoading } = infiniteProps;

  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;

      if (target.isIntersecting && hasNextPage && !isLoading) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isLoading]
  );

  const setRef = useCallback(
    (node: HTMLDivElement | HTMLButtonElement | null) => {
      if (!node) {
        observerRef.current?.disconnect();
        return;
      }

      observerRef.current?.disconnect();

      const options: IntersectionObserverInit = {
        root: infiniteProps.rootElement?.current ?? null,
        rootMargin: `0px 0px 5px 0px`,
        threshold: 0.1
      };

      observerRef.current = new IntersectionObserver(handleObserver, options);

      observerRef.current.observe(node);
    },
    [handleObserver, infiniteProps.rootElement]
  );

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  return setRef;
};

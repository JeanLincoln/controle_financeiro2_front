import { useEffect } from "react";
import { useSearchParams } from "react-router";

type useAppSearchParamsProps = {
  clearOnUnmount?: string[];
};

export type HandleKeyProps = {
  key: string;
  value: number | string;
};

export type HandleAddAndRemoveKeysProps = {
  add?: HandleKeyProps[];
  remove?: string[];
};

export function useAppSearchParams({
  clearOnUnmount
}: useAppSearchParamsProps = {}) {
  const [_, setSearchParams] = useSearchParams();

  const handleAddKey = ({ key, value }: HandleKeyProps) => {
    setSearchParams((searchParams) => {
      searchParams.set(key, value.toString());
      return searchParams;
    });
  };

  const handleRemoveKey = ({ key }: Pick<HandleKeyProps, "key">) => {
    setSearchParams((searchParams) => {
      searchParams.delete(key);
      return searchParams;
    });
  };

  const handleKeys = ({ add, remove }: HandleAddAndRemoveKeysProps) => {
    setSearchParams((searchParams) => {
      if (remove && !!remove.length) {
        remove.forEach((key) => {
          searchParams.delete(key);
        });
      }

      if (add && !!add.length) {
        add.forEach(({ key, value }) => {
          searchParams.set(key, value.toString());
        });
      }

      return searchParams;
    });
  };

  useEffect(() => {
    return () => {
      if (!clearOnUnmount) return;

      clearOnUnmount.forEach((key) => {
        handleRemoveKey({ key });
      });
    };
  }, []);

  return {
    handleAddKey,
    handleRemoveKey,
    handleKeys
  };
}

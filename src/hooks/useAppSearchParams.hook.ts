import { useEffect } from "react";
import { useSearchParams } from "react-router";

type useAppSearchParamsProps = {
  clearOnUnmount?: string[];
};

export type HandleKeyProps = {
  key: string;
  value: number | string;
};

export function useAppSearchParams({
  clearOnUnmount
}: useAppSearchParamsProps = {}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleAddKey = async ({ key, value }: HandleKeyProps) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(key, value.toString());
    setSearchParams(newSearchParams);
  };

  const handleRemoveKey = ({ key }: Pick<HandleKeyProps, "key">) => {
    searchParams.delete(key);
    setSearchParams(searchParams);
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
    handleRemoveKey
  };
}

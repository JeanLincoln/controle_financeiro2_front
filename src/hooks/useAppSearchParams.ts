import { useSearchParams } from "react-router";

export type HandleKeyProps = {
  key: string;
  value: number | string;
};

export function useAppSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleAddKey = ({ key, value }: HandleKeyProps) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(key, value.toString());
    setSearchParams(newSearchParams);
  };

  const handleRemoveKey = ({ key }: Pick<HandleKeyProps, "key">) => {
    searchParams.delete(key);
    setSearchParams(searchParams);
  };

  return {
    handleAddKey,
    handleRemoveKey
  };
}

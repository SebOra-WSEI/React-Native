import { useEffect, useState } from 'react';
import { QueryResponse } from '../types/response';

interface UseGetDataResult<T> {
  loading: boolean;
  error: boolean;
  data: T;
  hasNextPage: boolean;
}

export function useGetData<T>(
  endpoint: string,
  currentPage: number
): UseGetDataResult<Array<T>> {
  const [characters, setCharacters] = useState<Array<T>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const fetchData = async (page: number) => {
    await fetch(`${endpoint}?page=${page}`)
      .then((res) => res.json())
      .then((res: QueryResponse<T>) => {
        setHasNextPage(!!res.info.next);
        setCharacters([...characters, ...res.results]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return {
    loading,
    error,
    data: characters,
    hasNextPage,
  };
}

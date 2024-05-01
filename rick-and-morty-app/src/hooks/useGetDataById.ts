import { useEffect, useState } from 'react';

type ExtendedType<T> = T & { error?: string };

interface UseGetDataByIdResult<T> {
  loading: boolean;
  error: string;
  data: T;
}

export function useGetDataById<T>(
  endpoint: string,
  id: string
): UseGetDataByIdResult<T | undefined> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchData = async () => {
    await fetch(`${endpoint}/${id}`)
      .then((res) => res.json())
      .then((res: ExtendedType<T>) => {
        setData(res);

        res?.error && setError(res.error);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    loading,
    error,
    data,
  };
}

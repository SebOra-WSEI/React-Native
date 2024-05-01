import { useEffect, useState } from 'react';

interface UseGetDataByIdResult<T> {
  loading: boolean;
  error: boolean;
  data: T;
}

export function useGetDataById<T>(
  endpoint: string,
  id: string
): UseGetDataByIdResult<T | undefined> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchData = async () => {
    await fetch(`${endpoint}/${id}`)
      .then((res) => res.json())
      .then((res: T) => {
        setData(res);
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

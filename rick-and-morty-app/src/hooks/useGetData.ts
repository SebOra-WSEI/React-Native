import { useEffect, useState } from 'react';
import { QueryResponse } from '../types/response';
import { CharacterGender, CharacterStatus } from '../types/character';

interface UseGetDataResult<T> {
  loading: boolean;
  error: boolean;
  data: T;
  hasNextPage: boolean;
}

interface useGetDataArgs {
  endpoint: string;
  currentPage: number;
  characterFilters?: {
    name?: string;
    status?: CharacterStatus;
    gender?: CharacterGender;
    species?: string;
    type?: string;
  };
}

export function useGetData<T>({
  endpoint,
  currentPage,
  characterFilters,
}: useGetDataArgs): UseGetDataResult<Array<T>> {
  const [data, setData] = useState<Array<T>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const { name, species, status, gender, type } = characterFilters ?? {};

  const nameQueryFilter = name ? `&name=${name}` : '';
  const speciesQueryFilter = species ? `&species=${species}` : '';
  const statusQueryFilter = status ? `&status=${status}` : '';
  const genderQueryFilter = gender ? `&gender=${gender}` : '';
  const typeQueryFilter = type ? `&type=${type}` : '';

  const fetchData = async (page: number) => {
    await fetch(
      `${endpoint}?page=
      ${page}
      ${nameQueryFilter}
      ${statusQueryFilter}
      ${genderQueryFilter}
      ${typeQueryFilter}
      ${speciesQueryFilter}`
    )
      .then((res) => res.json())
      .then((res: QueryResponse<T>) => {
        setHasNextPage(!!res?.info?.next);
        setData(() => {
          if (currentPage === 1) {
            return res.results;
          }

          return [...data, ...res.results];
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [
    currentPage,
    characterFilters?.name,
    characterFilters?.species,
    characterFilters?.status,
    characterFilters?.gender,
    characterFilters?.type,
  ]);

  return {
    loading,
    error,
    data,
    hasNextPage,
  };
}

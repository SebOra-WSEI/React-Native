import { useEffect, useState } from 'react';
import { QueryResponse } from '../types/response';
import { DefaultCharacterFilters } from '../types/character';
import { DefaultLocationFilters } from '../types/location';
import { DefaultEpisodeFilters } from '../types/episode';

type FilterName =
  | 'name'
  | 'species'
  | 'status'
  | 'gender'
  | 'dimension'
  | 'type'
  | 'episode';

interface useGetDataArgs {
  endpoint: string;
  currentPage: number;
  characterFilters?: DefaultCharacterFilters;
  locationFilters?: DefaultLocationFilters;
  episodeFilters?: DefaultEpisodeFilters;
}

interface UseGetDataResult<T> {
  loading: boolean;
  error: string;
  data: T;
  hasNextPage: boolean;
}

export function useGetData<T>({
  endpoint,
  currentPage,
  characterFilters,
  locationFilters,
  episodeFilters,
}: useGetDataArgs): UseGetDataResult<Array<T>> {
  const [data, setData] = useState<Array<T>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const {
    name: characterName,
    species,
    status,
    gender,
    type: characterType,
  } = characterFilters ?? {};

  const {
    name: locationName,
    type: locationType,
    dimension,
  } = locationFilters ?? {};

  const { name: episodeName, episodeCode } = episodeFilters ?? {};

  const fetchData = async (page: number) => {
    const filters = createUrl(
      createUrlFilter('status', status),
      createUrlFilter('gender', gender),
      createUrlFilter('species', species),
      createUrlFilter('dimension', dimension),
      createUrlFilter('episode', episodeCode),
      createUrlFilter('type', characterType || locationType),
      createUrlFilter('name', characterName || locationName || episodeName)
    );

    await fetch(`${endpoint}?page=${page}${filters}`)
      .then((res) => res.json())
      .then((res: QueryResponse<T>) => {
        setHasNextPage(!!res?.info?.next);
        setData(() => {
          if (currentPage === 1) {
            return res.results;
          }

          return [...data, ...res.results];
        });

        res?.error && setError(res.error);
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
    characterName,
    species,
    status,
    gender,
    characterType,
    locationName,
    locationType,
    dimension,
    episodeName,
    episodeCode,
  ]);

  return {
    loading,
    error,
    data,
    hasNextPage,
  };
}

function createUrlFilter(filterName: FilterName, filterValue?: string): string {
  return filterValue ? `&${filterName}=${filterValue}` : '';
}

function createUrl(...args: Array<string>): string {
  return args.map((a) => a).join('');
}

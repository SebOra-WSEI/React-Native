import { useEffect, useState } from 'react';
import { QueryResponse } from '../types/response';
import { DefaultCharacterFilters } from '../types/character';
import { DefaultLocationFilters } from '../types/location';
import { DefaultEpisodeFilters } from '../types/episode';

interface UseGetDataResult<T> {
  loading: boolean;
  error: boolean;
  data: T;
  hasNextPage: boolean;
}

interface useGetDataArgs {
  endpoint: string;
  currentPage: number;
  characterFilters?: DefaultCharacterFilters;
  locationFilters?: DefaultLocationFilters;
  episodeFilters?: DefaultEpisodeFilters;
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
  const [error, setError] = useState<boolean>(false);
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

  const nameQueryFilter =
    characterName || locationName || episodeName
      ? `&name=${characterName || locationName || episodeName}`
      : '';
  const speciesQueryFilter = species ? `&species=${species}` : '';
  const statusQueryFilter = status ? `&status=${status}` : '';
  const genderQueryFilter = gender ? `&gender=${gender}` : '';
  const typeQueryFilter =
    characterType || locationType
      ? `&type=${characterType || locationType}`
      : '';
  const dimensionQueryFilter = dimension ? `&dimension=${dimension}` : '';
  const episodeQueryFilter = episodeCode ? `&episode=${episodeCode}` : '';

  const fetchData = async (page: number) => {
    await fetch(
      `${endpoint}?page=
      ${page}
      ${nameQueryFilter}
      ${statusQueryFilter}
      ${genderQueryFilter}
      ${typeQueryFilter}
      ${speciesQueryFilter}
      ${dimensionQueryFilter}
      ${episodeQueryFilter}`
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

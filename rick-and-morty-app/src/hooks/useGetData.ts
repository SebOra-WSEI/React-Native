import { useEffect, useState } from 'react';
import { QueryResponse } from '../types/response';
import { DefaultCharacterFilters } from '../types/character';
import { DefaultLocationFilters } from '../types/location';

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
}

export function useGetData<T>({
  endpoint,
  currentPage,
  characterFilters,
  locationFilters,
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

  const characterNameQueryFilter = characterName
    ? `&name=${characterName}`
    : '';
  const speciesQueryFilter = species ? `&species=${species}` : '';
  const statusQueryFilter = status ? `&status=${status}` : '';
  const genderQueryFilter = gender ? `&gender=${gender}` : '';
  const characterTypeQueryFilter = characterType
    ? `&type=${characterType}`
    : '';

  const {
    name: locationName,
    type: locationType,
    dimension,
  } = locationFilters ?? {};

  const locationNameQueryFilter = locationName ? `&name=${locationName}` : '';
  const locationTypeQueryFilter = locationType ? `&type=${locationType}` : '';
  const dimensionNameQueryFilter = dimension ? `&dimension=${dimension}` : '';

  const fetchData = async (page: number) => {
    await fetch(
      `${endpoint}?page=
      ${page}
      ${characterNameQueryFilter}
      ${statusQueryFilter}
      ${genderQueryFilter}
      ${characterTypeQueryFilter}
      ${speciesQueryFilter}
      ${locationNameQueryFilter}
      ${locationTypeQueryFilter}
      ${dimensionNameQueryFilter}`
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
  ]);

  return {
    loading,
    error,
    data,
    hasNextPage,
  };
}

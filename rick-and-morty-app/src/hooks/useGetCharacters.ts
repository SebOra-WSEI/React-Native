import { useEffect, useState } from 'react';
import { Character } from '../types/character';
import { CharacterResponse, QueryResponse } from '../types/response';
import { endpoints } from '../utils/endpoints';

export const useGetCharacters = (
  currentPage: number
): QueryResponse<Array<Character>> => {
  const [characters, setCharacters] = useState<Array<Character>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const fetchData = async (page: number) => {
    await fetch(`${endpoints.characters}?page=${page}`)
      .then((res) => res.json())
      .then((res: CharacterResponse) => {
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
};

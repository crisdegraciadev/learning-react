import { useState } from 'react';
import { searchMovies, sortMoviesByTitle } from '../services/movies';
import { useRef } from 'react';
import { useMemo } from 'react';

export const useMovies = ({ search, sort }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const previusSearch = useRef(search);

  const fetchMovies = async () => {
    if (search === previusSearch.current) return;

    setLoading(true);

    const newMovies = await searchMovies({ search });
    previusSearch.current = search;

    setMovies(newMovies);
    setLoading(false);
  };

  const sortedMovies = useMemo(() => (sort ? sortMoviesByTitle(movies) : movies), [sort, movies]);

  return { movies: sortedMovies, fetchMovies, loading };
};

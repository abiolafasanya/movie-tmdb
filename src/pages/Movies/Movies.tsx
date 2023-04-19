import React, { useEffect, useState } from 'react';
import styles from './Movies.module.scss';
import useApp from '../../hooks/useApp';
import MovieController from '../../utils/moviesController';
import { popularMovieType } from '../../utils/types';
import { star } from '../../utils/Images';
import { formatDate } from '../../utils/formatter';
import { Link } from 'react-router-dom';
import MovieCard from '../../components/MovieCard';

type Genre = {
  id: number;
  name: string;
};

const Movies = () => {
  const { dark } = useApp();
  const [loading, setLoading] = useState(true);
  const [popular, setPopular] = useState({} as popularMovieType[]);
  const [playing, setPlaying] = useState({} as popularMovieType[]);
  const [genres, setGenres] = useState([] as Genre[]);

  useEffect(() => {
    MovieController.index()
      .then((data) => {
        setPopular(data.movies);
        setPlaying(data.playing);
        setGenres(data.genres);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.Home}>
      <div data-theme={dark ? 'dark' : 'light'}>
        <h2 className={styles.title}>Popular Movies</h2>

        {popular.length > 0 && (
          <div className={styles.container}>
            {popular.slice(0, 12).map((movie) => (
              <MovieCard genres={genres} movie={movie} key={movie.id} />
            ))}
          </div>
        )}

        <h2 className={styles.title}>Now Playing</h2>

        {playing.length > 0 && (
          <div className={styles.container}>
            {playing.slice(0, 12).map((movie) => (
              <MovieCard genres={genres} movie={movie} key={movie.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;

import React, { useEffect, useState } from 'react';
import styles from '../Movies/Movies.module.scss';
import useApp from '../../hooks/useApp';
import TvController from '../../utils/tvController';
import { popularMovieType } from '../../utils/types';
import { Link } from 'react-router-dom';
import MovieCard from '../../components/MovieCard';

type Genre = {
  id: number;
  name: string;
};

const Tv = () => {
  const [loading, setLoading] = useState(true);
  const [popular, setPopular] = useState({} as popularMovieType[]);
  const [tops, setTops] = useState({} as popularMovieType[]);
  const [genres, setGenres] = useState([] as Genre[]);
  const { dark } = useApp();

  useEffect(() => {
    TvController.index()
      .then((data) => {
        setPopular(data.tvs);
        setTops(data.rated);
        setGenres(data.genreArr);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.Home}>
      <div data-theme={dark ? 'dark' : 'light'}>
        <h2 className={styles.title}>Popular Tv Series</h2>

        {popular.length > 0 && (
          <div className={styles.container}>
            {popular.slice(0, 12).map((movie, i) => (
              <Link key={`${Date.now()}${i}${movie.id}`} to={`/tv/${movie.id}`}>
                <MovieCard genres={genres} movie={movie} key={movie.id} />
              </Link>
            ))}
          </div>
        )}

        <h2 className={styles.title}>Top Rated</h2>

        {tops.length > 0 && (
          <div className={styles.container}>
            {tops.slice(0, 12).map((movie, i) => (
              <Link key={`${Date.now()}${i}${movie.id}`} to={`/tv/${movie.id}`}>
                <MovieCard genres={genres} movie={movie} key={movie.id} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tv;

import React, { useEffect, useState } from 'react';
import styles from './Movies.module.scss';
import useApp from '../../hooks/useApp';
import MovieController from '../../utils/moviesHelper';
import { popularMovieType } from '../../utils/types';
import { star } from '../../utils/Images';
import { formatDate } from '../../utils/formatter';
import { Link } from 'react-router-dom';

type Genres = {
  id: number;
  name: string;
}[];

const Home = () => {
  const { dark } = useApp();
  const [loading, setLoading] = useState(true);
  const [popular, setPopular] = useState({} as popularMovieType[]);
  const [genres, setGenres] = useState([] as Genres);
  const posterBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const rating = (val: number) => `${val * 10}%`;
  const mapGenres = (genreId: number[]) =>
    genreId.map((id) => genres.filter((i) => i.id == id)[0]?.name).join(', ');

  useEffect(() => {
    MovieController.index()
      .then((data) => {
        setPopular(data.movies);
        setGenres(data.genres);
        console.log('side effect', data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.Home}>
      <div data-theme={dark ? 'dark' : 'light'}>
        <h2 className={styles.title}>Popular Movies</h2>

        {popular.length > 0 && (
          <div className={styles.container}>
            {popular.slice(0, 12).map((movie, index) => (
              <Link to={`/movie/${movie.id}`}>
                <div key={movie.id + index} className={styles.card}>
                  <img src={posterBaseUrl + movie.backdrop_path} alt="poster" />
                  <div className={styles['card-body']}>
                    <h2>{movie.title}</h2>
                    <div className={styles.rating}>
                      <img src={star} alt="star" />
                      <span>{rating(movie.vote_average)}</span>|
                      <span>{formatDate(movie.release_date)}</span>
                    </div>
                    <div>{mapGenres(movie.genre_ids)}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

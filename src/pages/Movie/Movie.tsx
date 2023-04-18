import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Movie.module.scss';
import Axios from '../../api/Axios';
import { creditsType, movieType } from '../../utils/types';
import { star } from '../../utils/Images';
import { formatDate } from '../../utils/formatter';

const Movie = () => {
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({} as movieType);
  const [credits, setCredits] = useState({} as creditsType);
  const posterBaseUrl = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const fetchedMovie = await fetchMovie();
        setMovie(fetchedMovie.movie);
        setCredits(fetchedMovie.credits);
        console.log(
          'User successfully retrieved',
          console.log(fetchedMovie.movie.genres)
        );
      } catch (error) {
        console.log('An error occurred');
      }
      setLoading(false);
    }

    fetchUserDetails();
  }, []);

  const fetchMovie = async () => {
    const { data: movie } = await Axios.get<movieType>(`/${id}`);
    const { data: credits } = await Axios.get<creditsType>(`/${id}/credits`);
    const data = {
      movie,
      credits,
    };
    console.log(data);
    return data;
  };

  function Genre({ genre }: { genre: { id: number; name: string } }) {
    return <span key={genre.id}>{genre.name}</span>;
  }

  const separator = (index: number, movie: movieType) =>
    index === movie.genres.length - 1 ? '' : ', ';

  return (
    <div className={styles.Movie}>
      {movie && (
        <div className={styles.description}>
          <div className={styles.image}>
            <img src={posterBaseUrl + movie.poster_path} alt="movie image" />
          </div>
          <div className={styles.content}>
            <h1>{movie.original_title}</h1>
            <div className={styles.info}>
              <img src={star} alt="" />
              <span>{Math.floor(movie.vote_average * 10)}%</span> |
              <span>{formatDate(movie.release_date)}</span> |
              <span>
                {movie.genres &&
                  movie.genres.map((genre) => (
                    <>
                      <span key={genre.id}>{genre.name}</span>
                      {separator(movie.id, movie)}
                    </>
                  ))}
              </span>
            </div>
            <p className={styles.overview}>{movie.overview}</p>
          <Link to={`/movies`} className={styles.trailerBtn}>Play Trailer</Link>
          <div>
            <h3>Featured Crew</h3>
          </div>
          <div>casts</div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Movie;

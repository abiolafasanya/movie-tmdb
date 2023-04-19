import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Movie.module.scss';
import Axios from '../../api/Axios';
import { creditsType, movieType } from '../../utils/types';
import { play, star } from '../../utils/Images';
import { formatDate } from '../../utils/formatter';
import useApp from '../../hooks/useApp';

const Movie = () => {
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({} as movieType);
  const [credits, setCredits] = useState({} as creditsType);
  const posterBaseUrl = 'https://image.tmdb.org/t/p/w1280';
  const imageUrl2 = 'https://image.tmdb.org/t/p/w235_and_h235_face/';
  const { dark } = useApp();
  const useDarkRef = useRef<HTMLDivElement>(HTMLDivElement.prototype);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const fetchedMovie = await fetchMovie();
        setMovie(fetchedMovie.movie);
        setCredits(fetchedMovie.credits);
      } catch (error) {
        return null;
      }
      setLoading(false);
    }

    fetchUserDetails();
  }, []);

  const fetchMovie = async () => {
    const { data: movie } = await Axios.get<movieType>(`/movie/${id}`);
    const { data: credits } = await Axios.get<creditsType>(
      `/movie/${id}/credits`
    );
    const data = {
      movie,
      credits,
    };
    console.log({ data }, 'status');
    return data;
  };

  const separator = (index: number, movie: movieType) =>
    index === movie.genres.length - 1 ? '' : ', ';
  return (
    <div className={styles.Movie}>
      {movie && (
        <div className={styles.description}>
          <div className={styles.image}>
            <img
              src={movie.poster_path ? posterBaseUrl + movie.poster_path : ''}
              alt="movie image"
            />
          </div>
          <div className={styles.content}>
            <h1>{movie.original_title}</h1>
            <div
              className={styles.info}
              ref={useDarkRef}
              data-theme={dark ? 'dark' : 'light'}
            >
              <img src={star} alt="" />
              <span>{Math.floor(movie.vote_average * 10)}%</span> |
              <span>{formatDate(movie.release_date)}</span> |
              <span>
                {movie.genres &&
                  movie.genres.map((genre, i) => (
                    <span key={`${Date.now()}${i}`}>
                      <span>{genre.name}</span>
                      {separator(movie.id, movie)}
                    </span>
                  ))}
              </span>
            </div>
            <p className={styles.overview}>{movie.overview}</p>

            <div>
              <h3>Featured Crew</h3>
              <div className={styles.crew}>
                {credits.crew &&
                  credits.crew.slice(0, 2).map((crew, i) => (
                    <div key={`${Date.now()}${i}`} className={styles.item}>
                      <h3>{crew.name}</h3>
                      <div>{crew.known_for_department}</div>
                    </div>
                  ))}
              </div>
            </div>

            <Link
              to={movie.video ? movie.homepage : '/'}
              className={styles.trailerBtn}
            >
              <img src={play} alt="star" />
              <span>Play Trailer</span>
            </Link>
          </div>
        </div>
      )}

      <div className={styles.cast}>
        <h2>Cast</h2>
        <div className={styles.info}>
          {credits.cast &&
            credits.cast.slice(0, 8).map((cast, i) => (
              <Link key={`${cast.id}${i}`} to={`/actor/${cast.id}`}>
                <div className={styles.card}>
                  <img src={imageUrl2 + cast.profile_path} alt="" />
                  <div>
                    <h3>{cast.name}</h3>
                    <div>{cast.character}</div>
                  </div>
                  <div>
                    <span>{cast.known_for_department}</span> |
                    <span>{Math.floor(cast.popularity)}k</span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Movie;

import React from 'react';
import { formatDate } from '../utils/formatter';
import { star } from '../utils/Images';
import { Genre, popularMovieType } from '../utils/types';
import styles from '../pages/Movies/Movies.module.scss';

type Props = {
  genres: Genre[];
  movie: popularMovieType;
};

const MovieCard = ({ genres, movie }: Props) => {
  const posterBaseUrl = 'https://image.tmdb.org/t/p/w1280/';
  const rating = (val: number) => `${val * 10}%`;
  const mapGenres = (genreId: number[]) =>
    genreId.map((id) => genres.filter((i) => i.id == id)[0]?.name).join(', ');

  return (
    <div key={movie.id} className={styles.card}>
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
  );
};

export default MovieCard;

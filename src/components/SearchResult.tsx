import React from 'react';
import styles from './Search.module.scss';
import { popularMovieType } from '../utils/types';
import { Link } from 'react-router-dom';

interface Props {
  result: popularMovieType;
}

const SearchResult = ({ result }: Props) => {
  const imageUrl = 'https://image.tmdb.org/t/p/w45/';
  console.log(result)

  return (
    <div className={styles.result}>
      {result.poster_path ? (
        <img
          src={result.poster_path && imageUrl + result.poster_path}
          alt="MV"
        />
      ) : (
        <img
          src="https://via.placeholder.com/50x75/111827/000000"
          alt=""
          className="w-8 shrink-0 "
        />
      )}
      <span className={styles.title}>{result.title}</span>
    </div>
  );
};

export default SearchResult;

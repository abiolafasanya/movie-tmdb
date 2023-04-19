import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { FaSearch } from 'react-icons/fa';
import SearchResult from './SearchResult';
import Axios from '../api/Axios';
import { Movie } from '../utils/moviesController';
import { popularMovieType } from '../utils/types';
import { Link, Navigate } from 'react-router-dom';
import Navigation from './Navigation';
import { MdCancel } from 'react-icons/md';

const Search = () => {
  const [result, setResult] = useState<popularMovieType[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState<string>('');


  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const search = e.target.value;
    setSearchQuery(search);
    if (!search) {
      return;
    }

    console.log(search);
    if (search.length <= 2) {
      return;
    }

    setShowResult(true);

    try {
      const { data } = await Axios.get<Movie>(`/search/movie?query=${search}`);
      const output = data.results.slice(0, 6);
      setResult(output);
    } catch (error) {
      console.error(error);
      // Handle the error in an appropriate way
    }
  }

  return (
    <div className={styles.searchArea}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search for movies, tv shows and more ..."
          value={searchQuery}
          id="search"
          onChange={handleSearch}
        />
        <FaSearch className={styles.fa} />
      </div>
      {showResult && (
        <div className={styles.searchResult}>
          <MdCancel
            className={styles.cancel}
            onClick={() => setShowResult(false)}
          />
          <ul className={styles['searchResult-list']}>
            {result?.length > 0 &&
              result.map((result) => (
                <li>
                  <Link replace reloadDocument to={`/movie/${result.id}`}>
                    <SearchResult
                      key={`${result.id}${result.release_date}`}
                      result={result}
                    />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;

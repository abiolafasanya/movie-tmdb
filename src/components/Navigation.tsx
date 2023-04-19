import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './Navigation.scss';
import { Link, useNavigate } from 'react-router-dom';
import { MdDarkMode, MdLightMode, MdMovie } from 'react-icons/md';
import useApp from '../hooks/useApp';
import { popularMovieType } from '../utils/types';
import Axios from '../api/Axios';
import { Movie } from '../utils/moviesController';

interface NavigationProps {
  // Props for your navigation component can be defined here
}

const navLinks = [
  { name: 'Movie', url: '/' },
  { name: 'Tv Shows', url: '/tv-shows' },
  { name: 'Actors', url: '/actors' },
];

const Navigation: React.FC<NavigationProps> = () => {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const { dark, toggleTheme } = useApp();
  const [result, setResult] = useState<popularMovieType[]>();
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);

    if (searchQuery?.length <= 2) return;
    setShowResult(true);

    try {
      const { data } = await Axios.get<Movie>(
        `/search/movie?query=${searchQuery}`
      );
      const output = data.results.slice(0, 6);
      setResult(output);
    } catch (error) {
      console.error(error);
      // Handle the error in an appropriate way
    }
  };

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    const target = e.target as HTMLInputElement & {
      search: { value: string };
    };
    const search = target.search.value;
    if (!search) return;

    console.log(search);
    if (search.length <= 2) return;
    try {
      const { data } = await Axios.get<Movie>(`/search/movie?query=${search}`);
      const output = data.results.slice(0, 6);
      setResult(output);
      setShowResult(false);
    } catch (error) {
      console.error(error);
      // Handle the error in an appropriate way
    }
  }

  return (
    <nav className={`navigation ${dark ? 'dark' : 'light'}`}>
      <div className="navigation__left">
        <a href="/" className="navigation__logo">
          <span>BitMovie</span>
          <MdMovie className={'fa'} />
        </a>
        <ul className="navigation__links">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link to={link.url}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navigation__right">
        <form className="navigation__search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for movies, tv shows and more ..."
            value={searchQuery}
            id="search"
            onChange={handleSearchChange}
          />
          <button type="submit" className="navigation__search-button">
            <FaSearch />
          </button>
        </form>
        <button type="button" className="navigation__toggler">
          {dark ? (
            <MdLightMode onClick={() => toggleTheme()} />
          ) : (
            <MdDarkMode onClick={() => toggleTheme()} />
          )}
        </button>
      </div>

      {/* Search results component */}
      {showResult && (
        <div
          className={`navigation__search-results ${dark ? 'dark' : 'light'}`}
        >
          {/* Your search results component can be placed here */}
          {searchQuery && (
            <div className="navigation__search-results-list">
              <p>Search results for "{searchQuery}"</p>
              <ul>
                {result &&
                  result.map((result) => (
                    <li onClick={() => setShowResult((result) => !result)}>
                      <Link to={`/movie/${result.id}`} key={result.id}>
                        {result.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navigation;

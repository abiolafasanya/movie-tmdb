import React from 'react'
import useApp from '../hooks/useApp'
import { Link } from 'react-router-dom'
import styles from './Header.module.scss';
import avatar from '../assets/icons/avatar.png';
import { MdDarkMode, MdLightMode, MdMovie } from 'react-icons/md';

const Header = () => {
  const { dark, toggleTheme } = useApp();

  const navLinks = [
    { name: 'Movie', url: '/movies' },
    { name: 'Tv Shows', url: '/tv-shows' },
    { name: 'Actors', url: '/actors' },
  ];

  return (
    <div className={styles.Header}>
      <nav data-theme={dark ? 'dark' : 'light'}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <MdMovie className={styles.fa} />
            <span>TSCMovies</span>
          </div>
          <div className={styles.links}>
            {navLinks.map((link, id) => (
              <Link to={link.url} className={styles.link}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.search}>
            <input type="text" />
          </div>
          <div className={styles.icons}>
            <img src={avatar} alt="avatar" className={styles.avatar} />
            {dark ? (
              <MdLightMode onClick={() => toggleTheme()} />
            ) : (
              <MdDarkMode onClick={() => toggleTheme()} />
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header
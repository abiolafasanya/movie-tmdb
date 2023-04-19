import React from 'react';
import styles from './Social.module.scss';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaImdb,
} from 'react-icons/fa';
import { Socials } from '../utils/types';

type Social = {
  socials: Socials;
};
const Social = ({ socials }: Social) => {
  return (
    <div className={styles.social}>
      {socials.facebook_id && (
        <Link to={`https://www.facebook.com/${socials.facebook_id}`}>
          <FaFacebook className={styles.fa} />
        </Link>
      )}
      {socials.instagram_id && (
        <Link to={`https://www.instagram.com/${socials.instagram_id}`}>
          <FaInstagram className={styles.fa} />
        </Link>
      )}
      {socials.imdb_id && (
        <Link to={`https://www.imdb.com/${socials.imdb_id}`}>
          <FaImdb className={styles.fa} />
        </Link>
      )}
      {socials.youtube_id && (
        <Link to={`https://www.youtube.com/${socials.youtube_id}`}>
          <FaYoutube className={styles.fa} />
        </Link>
      )}
      {socials.twitter_id && (
        <Link to={`https://www.twitter.com/${socials.twitter_id}`}>
          <FaTwitter className={styles.fa} />
        </Link>
      )}
    </div>
  );
};

export default Social;

// <Link to={props.id}>
//   {<props.icon />}
// </Link>

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Actor.module.scss';
import Axios from '../../api/Axios';
import { Socials, actorType, castType, creditsType } from '../../utils/types';
import { play, star } from '../../utils/Images';
import { formatDate } from '../../utils/formatter';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaImdb,
} from 'react-icons/fa';
import Social from '../../components/Social';

const Actor = () => {
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const [loading, setLoading] = useState(true);
  const [actor, setActor] = useState({} as actorType);
  const [socials, setSocials] = useState({} as Socials);
  const [cast, setCast] = useState([] as castType[]);
  const posterBaseUrl = 'https://image.tmdb.org/t/p/w1280';
  const imageUrl2 = 'https://image.tmdb.org/t/p/w235_and_h235_face/';

  const age = (birthDate: string, deathDate: string) => {
    // Get the birthdate and deathdate as Date objects
    const birthdate = new Date(birthDate);
    const deathdate = new Date(deathDate);

    const alive = new Date(Date.now()).getFullYear() - birthdate.getFullYear();
    const died = deathdate.getFullYear() - birthdate.getFullYear();
    if (deathdate.getFullYear() > birthdate.getFullYear())
      return 'Died at ' + died;
    return alive;
  };

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const fetchedMovie = await fetchMovie();
        setActor(fetchedMovie.actor);
        setSocials(fetchedMovie.socials);
        // const sortedCast = fetchedMovie.cast.sort(
        //   (a, b) => b.popularity - a.popularity
        // );

        setCast(fetchedMovie.casts);
      } catch (error) {
        return null;
      }
      setLoading(false);
    }

    fetchUserDetails();
  }, []);

  const fetchMovie = async () => {
    const { data: actor } = await Axios.get<actorType>(`/person/${id}`);
    const { data: credits } = await Axios.get<creditsType>(
      `/person/${id}/combined_credits`
    );
    const { data: socials } = await Axios.get<Socials>(
      `/person/${id}/external_ids`
    );
    const data = {
      actor,
      socials,
      casts: credits.cast as castType[],
    };
    return data;
  };

  function Genre({ genre }: { genre: { id: number; name: string } }) {
    return <span key={genre.id}>{genre.name}</span>;
  }

  return (
    <div className={styles.actor}>
      {actor && (
        <div className={styles.details}>
          <div className={styles.image}>
            <img src={posterBaseUrl + actor.profile_path} alt="movie image" />
            <Social socials={socials} />
          </div>
          <div className={styles.content}>
            <h1>{actor.name}</h1>
            <div className={styles.info}>
              <img src={star} alt="" />
              <span>{Math.floor(actor.popularity * 10)}k</span> |
              <span>
                {`${formatDate(actor.birthday)} (${age(
                  actor.birthday,
                  actor.deathday
                )} years)`}
              </span>{' '}
              |
              <span>
                {actor.also_known_as &&
                  actor.also_known_as.map((known, i) => (
                    <span key={i}>
                      <span>{known}</span>
                    </span>
                  ))}
              </span>
            </div>
            <p className={styles.bio}>{actor.biography}</p>

            <div>
              <h3>Knwon For</h3>
              <div className={styles.knownMovies}>
                {cast &&
                  cast
                    .sort((a, b) => b.popularity - a.popularity)
                    .slice(0, 5)
                    .map((cast) => (
                      <Link to={`/movie/${cast.id}`}>
                        <div key={cast.id} className={styles.item}>
                          <img src={imageUrl2 + cast.poster_path} alt="" />
                          <div className={styles.kTitle}>{cast.title}</div>
                        </div>
                      </Link>
                    ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Actor;

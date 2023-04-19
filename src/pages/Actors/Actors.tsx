import React, { useEffect, useState } from 'react';
import styles from './Actors.module.scss';
import { Link } from 'react-router-dom';
import Axios from '../../api/Axios';
import { actorsType } from '../../utils/types';

const Actors = () => {
  const [persons, setPersons] = useState([] as actorsType[]);
  const fetchPerson = async () => {
    const { data } = await Axios.get('/person/popular');
    console.log(data);
    return data.results as actorsType[];
  };

  useEffect(() => {
    const controller = new AbortController();
    controller.signal;
    const handleFectchPerson = async () => {
      const result = await fetchPerson();
      if (!result) return;
      setPersons(result);
    };
    handleFectchPerson();

    return () => {
      controller.abort();
    };
  }, []);

  const imageUrl = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/';
  return (
    <div className={styles.actors}>
      <h2 className={styles.title}>Popular Actor</h2>
      <div className={styles.boxGroup}>
        {persons.length > 0 &&
          persons.slice(0, 10).map((person) => (
            <div key={person.id} className={styles.card}>
              <Link to={'/actor/'}>
                <img src={imageUrl + person.known_for[0].poster_path} alt="" />
                <div className={styles.cardDetail}>
                  <h3>{person.name}</h3>
                  <div className={styles.knownFor}  >
                    {person.known_for.map((known, index) => (
                      <span key={known.id} className={styles.list}>
                        {known.name
                          ? known.name
                          : known.title
                          ? known.title
                          : known.original_name
                          ? known.original_name
                          : known.original_title && known.original_title}
                        {index !== person.known_for.length - 1 && ','}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Actors;
// https://www.themoviedb.org/t/p/w300_and_h450_bestv2/bHHn3krbHyxQIWb4JbHkPlV6Uu1.jpg

import React from 'react'
import styles from './Home.module.scss';
import useApp from '../hooks/useApp';

const Home = () => {
  const {dark} = useApp()
  return (
    <div className={styles.Home}>
      <div  data-theme={dark ? 'dark' : 'light'}>
        <h2 className={styles.title}>Popular Movies</h2>

        <div className={styles.container}>

        </div>
      </div>
    </div>
  )
}

export default Home
import Header from './Header'
import { Outlet } from 'react-router-dom'
import useApp from '../hooks/useApp'
import styles from './Layout.module.scss'
import Navigation from './Navigation';

const Layout = () => {
const {dark} = useApp()

  return (
    <div className={styles.Layout}>
      <div data-theme={dark ? 'dark' : 'light'}>
        <Header />
        {/* <Navigation /> */}
        <Outlet />
      </div>
    </div>
  );
}

export default Layout
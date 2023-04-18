import Header from './Header'
import { Outlet } from 'react-router-dom'
import useApp from '../hooks/useApp'
import styles from './Layout.module.scss'

const Layout = () => {
const {dark} = useApp()

  return (
    <div className={styles.Layout}>
      <div data-theme={dark ? 'dark' : 'light'}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout
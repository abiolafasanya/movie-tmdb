import React from 'react'
import useApp from '../hooks/useApp'
import { Link } from 'react-router-dom'

const Header = () => {
  const {dark, toggleTheme} = useApp()

  const navLinks = [
    {name: 'Home', url: '/'},
    {name: 'About', url: '/about'},
    {name: 'Contact', url: '/contact'}
  ];

  return (
    <div>
      <nav>
        {navLinks.map((link, id) => (
          <Link to={link.url} className=''>{link.name}</Link>
        ))}
      </nav>
      <button onClick={() => toggleTheme()}>Toggle</button>
    </div>
  )
}

export default Header
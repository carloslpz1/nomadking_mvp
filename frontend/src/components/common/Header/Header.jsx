import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa';

import './Header.css'

const Header = () => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleNavigate = (path) => {
    navigate(path)
  }

  return (
    <header className={menuOpen ? 'header-no-shadow' : 'header-shadow'}>
      <div className="logo" onClick={() => handleNavigate('/')}>
        <h2>NomadKing</h2>
      </div>
      <div className="btn-ham" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <div className={`nav ${menuOpen ? 'nav-open' : 'nav-close'}`}>
        <ul className="nav-items">
          <li className="nav-item">
            <Link to={'/'}>Home</Link>
          </li>
          <li className="nav-item">
            <Link to={'/plans'}>Plans</Link>
          </li>
          <li className="nav-item">
            <Link to={'/contact'}>Contact</Link>
          </li>
          <li className="nav-item">
            <Link to={'/help'}>Help</Link>
          </li>
        </ul>
        <div className="user-options">
          <button className="btn-inverse" onClick={() => handleNavigate('/login')}>Login</button>
          <button onClick={() => handleNavigate('/signup')}>Sign up</button>
        </div>
      </div>
    </header>
  )
}

export default Header
import { useState, useContext } from 'react'
import { ThemeContext } from '../../../contexts/contexts'
import { Themes } from '../../../constants/themes'
import OutsideClickHandler from '../../handlers/OutsideClickHandler'
import PropTypes from 'prop-types';

// Icons
import { FaSun, FaMoon, FaLaptop } from 'react-icons/fa'

import { toCapitalize } from '../../../utils/text-format'
import './ThemeSwitcher.css'

const themeChoices = [
  {
    name: Themes.LIGHT,
    icon: <FaSun />
  },
  {
    name: Themes.DARK,
    icon: <FaMoon />
  },
  {
    name: Themes.DEFAULT,
    icon: <FaLaptop />
  }
]

const icons = {
  light: <FaSun />,
  dark: <FaMoon />,
  default: <FaLaptop />
}

const ThemeSwitcher = ({ right = false }) => {
  const { theme, changeTheme } = useContext(ThemeContext)
  const [isOpen, setIsOpen] = useState(false)

  const changeChoice = (value) => {
    changeTheme(value)
    setIsOpen(false)
  }

  const handleOutsideClick = () => {
    isOpen && setIsOpen(false)
  }

  return (
    <div className="dropdown">
      <OutsideClickHandler onOutsideClick={handleOutsideClick}>
        <div
          className={`select`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen
            ? <div className="caret caret-rotate"></div>
            : icons[theme]
          }
        </div>
        <ul className={`menu ${right ? 'right' : ''} ${isOpen ? 'menu-open' : ''}`}>
          {
            themeChoices.map((themeChoice, index) => (
              <li
                key={index}
                className={theme === themeChoice.name ? 'active' : undefined}
                onClick={() => changeChoice(themeChoice.name)}
              >
                {themeChoice.icon}
                <p>{toCapitalize(themeChoice.name)}</p>
              </li>
            ))
          }
        </ul>
      </OutsideClickHandler>
    </div>
  )
}

ThemeSwitcher.propTypes = {
  right: PropTypes.bool
};

export default ThemeSwitcher
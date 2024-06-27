import { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import { Themes } from "../constants/themes"
import { ThemeContext } from "./contexts"

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(null)

  const changeTheme = (value) => {
    if (value == Themes.LIGHT || value == Themes.DARK) {
      setTheme(value)
    } else {
      setTheme(Themes.DEFAULT)
    }
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      changeTheme(savedTheme)
    } else {
      changeTheme(Themes.DEFAULT)
    }
  }, [])

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    switch (theme) {
      case Themes.LIGHT:
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
        break
      case Themes.DARK:
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
        break
      default:
        !prefersDark
          ? document.documentElement.classList.remove('dark')
          : document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'default')
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ThemeProvider
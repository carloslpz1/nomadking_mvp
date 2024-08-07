import { useState } from "react"
import { NavbarContext } from "./contexts"
import PropTypes from 'prop-types'

const NavbarProvider = ({ children }) => {
  const [selectedMenuOption, setSelectedMenuOption] = useState('')

  const changeSelectedMenuOption = (option) => {
    if (option === 'home') {
      setSelectedMenuOption('home')
    } else if (option === 'messages') {
      setSelectedMenuOption('messages')
    } else if (option === 'notifications') {
      setSelectedMenuOption('notifications')
    } else if (option === 'settings') {
      setSelectedMenuOption('settings')
    } else {
      setSelectedMenuOption('')
    }
  }

  return (
    <NavbarContext.Provider value={{ selectedMenuOption, changeSelectedMenuOption }}>
      {children}
    </NavbarContext.Provider>
  )
}

NavbarProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default NavbarProvider
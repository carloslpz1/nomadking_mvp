import { useEffect, useState } from "react"
import { ScrollContext } from "./contexts"
import PropTypes from 'prop-types'

const ScrollProvider = ({ children }) => {
  const [isBottom, setIsBottom] = useState(false)

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      setIsBottom(true)
    } else {
      setIsBottom(false)
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <ScrollContext.Provider value={{ isBottom }}>
      {children}
    </ScrollContext.Provider>
  )
}

ScrollProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ScrollProvider
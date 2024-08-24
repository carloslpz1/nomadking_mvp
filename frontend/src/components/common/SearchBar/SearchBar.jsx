import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import Spinner from "../Spinner/Spinner"
import { FaSistrix, FaUser } from "react-icons/fa"
import './SearchBar.css'

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [find, setFind] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState([])
  const intervalRef = useRef()
  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    if (!showResults) {
      setResults([])
    }
  }, [showResults])

  const handleSearch = async (ev) => {
    setSearchInput(ev.target.value)

    intervalRef.current && clearInterval(intervalRef.current)
    intervalRef.current = setInterval(async () => {
      if (ev.target.value.length > 0) {
        // fetch the api to search users
        setIsLoading(true)
        try {
          const token = localStorage.getItem('token')
          const response = await fetch(`${apiUrl}/users/${ev.target.value}/find`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          })

          if (!response.ok) {
            setFind(false)
            throw new Error('No users')
          }

          const result = await response.json()
          setResults(result.data.items)
          setFind(true)
        } catch (e) {
          console.error(e)
        } finally {
          setIsLoading(false)
        }

        setShowResults(true)
      } else {
        setShowResults(false)
      }

      clearInterval(intervalRef.current)
    }, 1000)
  }

  const handleSearchPanel = () => {
    if (showResults) {
      if (isLoading) {
        return (
          <div className="search-result">
            <Spinner />
          </div>
        )
      } else if (find) {
        return (
          <div className="search-result">
            {results.map((result) => (
              <Link key={result.id} className="user-card" to={`/profile/${result.username}`}>
                <div className="avatar user-avatar">
                  <img src={result.avatar} alt="Avatar" />
                </div>
                <div className="user-data">
                  <span>{result.name} {result.surname}</span>
                  <span className="username">@{result.username}</span>
                </div>
                <div className="user-follow">
                  {result.following
                    ? <FaUser />
                    : <></>
                  }
                </div>
              </Link>
            ))}
            <div className="see-more">
              <span>See more</span>
            </div>
          </div>
        )
      } else {
        return (
          <div className="search-result">
            <span>Users not found</span>
          </div>
        )
      }
    }

    return
  }

  return (
    <div className="search-bar">
      <input
        type="search"
        placeholder="#Explore"
        onFocus={handleSearch}
        onBlur={() => {
          setTimeout(() => {
            setShowResults(false)
          }, 100)
        }}
        onChange={handleSearch}
        value={searchInput}
      />
      <div className="search-icon">
        <FaSistrix />
      </div>
      {handleSearchPanel()}
    </div>
  )
}

export default SearchBar
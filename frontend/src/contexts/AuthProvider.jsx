import { useCallback, useEffect, useState } from "react"
import { AuthContext } from "./contexts"
import PropTypes from 'prop-types'

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const apiUrl = import.meta.env.VITE_API_URL

  const login = async (credentials) => {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })

    const data = await response.json()

    if (data.token) {
      localStorage.setItem('token', data.token)
      setUser(data.data.items)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoading(true)
      fetch(`${apiUrl}/auth/checktoken`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then((response) => response.json())
        .then((data) => setUser(data.data.items))
        .catch((e) => {
          logout()
          console.error(e)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }, [apiUrl])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthProvider
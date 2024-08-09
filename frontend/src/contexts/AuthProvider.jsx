import { useCallback, useEffect, useState } from "react"
import { AuthContext } from "./contexts"
import PropTypes from 'prop-types'

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const apiUrl = import.meta.env.VITE_API_URL

  const login = async (credentials) => {
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })

      const data = await response.json()

      if (data.status == 'error') {
        return { status: 'error', message: data.error.message }
      }

      if (data.token) {
        localStorage.setItem('token', data.token)
        setUser({ ...data.data.items, token: data.token })
      }

      return { status: 'success', message: 'You logged successfuly.' }
    } catch (e) {
      console.error('Error while doing the query.')
      return { status: 'error', message: 'Error with the server. Try later.' }
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
        .then((data) => setUser({ ...data.data.items, token: token }))
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
    <AuthContext.Provider value={{ user, setUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthProvider
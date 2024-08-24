import { useState } from 'react'
import useAuth from './useAuth'

const usePostFollow = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user } = useAuth()
  const apiUrl = import.meta.env.VITE_API_URL

  const postData = async (data) => {
    try {
      setLoading(true)

      const res = await fetch(`${apiUrl}/follows`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(data)
      })

      const resData = await res.json()

      if (resData.error) {
        throw new Error(resData.error.message)
      }

      return resData.data
    } catch (e) {
      console.error(e.message)
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return { postData, loading, error }
}

const useDeleteFollow = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user } = useAuth()
  const apiUrl = import.meta.env.VITE_API_URL

  const deleteData = async (data) => {
    try {
      setLoading(true)

      const res = await fetch(`${apiUrl}/follows`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(data)
      })

      const resData = await res.json()

      if (resData.error) {
        throw new Error(resData.error.message)
      }

      return resData.data
    } catch (e) {
      console.error(e.message)
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return { deleteData, loading, error }
}

export { usePostFollow, useDeleteFollow }
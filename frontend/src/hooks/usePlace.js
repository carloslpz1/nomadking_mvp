import { useEffect, useState } from 'react'
import useAuth from './useAuth'

const useGetPlaces = ({ page = 1, pageSize = 20 }) => {
  const [places, setPlaces] = useState(null)
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user } = useAuth()
  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    const getPlaces = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${apiUrl}/places?page=${page}&page_size=${pageSize}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })

        const resData = await res.json()

        if (resData.error) {
          throw new Error(resData.error.message)
        }

        setPlaces(resData.data.items)
        setPagination(resData.data.pagination)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    getPlaces()
  }, [apiUrl, user, page, pageSize])

  return { places, pagination, loading, error }
}

const useGetPlace = ({ placeId }) => {
  const [place, setPlace] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()
  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    const getPlace = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${apiUrl}/places/${placeId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })

        const resData = await res.json()

        if (resData.error) {
          throw new Error(resData.error.message)
        }

        setPlace(resData.data.items)
      } catch (e) {
        console.error(e.message)
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    getPlace()
  }, [apiUrl, user, placeId])

  return { place, loading, error }
}

const usePostRating = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user } = useAuth()
  const apiUrl = import.meta.env.VITE_API_URL

  const postRating = async (data) => {
    setLoading(true)
    try {
      const res = await fetch(`${apiUrl}/places/ratings`, {
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

  return { postRating, loading, error }
}

export { useGetPlaces, useGetPlace, usePostRating }
import { useEffect, useState } from "react"
import useToast from "./useToast"
import useAuth from "./useAuth"

const useGetChats = () => {
  const [loading, setLoading] = useState(false)
  const [chats, setChats] = useState([])
  const { user } = useAuth()
  const { addToast } = useToast()
  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    const getChats = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${apiUrl}/users/chats`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const data = await res.json()

        if (data.status == 'error') {
          throw new Error(data.message)
        }

        setChats(data.data.items)
      } catch (e) {
        addToast(e.message, 3000, 'error')
      } finally {
        setLoading(false)
      }
    }

    getChats()
  }, [addToast, apiUrl, user])

  return { chats, loading }
}

export default useGetChats
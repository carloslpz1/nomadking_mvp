import { useState, useEffect } from 'react'
import useChat from './useChat'
import useToast from './useToast'
import useAuth from './useAuth'

const useGetMessages = (receiver_id) => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedChat } = useChat()
  const { user } = useAuth()
  const addToast = useToast()
  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${apiUrl}/messages/${receiver_id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const data = await res.json()

        if (data.status == 'error') {
          throw new Error(data.error.message)
        }

        setMessages(data.data.items)
      } catch (e) {
        addToast(e.message, 3000, 'error')
      } finally {
        setLoading(false)
      }
    }

    if (selectedChat?.id) getMessages()

  }, [receiver_id, selectedChat, setMessages, addToast, apiUrl, user])

  return { messages, loading }
}

export default useGetMessages
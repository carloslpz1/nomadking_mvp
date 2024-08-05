import { useState } from "react"
import useChat from "./useChat"
import useToast from "./useToast"
import useAuth from "./useAuth"

const useSendMessage = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedChat } = useChat()
  const { user } = useAuth()
  const addToast = useToast()
  const apiUrl = import.meta.env.VITE_API_URL

  const sendMessage = async (message) => {
    setLoading(true)
    try {
      const res = await fetch(`${apiUrl}/messages/send/${selectedChat.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ content: message, chat_id: selectedChat.chat.id })
      })

      const data = await res.json()

      if (data.status == 'error') {
        throw new Error(data.message)
      }

      setMessages([...messages, data.data.items])
    } catch (e) {
      addToast(e.message, 3000, 'error')
    } finally {
      setLoading(false)
    }
  }

  return { sendMessage, loading }
}

export default useSendMessage
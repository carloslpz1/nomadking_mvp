import { useEffect } from "react"
import useChat from "./useChat"
import useSocket from "./useSocket"

const useListenMessages = () => {
  const { socket } = useSocket()
  const { messages, setMessages } = useChat()

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessages([...messages, newMessage])
    })

    return () => socket?.off('newMessage')
  }, [socket, setMessages, messages])
}

export default useListenMessages
import { useEffect } from 'react'
import Messages from '../Messages/Messages'
import MessageInput from '../MessageInput/MessageInput'
import useAuth from '../../../hooks/useAuth'
import useChat from '../../../hooks/useChat'
import { TiMessages } from "react-icons/ti"
import './MessagesContainer.css'

const MessagesContainer = () => {
  const { selectedChat, setSelectedChat } = useChat()
  const noChatSelected = selectedChat ? false : true

  useEffect(() => {
    return () => setSelectedChat(null)
  }, [setSelectedChat])

  return (
    <div className="messages-container">
      {noChatSelected
        ? <NoChatSelected />
        : <>
          <div className="messages-header">
            <div className="avatar">
              <img src={selectedChat.avatar} alt="avatar" />
            </div>
            <div className="info">
              <p>{selectedChat.name} {selectedChat.surname}</p>
              <p>@{selectedChat.username}</p>
            </div>
          </div>
          <Messages />
          <MessageInput />
        </>
      }
    </div>
  )
}

const NoChatSelected = () => {
  const { user } = useAuth()

  return (
    <div className="no-chat-container">
      <div className="no-chat-content">
        <p>Welcome ✋ {user.name} {user.surname}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages />
      </div>
    </div>
  )
}

export default MessagesContainer
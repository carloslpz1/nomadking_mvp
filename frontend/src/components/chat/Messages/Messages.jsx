import useAuth from '../../../hooks/useAuth'
import useChat from '../../../hooks/useChat'
import useGetMessages from '../../../hooks/useGetMessages'
import useListenMessages from '../../../hooks/useListenMessages'
import getRecieverId from '../../../utils/getReceiverId'
import Spinner from '../../common/Spinner/Spinner'
import Message from '../Message/Message'
import './Messages.css'

const Messages = () => {
  const { user } = useAuth()
  const { selectedChat, loading } = useChat()
  const { messages } = useGetMessages(
    getRecieverId(user.id, selectedChat.chat.user1_id, selectedChat.chat.user2_id)
  )
  // useListenMessages()

  return (
    <div className="messages">
      {messages?.map((message) => (
        <Message
          key={message.id}
          message={message}
          mine={message.sender_id == user.id}
        />
      ))}

      {loading ? <Spinner /> : <></>}
    </div>
  )
}

export default Messages
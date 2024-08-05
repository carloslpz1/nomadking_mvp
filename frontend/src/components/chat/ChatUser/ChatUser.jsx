import useChat from '../../../hooks/useChat';
import PropTypes from 'prop-types';
import './ChatUser.css'

const ChatUser = ({ chat }) => {
  const { selectedChat, setSelectedChat } = useChat()
  const isSelected = selectedChat?.id === chat.id
  // const { onlineUsers } = useSocketContext()
  // const isOnline = onlineUsers.includes(chat.id.toString())

  const cropText = (text, limit = 8) => {
    if (text.length <= limit) return text

    return text.slice(0, limit - 2) + '...'
  }

  return (
    <div className={`chat-user ${isSelected ? 'active' : ''}`} onClick={() => setSelectedChat(chat)}>
      <div className="avatar">
        <img src={chat.avatar} alt="avatar" />
      </div>
      <p>@{cropText(chat.username)}</p>
    </div>
  )
}

ChatUser.propTypes = {
  chat: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    surname: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
    chat: PropTypes.shape({
      id: PropTypes.number,
      user1_id: PropTypes.number,
      user2_id: PropTypes.number,
    })
  })
}

export default ChatUser
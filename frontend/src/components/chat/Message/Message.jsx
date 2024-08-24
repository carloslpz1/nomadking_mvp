import PropTypes from 'prop-types';
import './Message.css'

const Message = ({ message, mine }) => {
  return (
    <div className={`message ${mine ? 'chat-end' : 'chat-start'}`}>
      <div className={`chat-bubble ${mine ? 'chat-bubble-mine' : ''}`}>
        {message.content}
      </div>
      <span>12:31</span>
    </div>
  )
}

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    chat_id: PropTypes.number,
    sender_id: PropTypes.number,
    receiver_id: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string
  }),
  mine: PropTypes.bool
}

export default Message
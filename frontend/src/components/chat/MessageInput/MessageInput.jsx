import { useState } from 'react'
import useSendMessage from '../../../hooks/useSendMessage'
import Spinner from '../../common/Spinner/Spinner'
import { BsSend } from "react-icons/bs"
import './MessageInput.css'

const MessageInput = () => {
  const [message, setMessage] = useState('')
  const { sendMessage, loading } = useSendMessage()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (message.length == 0) return

    await sendMessage(message)
    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit} className="input-chat-container">
      <div className="input-chat-content">
        <input
          type="text"
          placeholder="Send a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className=""
          disabled={loading}
        />

        <button type="submit" className="">
          {loading ? <Spinner /> : <BsSend />}
        </button>
      </div>
    </form>
  )
}

export default MessageInput
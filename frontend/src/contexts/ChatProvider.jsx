import { useState } from 'react'
import { ChatContext } from './contexts'
import PropTypes from 'prop-types'

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState([])

  return (
    <ChatContext.Provider value={{ selectedChat, setSelectedChat, messages, setMessages }}>
      {children}
    </ChatContext.Provider>
  )
}

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ChatProvider
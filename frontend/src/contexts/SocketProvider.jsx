import { useEffect, useState } from "react"
import { SocketContext } from "./contexts"
import io from 'socket.io-client'
import PropTypes from 'prop-types'
import useAuth from "../hooks/useAuth"

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      const socket = io('http://localhost:3000', {
        query: {
          userId: user.id
        }
      })

      setSocket(socket)

      socket.on('getOnlineUsers', (users) => {
        setOnlineUsers(users)
      })

      return () => socket.close()
    } else {
      if (socket) {
        socket.close()
        setSocket(null)
      }
    }
  }, [user, socket])

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  )
}

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SocketProvider
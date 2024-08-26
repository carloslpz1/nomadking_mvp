import { useEffect, useState } from "react"
import { SocketContext } from "./contexts"
import useNavbar from '../hooks/useNavbar'
import io from 'socket.io-client'
import PropTypes from 'prop-types'
import useAuth from "../hooks/useAuth"

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const { user } = useAuth()
  const { selectedMenuOption } = useNavbar()

  useEffect(() => {
    if (user && selectedMenuOption == 'messages') {
      const socket = io('https://nomadking.onrender.com', {
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
  }, [user, selectedMenuOption])

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
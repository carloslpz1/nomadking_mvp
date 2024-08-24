import { useEffect, useRef, useState } from 'react';
import MessagesContainer from '../MessagesContainer/MessagesContainer';
import ChatUser from '../ChatUser/ChatUser'
import Spinner from '../../common/Spinner/Spinner';
import useGetChats from '../../../hooks/useGetChats';

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import './ChatContainer.css'

const ChatContainer = () => {
  const scrollChatsRef = useRef(null)
  const [showBtnLeft, setShowBtnLeft] = useState(false)
  const [showBtnRight, setShowBtnRight] = useState(false)
  const { chats, loading } = useGetChats()

  useEffect(() => {
    // updateButtonState()
    // TODO: posible problema al ejecutar la build del proyecto por el doble renderizado
    if (scrollChatsRef.current)
      scrollChatsRef.current.addEventListener('scroll', updateButtonState)

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (scrollChatsRef.current) scrollChatsRef.current.removeEventListener('scroll', updateButtonState)
    }
  }, [])

  const updateButtonState = () => {
    setShowBtnLeft(!(scrollChatsRef.current.scrollLeft === 0))
    setShowBtnRight(!(scrollChatsRef.current.scrollLeft + scrollChatsRef.current.clientWidth >= scrollChatsRef.current.scrollWidth))
  }

  const scrollLeft = () => {
    scrollChatsRef.current.scrollBy({
      left: -70,
      behavior: 'smooth'
    })
  }

  const scrollRight = () => {
    scrollChatsRef.current.scrollBy({
      left: 70,
      behavior: 'smooth'
    })
  }

  return (
    <div className="chat-container">
      {
        chats.length > 0
        && <div className="chats-container">
          <div className="chats-users" ref={scrollChatsRef}>
            {showBtnLeft
              ? <div className="btn-circle btn-left" onClick={scrollLeft}>
                <FaAngleLeft />
              </div>
              : <div className="btn-placeholder"></div>
            }
            {chats?.map((chat) => (
              <ChatUser key={chat.id} chat={chat} />
            ))}

            {loading ? <Spinner /> : <></>}
            {showBtnRight
              ? <div className="btn-circle btn-right" onClick={scrollRight}>
                <FaAngleRight />
              </div>
              : <div className="btn-placeholder"></div>
            }
          </div>
        </div>
      }

      <MessagesContainer />
    </div>
  )
}

export default ChatContainer
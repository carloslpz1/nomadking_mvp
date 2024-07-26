import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './PostCard.css'

// Icons
import {
  IoClose,
  IoChatbubbleOutline,
  IoPaperPlaneOutline,
  IoHeart,
  IoHeartOutline,
  IoEllipsisHorizontalOutline,
  IoTrashOutline
} from "react-icons/io5";
import OutsideClickHandler from '../../handlers/OutsideClickHandler';
import useAuth from '../../../hooks/useAuth';
import useToast from '../../../hooks/useToast';

const PostCard = ({ data }) => {
  const [showMedia, setShowMedia] = useState(false)
  const [postMenuOpen, setPostMenuOpen] = useState(false)
  const { addToast } = useToast()
  const { user } = useAuth()
  const apiUrl = import.meta.env.VITE_API_URL
  const comment = false
  const timeAgo = (date) => {
    const now = new Date()
    const secondsPast = (now.getTime() - date.getTime()) / 1000

    if (secondsPast < 60) {
      return `${Math.round(secondsPast)} seconds ago`
    }
    if (secondsPast < 3600) {
      return `${Math.round(secondsPast / 60)} minutes ago`;
    }
    if (secondsPast < 86400) {
      return `${Math.round(secondsPast / 3600)} hours ago`;
    }
    if (secondsPast < 2592000) {
      return `${Math.round(secondsPast / 86400)} days ago`;
    }
    if (secondsPast < 31536000) {
      return `${Math.round(secondsPast / 2592000)} months ago`;
    }
    return `${Math.round(secondsPast / 31536000)} years ago`;
  }

  const handleDelete = async () => {
    console.log(user)
    try {
      const response = await fetch(`${apiUrl}/posts/${data.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        }
      })

      const responseData = await response.json()
      console.log(responseData)

      if (responseData.status == 'success') {
        addToast('Post deleted', 5000)
      }
    } catch (e) {
      console.error(e)
    }

  }

  return (
    <div className="post">
      {data.media
        ? <img src={data.media} alt="Image media" onClick={() => setShowMedia(true)} />
        : <></>
      }

      <div className="detail">
        <Link to={`/profile/${data.user.username}`} className="avatar">
          <img src={data.user.avatar} alt="avatar" />
        </Link>
        <div className="user-info">
          <Link to={`/profile/${data.user.username}`}><b>{data.user.name} {data.user.surname}</b></Link>
          <Link to={`/profile/${data.user.username}`}>@{data.user.username}</Link>
        </div>
        <span className="date">{timeAgo(new Date(data.createdAt))}</span>
      </div>

      <span className="content">{data.content}</span>

      <div className="post-react">
        <div className="action">
          {data.liked ? <IoHeart className="liked" /> : <IoHeartOutline />}
          <span>{data.likes}</span>
        </div>
        <div className="action">
          <IoChatbubbleOutline />
          <span>{data.comments}</span>
        </div>
        <div className="action">
          <IoPaperPlaneOutline />
        </div>
        <div className="action post-menu">
          <OutsideClickHandler onOutsideClick={() => setPostMenuOpen(false)}>
            <IoEllipsisHorizontalOutline onClick={() => setPostMenuOpen((prev) => !prev)} />
            <div className="options" style={postMenuOpen ? { display: 'flex' } : { display: 'none' }}>
              {user.id == data.user.id
                ? <div className="option" onClick={handleDelete}>
                  <IoTrashOutline />
                  <span>Delete</span>
                </div>
                : <></>
              }
            </div>
          </OutsideClickHandler>
        </div>
      </div>

      {comment
        ? <>
          <div className="hl"></div>

          <div className="comment">
            <div className="detail">
              <div className="avatar">
                <img src={data.user.avatar} alt="avatar" />
              </div>
              <div className="user-info">
                <span><b>{data.user.name} {data.user.surname}</b></span>
                <span>@{data.user.username}</span>
              </div>
              <span className="date">{timeAgo(new Date(data.createdAt))}</span>
            </div>

            <span className="content">{data.content}</span>
          </div>
        </>
        : <></>
      }

      <div className={`full-image-container ${showMedia && 'show'}`}>
        <IoClose onClick={() => setShowMedia(false)} />
        <img src={data.media} alt="Image media" />
      </div>

    </div>
  )
}

PostCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    media: PropTypes.string,
    createdAt: PropTypes.string,
    likes: PropTypes.number,
    liked: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      surname: PropTypes.string,
      username: PropTypes.string,
      avatar: PropTypes.string
    }),
    comments: PropTypes.number,
  })
}

export default PostCard
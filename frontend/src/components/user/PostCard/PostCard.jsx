import './PostCard.css'
import PropTypes from 'prop-types';

// Icons
import {
  IoChatbubbleOutline,
  IoPaperPlaneOutline,
  IoHeart,
  IoHeartOutline
} from "react-icons/io5";
import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { useState } from 'react';

const PostCard = ({ data }) => {
  const [showMedia, setShowMedia] = useState(false)
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
        <div className="likes">
          {data.liked ? <IoHeart className="liked" /> : <IoHeartOutline />}
          <span>{data.likes}</span>
        </div>
        <div className="comments">
          <IoChatbubbleOutline />
          <span>{data.comments}</span>
        </div>
        <div className="share">
          <IoPaperPlaneOutline />
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
        <FaTimes onClick={() => setShowMedia(false)} />
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
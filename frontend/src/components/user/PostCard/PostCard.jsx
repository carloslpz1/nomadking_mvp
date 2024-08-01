import { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../common/ConfirmationModal/ConfirmationModal';
import OutsideClickHandler from '../../handlers/OutsideClickHandler';
import useAuth from '../../../hooks/useAuth';
import useToast from '../../../hooks/useToast';
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

const PostCard = ({ data, handleDelete }) => {
  const [postData, setPostData] = useState(data)
  const [showMedia, setShowMedia] = useState(false)
  const [postMenuOpen, setPostMenuOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
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

  // const handleDelete = async () => {
  //   console.log(user)
  //   try {
  //     const response = await fetch(`${apiUrl}/posts/${data.id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${user.token}`,
  //       }
  //     })

  //     const responseData = await response.json()
  //     console.log(responseData)

  //     if (responseData.status == 'success') {
  //       addToast('Post deleted', 5000)
  //     }
  //   } catch (e) {
  //     console.error(e)
  //   }

  // }

  const handleLike = async () => {
    try {
      const response = await fetch(`${apiUrl}/likes`, {
        method: postData.liked ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          user_id: user.id,
          post_id: data.id
        })
      })

      const responseData = await response.json()

      if (responseData.status == 'success') {
        const liked = postData.liked == 0 ? 1 : 0
        const likes = postData.liked ? postData.likes - 1 : postData.likes + 1

        setPostData({ ...data, liked, likes })
      }
    } catch (e) {
      console.error(e)
    }
  }

  const confirmAction = () => {
    handleDelete(postData.id)
    setShowModal(false)
  }

  const cancelAction = () => {
    console.log('close modal')
    setShowModal(false)
  }

  return (
    <div className="post">
      {postData.media
        ? <img src={postData.media} alt="Image media" onClick={() => setShowMedia(true)} />
        : <></>
      }

      <div className="detail">
        <Link to={`/profile/${postData.user.username}`} className="avatar">
          <img src={postData.user.avatar} alt="avatar" />
        </Link>
        <div className="user-info">
          <Link to={`/profile/${postData.user.username}`}><b>{postData.user.name} {postData.user.surname}</b></Link>
          <Link to={`/profile/${postData.user.username}`}>@{postData.user.username}</Link>
        </div>
        <span className="date">{timeAgo(new Date(postData.createdAt))}</span>
      </div>

      <span className="content">{postData.content}</span>

      <div className="post-react">
        <div className="action" onClick={handleLike}>
          {postData.liked ? <IoHeart className="liked" /> : <IoHeartOutline />}
          <span>{postData.likes}</span>
        </div>
        <div className="action">
          <IoChatbubbleOutline />
          <span>{postData.comments}</span>
        </div>
        <div className="action">
          <IoPaperPlaneOutline />
        </div>
        <div className="action post-menu">
          <OutsideClickHandler onOutsideClick={() => setPostMenuOpen(false)}>
            <IoEllipsisHorizontalOutline onClick={() => setPostMenuOpen((prev) => !prev)} />
            <div className="options" style={postMenuOpen ? { display: 'flex' } : { display: 'none' }}>
              {user.id == postData.user.id
                ? <div className="option" onClick={() => {
                  setShowModal(true)
                  setPostMenuOpen(false)
                }}>
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
                <img src={postData.user.avatar} alt="avatar" />
              </div>
              <div className="user-info">
                <span><b>{postData.user.name} {postData.user.surname}</b></span>
                <span>@{postData.user.username}</span>
              </div>
              <span className="date">{timeAgo(new Date(postData.createdAt))}</span>
            </div>

            <span className="content">{postData.content}</span>
          </div>
        </>
        : <></>
      }

      <div className={`full-image-container ${showMedia && 'show'}`}>
        <IoClose onClick={() => setShowMedia(false)} />
        <img src={postData.media} alt="Image media" />
      </div>

      {showModal &&
        <ConfirmationModal
          title="Delete post"
          message="Are you sure you want to delete this post?"
          onConfirm={confirmAction}
          onCancel={cancelAction}
        />
      }

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
  }),
  handleDelete: PropTypes.func
}

export default PostCard
import { useRef, useState } from 'react'
import PropTypes from 'prop-types';
import useToast from '../../../hooks/useToast'
import './CreatePostCard.css'
import profileImg from "../../../assets/images/profileImg.jpg"
import {
  FaTimes,
  FaRegImage,
  FaRegPlayCircle,
  FaMapMarkerAlt,
  FaRegCalendarAlt
} from 'react-icons/fa'
import useAuth from '../../../hooks/useAuth';

const CreatePostCard = ({ userData }) => {
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const imageRef = useRef()
  const { addToast } = useToast()
  const { user } = useAuth()
  const apiUrl = import.meta.env.VITE_API_URL

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0]

      setImage({
        file: img,
        image: URL.createObjectURL(img)
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (content.length > 0) {
      try {
        if (image != null) {
          const formData = new FormData()
          formData.append('file', image.file)

          const mediaResponse = await fetch(`${apiUrl}/storage`, {
            method: 'POST',
            body: formData
          })

          const mediaData = await mediaResponse.json()

          if (mediaData.status == 'error') {
            addToast(mediaData.message, 5000, 'error')
          }

          if (mediaData.status == 'success') {
            const body = {
              content: content,
              media_id: mediaData.data.items.id,
              user_id: userData.id
            }

            const response = await fetch(`${apiUrl}/posts`, {
              method: 'POST',
              headers: {
                'Authorization': user.token,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(body)
            })

            const data = await response.json()

            addToast('New post shared', 5000, 'success')
          }
        } else {
          const body = {
            content: content,
            media_id: null,
            user_id: userData.id
          }

          const response = await fetch(`${apiUrl}/posts`, {
            method: 'POST',
            headers: {
              'Authorization': user.token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
          })

          const data = await response.json()

          addToast('New post shared', 5000, 'success')
        }
      } catch (e) {
        console.error(e)
      }

      setContent('')
      setImage(null)
    } else {
      addToast('Add some text to your post :)', 5000)
    }
  }

  return (
    <div className="create-post-card">
      <img src={userData.avatar} alt="Profile photo" />

      <form className="post-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What's happening"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="post-options">
          {/* TODO: Create a display option for mobile devices */}
          <div
            className="option"
            onClick={() => imageRef.current.click()}
          >
            <FaRegImage />
            Photo
          </div>
          {/* <div className="option">
            <FaRegPlayCircle />
            Video
          </div>
          <div className="option">
            <FaMapMarkerAlt />
            Location
          </div>
          <div className="option">
            <FaRegCalendarAlt />
            Schedule
          </div> */}

          <button
            type="submit"
            className="button ps-button"
          >
            Share
          </button>

          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              id="myImage"
              accept="image/*"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="preview-img">
            <FaTimes onClick={() => setImage(null)} />
            <img src={image.image} alt="" />
          </div>
        )}
      </form>
    </div>
  )
}

CreatePostCard.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    surname: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    career: PropTypes.string,
    age: PropTypes.number,
    birthdate: PropTypes.string,
    avatar: PropTypes.string,
    banner: PropTypes.string,
    followers: PropTypes.number,
    following: PropTypes.number
  })
};

export default CreatePostCard
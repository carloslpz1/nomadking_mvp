import { useRef, useState } from 'react'
import './CreatePostCard.css'
import profileImg from "../../../assets/images/profileImg.jpg"
import {
  FaTimes,
  FaRegImage,
  FaRegPlayCircle,
  FaMapMarkerAlt,
  FaRegCalendarAlt
} from 'react-icons/fa'

const CreatePostCard = () => {
  const [image, setImage] = useState(null)
  const imageRef = useRef()

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0]

      setImage({
        image: URL.createObjectURL(img)
      })
    }
  }

  return (
    <div className="create-post-card">
      <img src={profileImg} alt="Profile photo" />

      <div className="post-input">
        <input type="text" placeholder="What's happening" />

        <div className="post-options">
          {/* TODO: Create a display option for mobile devices */}
          <div
            className="option"
            onClick={() => imageRef.current.click()}
          >
            <FaRegImage />
            Photo
          </div>
          <div className="option">
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
          </div>

          <button className="button ps-button">
            Share
          </button>

          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              id="myImage"
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
      </div>
    </div>
  )
}

export default CreatePostCard
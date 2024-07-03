import './PostCard.css'
import PropTypes from 'prop-types';

// Icons
import {
  IoChatbubbleOutline,
  IoPaperPlaneOutline,
  IoHeart,
  IoHeartOutline
} from "react-icons/io5";

const PostCard = ({ data }) => {
  return (
    <div className="post">
      <img src={data.img} alt="" />

      <div className="post-react">
        {data.liked ? <IoHeart className="liked" /> : <IoHeartOutline />}
        <IoChatbubbleOutline />
        <IoPaperPlaneOutline />
      </div>

      <span>{data.likes} {data.likes > 1 ? "likes" : "like"}</span>

      <div className="detail">
        <span><b>{data.name}</b></span>
        <span> {data.desc}</span>
      </div>
    </div>
  )
}

PostCard.propTypes = {
  data: PropTypes.shape({
    img: PropTypes.node,
    name: PropTypes.string,
    desc: PropTypes.string,
    likes: PropTypes.number,
    liked: PropTypes.bool
  })
}

export default PostCard
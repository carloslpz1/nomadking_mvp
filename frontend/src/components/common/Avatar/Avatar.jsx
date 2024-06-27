import PropTypes from 'prop-types';
import './Avatar.css'

const Avatar = ({ src }) => {
  return (
    <div className="avatar">
      <img src={src} alt="Avatar" />
    </div>
  )
}

Avatar.propTypes = {
  src: PropTypes.string
};

export default Avatar
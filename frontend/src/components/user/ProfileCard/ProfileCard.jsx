import PropTypes from 'prop-types';
import './ProfileCard.css'

import cover from '../../../assets/images/cover.jpg'
// import profile from '../../../assets/images/profileImg.jpg'

const ProfileCard = ({ userData }) => {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <img src={cover} alt="Cover img" className="cover-img" />
        <img src={userData.avatar} alt="Profile img" className="profile-img" />
      </div>

      <div className="profile-name">
        <span>{userData.name} {userData.surname}</span>
        <span>Senior UI/UX Designer</span>
      </div>

      <div className="follow-status">
        <div className="hl"></div>
        <div className="follow-status-container">
          <div className="follow">
            <span>{userData.followers}</span>
            <span>Followers</span>
          </div>

          <div className="vl"></div>

          <div className="follow">
            <span>{userData.following}</span>
            <span>Follow</span>
          </div>
        </div>
        <div className="hl"></div>
      </div>
    </div>
  )
}

ProfileCard.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    surname: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    age: PropTypes.number,
    birthdate: PropTypes.string,
    avatar: PropTypes.string,
    banner: PropTypes.string,
    followers: PropTypes.number,
    following: PropTypes.number
  })
};

export default ProfileCard
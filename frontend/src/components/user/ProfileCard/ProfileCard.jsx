import PropTypes from 'prop-types';
import './ProfileCard.css'

import Avatar from "boring-avatars";
import { names } from '../../../data/boringAvatars'
import cover from '../../../assets/images/cover.jpg'
import { useEffect, useState } from 'react';
// import profile from '../../../assets/images/profileImg.jpg'

const ProfileCard = ({ userData }) => {
  const [boringAvatarId, setBoringAvatarId] = useState(null)

  useEffect(() => {
    let avatarId = localStorage.getItem('avatar')

    if (avatarId === null) {
      avatarId = Math.floor(Math.random() * names.length)
      localStorage.setItem('avatar', avatarId)
    }

    setBoringAvatarId(avatarId)
  }, [])

  return (
    <div className="profile-card">
      <div className="profile-header">
        {userData.banner
          ? <img src={userData.avatar} alt="Profile img" className="profile-img" />
          : <img src={cover} alt="Cover img" className="cover-img" />
        }
        <div className="img-container">
          {userData.avatar
            ? <img src={userData.avatar} alt="Profile img" className="profile-img" />
            : <Avatar
              name={names[boringAvatarId]}
              variant="beam"
              colors={["#FF4E50", "#FC913A", "#F9D423", "#EDE574", "#E1F5C4"]}
            />
          }
        </div>
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
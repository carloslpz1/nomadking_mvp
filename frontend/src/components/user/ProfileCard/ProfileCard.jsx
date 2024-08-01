import PropTypes from 'prop-types';
import './ProfileCard.css'

import Avatar from "boring-avatars";
import { names } from '../../../data/boringAvatars'
import cover from '../../../assets/images/cover.jpg'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
// import profile from '../../../assets/images/profileImg.jpg'

const ProfileCard = ({ userData, profile }) => {
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
        <span className="name">{userData.name} {userData.surname}</span>
        {userData.career
          && <span>{userData.career}</span>
        }
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

          {profile
            ? <><div className="vl"></div>

              <div className="follow">
                <span>{userData.num_posts}</span>
                <span>Posts</span>
              </div>
            </>
            : <></>
          }
        </div>
        <div className="hl"></div>

        {!profile
          ? <button><Link to={`/profile/${userData.username}`}>See profile</Link></button>
          : <></>
        }
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
    career: PropTypes.string,
    age: PropTypes.number,
    birthdate: PropTypes.string,
    avatar: PropTypes.string,
    banner: PropTypes.string,
    followers: PropTypes.number,
    following: PropTypes.number,
    num_posts: PropTypes.number
  }),
  profile: PropTypes.bool
};

export default ProfileCard
import PropTypes from 'prop-types';
import './ProfileCard.css'

import Avatar from "boring-avatars";
import { names } from '../../../data/boringAvatars'
import cover from '../../../assets/images/cover.jpg'
import { useEffect, useState } from 'react';
import useChat from '../../../hooks/useChat'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth';
import useToast from '../../../hooks/useToast';
import { usePostFollow, useDeleteFollow } from '../../../hooks/useFollow';
// import profile from '../../../assets/images/profileImg.jpg'

const ProfileCard = ({ userData, setUserData, profile, otherProfile }) => {
  const navigate = useNavigate()
  const [boringAvatarId, setBoringAvatarId] = useState(null)
  const { user } = useAuth()
  const { addToast } = useToast()
  const { setSelectedChat } = useChat()
  const { postData } = usePostFollow()
  const { deleteData } = useDeleteFollow()

  useEffect(() => {
    let avatarId = localStorage.getItem('avatar')

    if (avatarId === null) {
      avatarId = Math.floor(Math.random() * names.length)
      localStorage.setItem('avatar', avatarId)
    }

    setBoringAvatarId(avatarId)
  }, [])

  const handleFollow = async () => {
    const res = await postData({
      follower_user_id: user.id,
      followed_user_id: userData.id
    })

    if (res) {
      setUserData({ ...userData, follow: 1 })
      addToast(`Now you're following ${userData.username}`, 5000, 'success')
    }
  }

  const handleUnfollow = async () => {
    const res = await deleteData({
      follower_user_id: user.id,
      followed_user_id: userData.id
    })

    if (res) {
      setUserData({ ...userData, follow: 0 })
      addToast(`You just unfollow ${userData.username}`, 5000, 'success')
    }
  }

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

        {otherProfile
          ? (
            <div className="other-user-actions">
              <button className="btn-inverse" onClick={() => {
                setSelectedChat({ ...userData, chat: { user1_id: user.id, user2_id: userData.id } })
                navigate('/messages')
              }}>Message</button>
              {userData.follow
                ? <button onClick={handleUnfollow}>Unfollow</button>
                : <button onClick={handleFollow}>Follow</button>
              }
            </div>
          )
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
    num_posts: PropTypes.number,
    follow: PropTypes.number
  }),
  setUserData: PropTypes.func,
  profile: PropTypes.bool,
  otherProfile: PropTypes.bool
};

export default ProfileCard
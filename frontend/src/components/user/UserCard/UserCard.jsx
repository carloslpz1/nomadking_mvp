import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useToast from '../../../hooks/useToast';
import PropTypes from 'prop-types';
import { IoCheckmark } from "react-icons/io5";
import './UserCard.css'

const UserCard = ({ data }) => {
  const [isFollowed, setIsfollowed] = useState(false)
  const { user } = useAuth()
  const { addToast } = useToast()
  const apiUrl = import.meta.env.VITE_API_URL

  const handleFollow = async () => {
    try {
      const response = await fetch(`${apiUrl}/follows`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          follower_user_id: user.id,
          followed_user_id: data.id
        })
      })

      const responseData = await response.json()
      console.log(responseData)

      if (responseData.status == 'success') {
        setIsfollowed(true)
        addToast(`Now you're following ${data.username}`, 5000, 'success')
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="follower">
      <Link to={`/profile/${data.username}`} className="user-info">
        <img src={data.avatar} alt="" className="follower-img" />
        <div className="name">
          <span>{data.name} {data.surname}</span>
          <span>@{data.username}</span>
        </div>
      </Link>
      {isFollowed
        ? <div className="followed-check">
          <IoCheckmark />
          <span>Following</span>
        </div>
        : <button className="button fc-button" onClick={handleFollow}>
          Follow
        </button>
      }
    </div>
  )
}

UserCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    surname: PropTypes.string,
    username: PropTypes.string,
    avatar: PropTypes.string
  })
}

export default UserCard
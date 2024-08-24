import useAuth from "../../../hooks/useAuth"
import { FaUser, FaAt, FaSuitcase, FaBirthdayCake } from "react-icons/fa"
import { IoMail } from "react-icons/io5"
import PropTypes from 'prop-types';
import './ConfigCard.css'

const ConfigCard = ({ userData, myProfile }) => {
  const { logout } = useAuth()

  return (
    <div className="configcard-container">
      <h4>Profile info</h4>

      <div className="info-item">
        <FaUser />
        <p>{userData.name} {userData.surname}</p>
      </div>

      <div className="info-item">
        <FaAt />
        <p>@{userData.username}</p>
      </div>

      <div className="info-item">
        <IoMail />
        <p>{userData.email}</p>
      </div>

      {userData.career && (
        <div className="info-item">
          <FaSuitcase />
          <p>{userData.career}</p>
        </div>
      )}

      {userData.birthdate && (
        <div className="info-item">
          <FaBirthdayCake />
          <p>{userData.birthdate}</p>
        </div>
      )}

      {myProfile && (
        <div className="info-buttons">
          <button>Edit</button>
          <button onClick={logout}>Logout</button>
        </div>
      )}

    </div>
  )
}

ConfigCard.propTypes = {
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
  myProfile: PropTypes.bool
};

export default ConfigCard
import './ProfileCard.css'

import cover from '../../../assets/images/cover.jpg'
import profile from '../../../assets/images/profileImg.jpg'

const ProfileCard = () => {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <img src={cover} alt="Cover img" className="cover-img" />
        <img src={profile} alt="Profile img" className="profile-img" />
      </div>

      <div className="profile-name">
        <span>Zendaya MJ</span>
        <span>Senior UI/UX Designer</span>
      </div>

      <div className="follow-status">
        <div className="hl"></div>
        <div className="follow-status-container">
          <div className="follow">
            <span>6.890</span>
            <span>Followers</span>
          </div>

          <div className="vl"></div>

          <div className="follow">
            <span>1</span>
            <span>Follow</span>
          </div>
        </div>
        <div className="hl"></div>
      </div>
    </div>
  )
}

export default ProfileCard
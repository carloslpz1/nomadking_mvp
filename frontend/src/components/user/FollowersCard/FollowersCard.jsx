import './FollowersCard.css'

import { followers } from '../../../data/user/followersData'

const FollowersCard = () => {
  return (
    <div className="followers-card">
      <h3>Who is following you</h3>

      {followers.map((follower, id) => (
        <div key={id} className="follower">
          <div className="">
            <img src={follower.img} alt="" className="follower-img" />
            <div className="name">
              <span>{follower.name}</span>
              <span>@{follower.username}</span>
            </div>
          </div>
          <button className="button fc-button">
            Follow
          </button>
        </div>
      ))}
    </div>
  )
}

export default FollowersCard
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import './PlaceRatings.css'

const PlaceRatings = ({ ratingsData }) => {
  const calcStars = (value) => {
    const stars = []
    for (let i = 1; i <= value; i++) {
      stars.push(0)
    }
    if (value < 5) {
      stars.push((1 - Math.abs(value % 1)) * 100)
    }
    for (let i = 1; i < 5 - value; i++) {
      stars.push(100)
    }

    console.log(value)
    return stars
  }

  return (
    <div className="ratings-container">
      <h3>Ratings</h3>
      {ratingsData.map((rating, id) => (
        <div key={id} className="rating">
          <Link to={`/profile/${rating.user.username}`} className="user-container">
            <div className="avatar">
              <img src={rating.user.avatar} alt="avatar" />
            </div>
            <div className="user-info">
              <p className="name">{rating.user.name} {rating.user.surname}</p>
              <p className="username">@{rating.user.username}</p>
            </div>
          </Link>
          <div className="place-rating">
            <div className="stars">
              {calcStars(rating.score).map((star, id) => (
                <div key={id} className="star-holder">
                  <div className="starb" style={{ backgroundPosition: `${star}%` }}></div>
                  <div className="star"></div>
                </div>
              ))}
              <p className="score">{rating.score}</p>
            </div>
          </div>

          <p className="comment">{rating.comment}</p>
        </div>
      ))}
    </div>
  )
}

PlaceRatings.propTypes = {
  ratingsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      score: PropTypes.number,
      comment: PropTypes.string,
      user: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        surname: PropTypes.string,
        username: PropTypes.string,
        account_type: PropTypes.string,
        avatar: PropTypes.string,
        createdAt: PropTypes.string,
        upadtedAt: PropTypes.string,
      }),
      createdAt: PropTypes.string,
      upadtedAt: PropTypes.string,
    })
  )
}

export default PlaceRatings
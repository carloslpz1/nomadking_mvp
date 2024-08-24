import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import './PlaceCard.css'

const PlaceCard = ({ placeData }) => {
  const stars = []
  for (let i = 1; i <= placeData.score_avg; i++) {
    stars.push(0)
  }
  if (placeData.score_avg < 5) {
    stars.push((1 - Math.abs(placeData.score_avg % 1)) * 100)
  }
  for (let i = 1; i < 5 - placeData.score_avg; i++) {
    stars.push(100)
  }

  return (
    <Link to={`/place/${placeData.id}`} className="place-card">
      <div className="image-container">
        <img src={placeData.photo} alt="Place image" />
      </div>
      <div className="place-info">
        <p className="name">{placeData.name}</p>
        <p>{placeData.description}</p>
      </div>
      <div className="place-rating">
        <div className="stars">
          {stars.map((star, id) => (
            <div key={id} className="star-holder">
              <div className="starb" style={{ backgroundPosition: `${star}%` }}></div>
              <div className="star"></div>
            </div>
          ))}
          <p className="score">{placeData.score_avg}</p>
        </div>
        <p className="ratings">{placeData.num_ratings} ratings</p>
      </div>
    </Link>
  )
}

PlaceCard.propTypes = {
  placeData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    score_avg: PropTypes.number,
    op_hours: PropTypes.string,
    internet_qua: PropTypes.string,
    photo: PropTypes.string,
    num_ratings: PropTypes.number,
    phones: PropTypes.string,
    address: PropTypes.shape({
      street: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string
    }),
    createdAt: PropTypes.string,
    upadtedAt: PropTypes.string,
  })
}

export default PlaceCard
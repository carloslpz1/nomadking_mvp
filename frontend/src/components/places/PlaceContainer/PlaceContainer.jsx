import PropTypes from 'prop-types'
import './PlaceContainer.css'

import { FaRegClock, FaWifi, FaPhone, FaMapMarkerAlt, FaMapMarkedAlt } from "react-icons/fa"
import { useState } from 'react'
import MapContainer from '../MapContainer/MapContainer'

const PlaceContainer = ({ placeData }) => {
  const [panelSelected, setPanelSelected] = useState('photo')
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
    <div className="place-container">
      <div className="panel">
        <div className="image-container" style={{ display: `${panelSelected === 'photo' ? 'block' : 'none'}` }}>
          <img src={placeData.photo} alt="Images" />
        </div>

        <div className="map-container" style={{ display: `${panelSelected === 'map' ? 'flex' : 'none'}` }}>
          <MapContainer />
        </div>
      </div>
      <div className="panel-switch">
        <button className={`${panelSelected === 'photo' && 'active'}`} onClick={() => setPanelSelected('photo')}>Photo</button>
        <button className={`${panelSelected === 'map' && 'active'}`} onClick={() => setPanelSelected('map')}>Map</button>
      </div>

      <h1>{placeData.name}</h1>
      <p>{placeData.description}</p>

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

      <div className="place-info">
        <div className="info">
          <FaRegClock />
          <p>{placeData.op_hours}</p>
        </div>
        <div className="info">
          <FaWifi />
          <p>{placeData.internet_qua}</p>
        </div>
        <div className="info">
          <FaMapMarkerAlt />
          <p>{placeData.address.street}</p>
        </div>
        <div className="info">
          <FaPhone />
          <p>{placeData.phones}</p>
        </div>
        <div className="info">
          <FaMapMarkedAlt />
          <p>{placeData.address.city}, {placeData.address.state}</p>
        </div>
      </div>
    </div>
  )
}

const placeRatings = PropTypes.arrayOf(
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

PlaceContainer.propTypes = {
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
    placeRatings: placeRatings,
    createdAt: PropTypes.string,
    upadtedAt: PropTypes.string,
  })
}

export default PlaceContainer
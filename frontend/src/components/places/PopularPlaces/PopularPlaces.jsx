import './PopularPlaces.css'
import { FaRegMap } from 'react-icons/fa'
// Data
import { places } from '../../../data/PlacesData'

const PopularPlaces = () => {
  return (
    <div className="popular-places">
      <div className="title">
        <FaRegMap />
        <h3>Explore Places</h3>
      </div>

      <div className="places">
        {places.map((place, id) => (
          <div key={id} className="place">
            <img src={place.img} alt="" />
            <div className="cover">
              <h4>{place.name}</h4>
              <span>{place.city}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PopularPlaces
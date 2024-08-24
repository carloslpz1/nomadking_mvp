import './PopularPlaces.css'
import { FaRegMap } from 'react-icons/fa'
// Data
// import { places } from '../../../data/PlacesData'
import { Link } from 'react-router-dom'
import { useGetPlaces } from '../../../hooks/usePlace'

const PopularPlaces = () => {
  const { places, loading } = useGetPlaces({ pageSize: 4 })

  return (
    <div className="popular-places">
      <div className="title">
        <FaRegMap />
        <h3><Link to={'/places'}>Explore Places</Link></h3>
      </div>
      {!loading &&
        <div className="places">
          {places?.map((place, id) => (
            <Link key={id} to={`/place/${place.id}`} className="place">
              <img src={place.photo} alt="" />
              <div className="cover">
                <h4>{place.name}</h4>
                <span>{place.address.city}</span>
              </div>
            </Link>
          ))}
        </div>
      }
    </div>
  )
}

export default PopularPlaces
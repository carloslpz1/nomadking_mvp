import { useGetPlaces } from '../../../hooks/usePlace'
import './PlacesContainer.css'

import { FaRegMap } from 'react-icons/fa'
import PlaceCard from '../PlaceCard/PlaceCard'

const PlacesContainer = () => {
  const { places, loading } = useGetPlaces({})

  return (
    <div className="places-container">
      <div className="title">
        <FaRegMap />
        <h2>Explore Places</h2>
      </div>

      {!loading &&
        <div className="places">
          {places?.map((place, id) => (
            <PlaceCard key={id} placeData={place} />
          ))}
        </div>
      }
    </div>
  )
}

export default PlacesContainer
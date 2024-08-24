import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SmallLogo from '../../../components/common/SmallLogo/SmallLogo'
import SearchBar from '../../../components/common/SearchBar/SearchBar'
import ProfileCard from '../../../components/user/ProfileCard/ProfileCard'
import FollowersCard from '../../../components/user/FollowersCard/FollowersCard'
import PlaceContainer from '../../../components/places/PlaceContainer/PlaceContainer'
import CreateRating from '../../../components/places/CreateRating/CreateRating'
import PlaceRatings from '../../../components/places/PlaceRatings/PlaceRatings'
import Navbar from '../../../components/common/Navbar/Navbar'
import PopularPlaces from '../../../components/places/PopularPlaces/PopularPlaces'
import useAuth from '../../../hooks/useAuth'
import useNavbar from '../../../hooks/useNavbar'
import useDocumentTitle from '../../../hooks/useDocumentTitle'
import { useGetPlace } from '../../../hooks/usePlace'
import './Place.css'

const Place = () => {
  const setTitle = useDocumentTitle()
  const { changeSelectedMenuOption } = useNavbar()
  const { placeId } = useParams()
  const { place, loading } = useGetPlace({ placeId })
  const { user } = useAuth()

  useEffect(() => {
    setTitle('Place')
    changeSelectedMenuOption('')
  }, [setTitle, changeSelectedMenuOption])

  return (
    <div className="home-container">
      <section className="profile-side">
        {/* TODO: Upgrade the display on mobile devices */}
        <div className="logo-search">
          <SmallLogo />
          <SearchBar />
        </div>
        <ProfileCard userData={user} />
        <FollowersCard />
      </section>
      <section className="post-side">
        {!loading
          ? <>
            <PlaceContainer placeData={place} />
            <div className="create-rating">
              <CreateRating userData={user} placeId={place.id} />
            </div>
            <PlaceRatings ratingsData={place.places_ratings} />
          </>
          : <p>Loading...</p>
        }
      </section>
      <section className="right-side">
        <div className="navbar">
          <Navbar />
        </div>
        <PopularPlaces />
      </section>
    </div>
  )
}

export default Place
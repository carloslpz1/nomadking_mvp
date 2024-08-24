import { useEffect } from 'react'
import SmallLogo from '../../../components/common/SmallLogo/SmallLogo'
import SearchBar from '../../../components/common/SearchBar/SearchBar'
import ProfileCard from '../../../components/user/ProfileCard/ProfileCard'
import FollowersCard from '../../../components/user/FollowersCard/FollowersCard'
import PlacesContainer from '../../../components/places/PlacesContainer/PlacesContainer'
import Navbar from '../../../components/common/Navbar/Navbar'
import PopularPlaces from '../../../components/places/PopularPlaces/PopularPlaces'
import useDocumentTitle from '../../../hooks/useDocumentTitle'
import useNavbar from '../../../hooks/useNavbar'
import useAuth from '../../../hooks/useAuth'
import './Places.css'

const Places = () => {
  const setTitle = useDocumentTitle()
  const { changeSelectedMenuOption } = useNavbar()
  const { user } = useAuth()

  useEffect(() => {
    setTitle('Places')
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
        {/* <div className="create-post">
          <CreatePostCard userData={user} />
        </div> */}
        <PlacesContainer />
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

export default Places
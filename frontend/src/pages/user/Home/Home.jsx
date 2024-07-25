import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

import Navbar from '../../../components/common/Navbar/Navbar'
import SearchBar from '../../../components/common/SearchBar/SearchBar'
import SmallLogo from '../../../components/common/SmallLogo/SmallLogo'
import FollowersCard from '../../../components/user/FollowersCard/FollowersCard'
import ProfileCard from '../../../components/user/ProfileCard/ProfileCard'
import CreatePostCard from '../../../components/user/CreatePostCard/CreatePostCard'
import PostsLayout from '../../../components/user/PostsLayout/PostsLayout'
import PopularPlaces from '../../../components/places/PopularPlaces/PopularPlaces'

import useDocumentTitle from '../../../hooks/useDocumentTitle'
// import useToast from '../../../hooks/useToast'
import useAuth from '../../../hooks/useAuth'

import './Home.css'

const Home = () => {
  // const navigate = useNavigate()
  const setTitle = useDocumentTitle()
  const { user } = useAuth()

  // const { addToast } = useToast()

  useEffect(() => {
    setTitle('Home')
  }, [setTitle])

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
        <div className="create-post">
          <CreatePostCard userData={user} />
        </div>
        <PostsLayout />
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

export default Home
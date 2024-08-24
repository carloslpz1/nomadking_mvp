import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SmallLogo from '../../../components/common/SmallLogo/SmallLogo'
import SearchBar from '../../../components/common/SearchBar/SearchBar'
import ProfileCard from '../../../components/user/ProfileCard/ProfileCard'
import FollowersCard from '../../../components/user/FollowersCard/FollowersCard'
import CreatePostCard from '../../../components/user/CreatePostCard/CreatePostCard'
import PostsLayout from '../../../components/user/PostsLayout/PostsLayout'
import Navbar from '../../../components/common/Navbar/Navbar'
import PopularPlaces from '../../../components/places/PopularPlaces/PopularPlaces'
import ConfigCard from '../../../components/user/ConfigCard/ConfigCard'
import useAuth from '../../../hooks/useAuth'
import useDocumentTitle from '../../../hooks/useDocumentTitle'
import './Profile.css'

const Profile = () => {
  const navigate = useNavigate()
  const setTitle = useDocumentTitle()
  const { userId } = useParams()
  const { user } = useAuth()
  const [userProfile, setUserProfile] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [myProfile, setMyProfile] = useState(false)
  const apiUrl = import.meta.env.VITE_API_URL

  // If not userid it means is the sesion user profile

  useEffect(() => {
    setMyProfile(userId ? userId === user.username ? true : false : true)
    setTitle(myProfile ? 'Profile' : userId)
  }, [setTitle, userId, myProfile])

  const getUser = useCallback(async () => {
    setLoadingUser(true)
    if (userId) {
      try {
        const response = await fetch(`${apiUrl}/users/${userId.toLowerCase()}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })

        const responseData = await response.json()

        if (responseData.status == 'success') {
          setUserProfile(responseData.data.items)
        } else {
          navigate('/home')
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoadingUser(false)
      }
    } else {
      setUserProfile(user)
      setLoadingUser(false)
    }
  }, [user, userId])

  useEffect(() => {
    getUser()
  }, [getUser])

  return !loadingUser && (
    <div className="home-container">
      <section className="profile-side">
        {/* TODO: Upgrade the display on mobile devices */}
        <div className="logo-search">
          <SmallLogo />
          <SearchBar />
        </div>
        <ConfigCard userData={userProfile} myProfile={myProfile} />
        <FollowersCard />
      </section>
      <section className="post-side">
        <ProfileCard userData={myProfile ? user : userProfile} setUserData={myProfile ? () => { } : setUserProfile} profile otherProfile={!myProfile} />
        {myProfile
          ? <div className="create-post">
            <CreatePostCard userData={user} />
          </div>
          : <></>
        }

        <PostsLayout userId={userProfile.id} myPost />
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

export default Profile
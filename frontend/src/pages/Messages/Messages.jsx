import { useEffect } from "react"
import useAuth from "../../hooks/useAuth"
import useDocumentTitle from "../../hooks/useDocumentTitle"
import useNavbar from "../../hooks/useNavbar"
import "./Messages.css"
import SmallLogo from "../../components/common/SmallLogo/SmallLogo"
import SearchBar from "../../components/common/SearchBar/SearchBar"
import ProfileCard from "../../components/user/ProfileCard/ProfileCard"
import FollowersCard from "../../components/user/FollowersCard/FollowersCard"
import ChatContainer from "../../components/chat/ChatContainer/ChatContainer"
import Navbar from "../../components/common/Navbar/Navbar"
import PopularPlaces from "../../components/places/PopularPlaces/PopularPlaces"

const Messages = () => {
  const setTitle = useDocumentTitle()
  const { changeSelectedMenuOption } = useNavbar()
  const { user } = useAuth()

  useEffect(() => {
    setTitle('Messages')
    changeSelectedMenuOption('messages')
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
        <ChatContainer />
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

export default Messages
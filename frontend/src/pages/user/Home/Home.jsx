import Navbar from '../../../components/common/Navbar/Navbar'
import SearchBar from '../../../components/common/SearchBar/SearchBar'
import SmallLogo from '../../../components/common/SmallLogo/SmallLogo'
import FollowersCard from '../../../components/user/FollowersCard/FollowersCard'
import ProfileCard from '../../../components/user/ProfileCard/ProfileCard'
import './Home.css'

const Home = () => {
  return (
    <div className="home-container">
      <section className="profile-side">
        <div className="logo-search">
          <SmallLogo />
          <SearchBar />
        </div>
        <ProfileCard />
        <FollowersCard />
      </section>
      <section className="post-side">
        <div className="create-post"></div>
        <div className="posts">
          <div className="post"></div>
          <div className="post"></div>
          <div className="post"></div>
          <div className="post"></div>
          <div className="post"></div>
          <div className="post"></div>
          <div className="post"></div>
          <div className="post"></div>
          <div className="post"></div>
          <div className="post"></div>
        </div>
      </section>
      <section className="right-side">
        <div className="navbar">
          <Navbar />
        </div>
      </section>
    </div>
  )
}

export default Home
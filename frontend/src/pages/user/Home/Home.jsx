import Navbar from '../../../components/common/Navbar/Navbar'
import SearchBar from '../../../components/common/SearchBar/SearchBar'
import SmallLogo from '../../../components/common/SmallLogo/SmallLogo'
import FollowersCard from '../../../components/user/FollowersCard/FollowersCard'
import ProfileCard from '../../../components/user/ProfileCard/ProfileCard'
import CreatePostCard from '../../../components/user/CreatePostCard/CreatePostCard'
import './Home.css'
import PostsLayout from '../../../components/user/PostsLayout/PostsLayout'

const Home = () => {
  return (
    <div className="home-container">
      <section className="profile-side">
        {/* TODO: Upgrade the display on mobile devices */}
        <div className="logo-search">
          <SmallLogo />
          <SearchBar />
        </div>
        <ProfileCard />
        <FollowersCard />
      </section>
      <section className="post-side">
        <div className="create-post">
          <CreatePostCard />
        </div>
        <PostsLayout />
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
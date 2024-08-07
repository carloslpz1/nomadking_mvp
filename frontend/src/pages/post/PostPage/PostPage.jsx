import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SmallLogo from '../../../components/common/SmallLogo/SmallLogo'
import SearchBar from '../../../components/common/SearchBar/SearchBar'
import ProfileCard from '../../../components/user/ProfileCard/ProfileCard'
import FollowersCard from '../../../components/user/FollowersCard/FollowersCard'
import PostCard from '../../../components/user/PostCard/PostCard'
import Navbar from '../../../components/common/Navbar/Navbar'
import PopularPlaces from '../../../components/places/PopularPlaces/PopularPlaces'
import useDocumentTitle from '../../../hooks/useDocumentTitle'
import useToast from '../../../hooks/useToast'
import useNavbar from '../../../hooks/useNavbar'
import useAuth from '../../../hooks/useAuth'
import './PostPage.css'
import Spinner from '../../../components/common/Spinner/Spinner'
import Comments from '../../../components/comments/Comments/Comments'
import CreateCommentCard from '../../../components/comments/CreateCommentCard/CreateCommentCard'

const PostPage = () => {
  const navigate = useNavigate()
  const setTitle = useDocumentTitle()
  const { postId } = useParams()
  const { changeSelectedMenuOption } = useNavbar()
  const { user } = useAuth()
  const { addToast } = useToast()

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    setTitle('Post')
    changeSelectedMenuOption('')
  }, [setTitle, changeSelectedMenuOption])

  useEffect(() => {
    const getPost = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${apiUrl}/posts/${postId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })

        const resData = await res.json()

        if (resData.status == 'error') {
          throw new Error(resData.error.message)
        }

        setPost(resData.data.items)

      } catch (e) {
        console.error(e.message)
        addToast(e.message, 5000, 'error')
        navigate('/home')
      } finally {
        setLoading(false)
      }
    }

    getPost()
  }, [addToast, navigate, apiUrl, postId, user])

  const handleDelete = async (id) => {
    console.log(user)
    try {
      const response = await fetch(`${apiUrl}/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        }
      })

      const responseData = await response.json()
      console.log(responseData)

      if (responseData.status == 'success') {
        // setPosts(prevPosts => prevPosts.filter((post) => post.id != id))
        addToast('Post deleted', 5000)
        navigate('/home')
      }
    } catch (e) {
      console.error(e)
    }
  }

  return loading ? <Spinner />
    : (
      <div className="home-container">
        <section className="profile-side">
          <div className="logo-search">
            <SmallLogo />
            <SearchBar />
          </div>
          <ProfileCard userData={user} />
          <FollowersCard />
        </section>
        <section className="post-side">
          <PostCard data={post} handleDelete={handleDelete} />
          <div className="create-comment">
            <CreateCommentCard postId={postId} />
          </div>
          <Comments postId={postId} />
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

export default PostPage
import { useEffect, useState } from 'react'
import PostService from '../../../services/post.service'
import PostCard from '../PostCard/PostCard'
import useAuth from '../../../hooks/useAuth'
import './PostsLayout.css'

// Mocking Data
// import { postsData } from '../../../data/user/PostsData'

const PostsLayout = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    const postService = new PostService()
    const fetchPosts = async () => {
      try {
        const data = await postService.getPostsByFollow(user.id)
        setPosts(data.data.items)
      } catch (e) {
        console.error(e)
      } finally {
        console.log(posts)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="posts">
      {posts?.map((post) => {
        return <PostCard key={post.id} data={post} />
      })}
    </div>
  )
}

export default PostsLayout
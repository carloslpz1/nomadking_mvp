import { useCallback, useEffect, useState } from 'react'
import PostCard from '../PostCard/PostCard'
import useAuth from '../../../hooks/useAuth'
import useScroll from '../../../hooks/useScroll'
import Spinner from '../../common/Spinner/Spinner'
import './PostsLayout.css'

// Mocking Data
// import { postsData } from '../../../data/user/PostsData'

const PostsLayout = () => {
  const [posts, setPosts] = useState([])
  const [pagination, setPagination] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const { user } = useAuth()
  const { isBottom } = useScroll()
  const apiUrl = import.meta.env.VITE_API_URL

  const getPostsByFollow = useCallback(async (page = null) => {
    try {
      setIsLoading(true)

      const response = await fetch(`${apiUrl}/posts/${user.id}/follow${page ? `?page=${page}` : ''}`)
      const data = await response.json()

      if (data.status == 'error') {
        throw new Error(data.message)
      }

      if (page == null) {
        setPosts(data.data.items)
      } else {
        setPosts((prev) => prev.concat(data.data.items))
      }
      setPagination(data.data.pagination)
    } catch (e) {
      console.error('Error getting the posts data', e)
    } finally {
      setIsLoading(false)
    }
  }, [apiUrl, user.id])

  useEffect(() => {
    getPostsByFollow()
  }, [getPostsByFollow])

  useEffect(() => {
    if (isBottom) {
      if (pagination.total_pages > pagination.current_page) {
        console.log('fetch more data')
        getPostsByFollow(pagination.current_page + 1)
        setPagination({ ...pagination, current_page: pagination.total_pages })
      }
    }
  }, [isBottom, getPostsByFollow])

  return (
    <div className="posts">
      {posts.length > 0
        ? posts?.map((post) => {
          return <PostCard key={post.id} data={post} />
        })
        : <p className="info-message">{'Nothing to show here. Post something or start following some people you know.'}</p>
      }
      {isLoading
        ? <Spinner />
        : <></>
      }
    </div>
  )
}

export default PostsLayout
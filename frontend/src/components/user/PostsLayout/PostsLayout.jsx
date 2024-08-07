import { useCallback, useEffect, useState } from 'react'
import PostCard from '../PostCard/PostCard'
import useAuth from '../../../hooks/useAuth'
import useScroll from '../../../hooks/useScroll'
import useToast from '../../../hooks/useToast'
import Spinner from '../../common/Spinner/Spinner'
import PropTypes from 'prop-types';
import './PostsLayout.css'

// Mocking Data
// import { postsData } from '../../../data/user/PostsData'

const PostsLayout = ({ userId, myPost }) => {
  const [posts, setPosts] = useState([])
  const [pagination, setPagination] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const { user } = useAuth()
  const { isBottom } = useScroll()
  const { addToast } = useToast()
  const apiUrl = import.meta.env.VITE_API_URL

  const getPostsByFollow = useCallback(async (page = null) => {
    try {
      setIsLoading(true)

      let response
      if (myPost) {
        console.log(`Pidiendo la data de ${userId}`)
        response = await fetch(`${apiUrl}/posts/${userId ? userId : user.id}/user${page ? `?page=${page}` : ''}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
      } else {
        response = await fetch(`${apiUrl}/posts/${user.id}/follow${page ? `?page=${page}` : ''}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
      }
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
  }, [apiUrl, user, userId, myPost])

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
        setPosts(prevPosts => prevPosts.filter((post) => post.id != id))
        addToast('Post deleted', 5000)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="posts">
      {posts.length > 0
        ? posts?.map((post) => {
          return <PostCard key={post.id} data={post} handleDelete={handleDelete} />
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

PostsLayout.propTypes = {
  userId: PropTypes.number,
  myPost: PropTypes.bool
};

export default PostsLayout
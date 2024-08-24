import { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useAuth from '../../../hooks/useAuth'
import timeAgo from '../../../utils/timeAgo'
import './Comments.css'
import Spinner from '../../common/Spinner/Spinner'
import useScroll from '../../../hooks/useScroll'

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({})
  const { user } = useAuth()
  const { isBottom } = useScroll()
  const apiUrl = import.meta.env.VITE_API_URL

  const getComments = useCallback(async (page = null) => {
    setLoading(true)
    try {
      const res = await fetch(`${apiUrl}/comments/${postId}${page ? `?page=${page}` : ''}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const resData = await res.json()

      if (resData.error) {
        throw new Error(resData.error.message)
      }

      if (page == null) {
        setComments(resData.data.items)
      } else {
        setComments((prev) => prev.concat(resData.data.items))
      }
      setPagination(resData.data.pagination)
    } catch (e) {
      console.error(e.message)
    } finally {
      setLoading(false)
    }
  }, [apiUrl, user, postId])

  useEffect(() => {
    getComments()
  }, [getComments])

  // Lazy loading
  useEffect(() => {
    if (isBottom) {
      if (pagination.total_pages > pagination.current_page) {
        console.log('fetch more comments')
        getComments(pagination.current_page + 1)
        // setPagination({ ...pagination, current_page: pagination.total_pages })
      }
    }
  }, [isBottom, getComments])

  return (
    <div className="comments-container">
      {loading
        ? <Spinner />
        : (comments.length > 0
          ? comments?.map((comment) => (
            <div key={comment.id} className="comment-card">
              <div className="detail">
                <div className="avatar">
                  <img src={comment.user.avatar} alt="avatar" />
                </div>
                <div className="user-info">
                  <span><b>{comment.user.name} {comment.user.surname}</b></span>
                  <span>@{comment.user.username}</span>
                </div>
                <span className="date">{timeAgo(new Date(comment.createdAt))}</span>
              </div>

              <span className="content">{comment.content}</span>
            </div>
          ))
          : <p className="info-message">{'There\'s no comments yet. Be the first one to comment something'}</p>
        )}
    </div>
  )
}

Comments.propTypes = {
  postId: PropTypes.string.isRequired
}

export default Comments
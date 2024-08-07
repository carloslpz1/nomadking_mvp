import { useState } from 'react'
import './CreateCommentCard.css'
import useToast from '../../../hooks/useToast'
import useAuth from '../../../hooks/useAuth'
import { PropTypes } from 'prop-types'
import Spinner from '../../common/Spinner/Spinner'

const CreateCommentCard = ({ postId }) => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const { addToast } = useToast()
  const { user } = useAuth()
  const apiUrl = import.meta.env.VITE_API_URL

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (content.length == 0) return

    setLoading(true)
    try {
      const res = await fetch(`${apiUrl}/comments/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ content })
      })

      const resData = await res.json()

      if (resData.error) {
        throw new Error(resData.error.message)
      }

      addToast('Comment added', 5000, 'success')
    } catch (e) {
      console.log(e.message)
      addToast(e.message, 3000, 'error')
    } finally {
      setLoading(false)
      setContent('')
    }
  }

  return (
    <div className="create-comment-container">
      <img src={user.avatar} alt="Profile photo" />

      <form className="comment-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Place a comment here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
        />

        <div className="comment-options">
          {loading
            ? <Spinner />
            : <button type="submit" className="button ps-button">
              Share
            </button>
          }

        </div>
      </form>
    </div>
  )
}

CreateCommentCard.propTypes = {
  postId: PropTypes.string.isRequired
}

export default CreateCommentCard
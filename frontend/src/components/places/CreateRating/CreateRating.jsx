import { useState } from 'react'
import { Link } from 'react-router-dom'
import useToast from '../../../hooks/useToast'
import { usePostRating } from '../../../hooks/usePlace'
import PropTypes from 'prop-types'
import './CreateRating.css'

const CreateRating = ({ userData, placeId }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  // const { user } = useAuth()
  const { addToast } = useToast()
  const { postRating, loading, error } = usePostRating()

  const calcStars = (value) => {
    const stars = []
    for (let i = 1; i <= value; i++) {
      stars.push(0)
    }
    if (value < 5) {
      stars.push((1 - Math.abs(value % 1)) * 100)
    }
    for (let i = 1; i < 5 - value; i++) {
      stars.push(100)
    }

    console.log(value)
    return stars
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (rating == 0) {
      addToast('Add some stars', 5000)
      return
    }

    await postRating({
      place_id: placeId,
      score: rating,
      comment: comment.length === 0 ? null : comment
    })

    if (!error) {
      addToast('You add your review', 5000, 'success')
    }

    setRating(0)
    setComment('')
  }

  return (
    <div className="create-rating">
      <Link to={`/profile/${userData.username}`} className="user-container">
        <div className="avatar">
          <img src={userData.avatar} alt="avatar" />
        </div>
        <div className="user-info">
          <p className="name">{userData.name} {userData.surname}</p>
          <p>@{userData.username}</p>
        </div>
      </Link>

      <div className="rating">
        <div className="stars">
          {calcStars(rating).map((star, id) => (
            <div key={id} className="star-holder">
              <div className="starb" style={{ backgroundPosition: `${star}%` }}></div>
              <div className="star" onClick={() => setRating(id + 1)}></div>
            </div>
          ))}
          <p className="score">{rating.score}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Here you can leave a review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {loading
          ? <p>Loading...</p>
          : <button>Rate</button>
        }
      </form>
    </div>
  )
}

CreateRating.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
    username: PropTypes.string,
    avatar: PropTypes.string,
  }),
  placeId: PropTypes.number
}

export default CreateRating
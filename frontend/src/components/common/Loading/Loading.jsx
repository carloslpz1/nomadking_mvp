import Spinner from '../Spinner/Spinner'
import './Loading.css'

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner">
        <Spinner />
      </div>
      <span>Loading...</span>
    </div>
  )
}

export default Loading
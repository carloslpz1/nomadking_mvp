import { useParams } from 'react-router-dom'
import './Profile.css'

const Profile = () => {
  const { userId } = useParams()

  // If not userid it means is the sesion user profile

  return (
    <div>{userId}</div>
  )
}

export default Profile
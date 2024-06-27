import { useNavigate } from 'react-router-dom'
import './SmallLogo.css'

const SmallLogo = () => {
  const navigate = useNavigate()

  return (
    <div className="small-logo" onClick={() => navigate('/home')}>
      <span>N</span>K
    </div>
  )
}

export default SmallLogo
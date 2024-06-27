import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <Link to={'/help'}>Help</Link>
        <Link to={'/blog'}>Blog</Link>
        <div className="logo">
          <h2>Nomad<br />King</h2>
        </div>
        <Link to={'/company'}>Company</Link>
        <Link to={'policies'}>Policies</Link>
      </div>
      <p>&copy; 2024 Nomadking. All rights reserved.</p>
    </footer>
  )
}

export default Footer
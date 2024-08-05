import { useNavigate } from 'react-router-dom'
import useNavbar from '../../../hooks/useNavbar'
import './Navbar.css'
// Iconos
import {
  IoHomeOutline,
  IoHomeSharp,
  IoChatboxEllipsesOutline,
  IoChatboxEllipsesSharp,
  IoNotificationsOutline,
  IoNotifications,
  IoSettingsOutline,
  IoSettingsSharp,
} from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate()
  const { selectedMenuOption } = useNavbar()

  return (
    <div className="navbar-container">
      <div className="nav-option">
        {selectedMenuOption === 'home'
          ? <IoHomeSharp className="selected" />
          : <IoHomeOutline onClick={() => navigate('/home')} />
        }
      </div>
      <div className="nav-option">
        {selectedMenuOption === 'messages'
          ? <IoChatboxEllipsesSharp className="selected" />
          : <IoChatboxEllipsesOutline onClick={() => navigate('/messages')} />
        }
      </div>
      <div className="nav-option">
        {selectedMenuOption === 'notifications'
          ? <IoNotifications className="selected" />
          : <IoNotificationsOutline onClick={() => navigate('/notifications')} />
        }
      </div>
      <div className="nav-option">
        {selectedMenuOption === 'settings'
          ? <IoSettingsSharp className="selected" />
          : <IoSettingsOutline onClick={() => navigate('/settings')} />
        }
      </div>
    </div>
  )
}

export default Navbar
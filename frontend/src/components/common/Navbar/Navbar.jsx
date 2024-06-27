import './Navbar.css'
// Iconos
import {
  IoHomeOutline,
  IoHomeSharp,
  IoSettingsOutline,
  IoSettingsSharp,
  IoChatboxEllipsesOutline,
  IoChatboxEllipsesSharp,
  IoNotificationsOutline,
  IoNotifications
} from "react-icons/io5";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="nav-option">
        <IoHomeSharp className="selected" />
      </div>
      <div className="nav-option">
        <IoSettingsOutline />
      </div>
      <div className="nav-option">
        <IoChatboxEllipsesOutline />
      </div>
      <div className="nav-option">
        <IoNotificationsOutline />
      </div>
    </div>
  )
}

export default Navbar
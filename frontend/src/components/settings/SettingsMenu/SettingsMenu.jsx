import './SettingsMenu.css'

import { FaChevronLeft } from "react-icons/fa"

const SettingsMenu = () => {
  return (
    <div className="settings-menu">
      <div className="option selected">
        <FaChevronLeft />
        <p>Your account</p>
      </div>
      <div className="option">
        <FaChevronLeft />
        <p>Premium</p>
      </div>
      <div className="option">
        <FaChevronLeft />
        <p>Security and account access</p>
      </div>
      <div className="option">
        <FaChevronLeft />
        <p>Privacy and safety</p>
      </div>
      <div className="option">
        <FaChevronLeft />
        <p>Notifications</p>
      </div>
      <div className="option">
        <FaChevronLeft />
        <p>Help center</p>
      </div>
    </div>
  )
}

export default SettingsMenu
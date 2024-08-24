import { useEffect } from 'react'
import Navbar from '../../../components/common/Navbar/Navbar'
import './Settings.css'
import useDocumentTitle from '../../../hooks/useDocumentTitle'
import useNavbar from '../../../hooks/useNavbar'
import useAuth from '../../../hooks/useAuth'
import SettingsMenu from '../../../components/settings/SettingsMenu/SettingsMenu'
import { Account } from '../../../components/settings/Account/Account'

const Settings = () => {
  const setTitle = useDocumentTitle()
  const { changeSelectedMenuOption } = useNavbar()
  const { user } = useAuth()

  useEffect(() => {
    setTitle('Settings')
    changeSelectedMenuOption('settings')
  }, [setTitle, changeSelectedMenuOption])

  return (
    <div className="settings-container">
      <div className="settings">
        <div className="settings-header">
          <h2>Your account</h2>
        </div>
        <Account />
      </div>
      <div className="sidebar">
        <div className="navbar">
          <Navbar />
        </div>
        <SettingsMenu />
      </div>
    </div>
  )
}

export default Settings
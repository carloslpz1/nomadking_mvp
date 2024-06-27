import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import Plans from './pages/Plans/Plans'
import Login from './pages/auth/Login/Login'
import Signup from './pages/auth/Signup/Signup'
import Home from './pages/user/Home/Home'
import Error404 from './pages/Error404/Error404'
import ThemeSwitcher from './components/common/ThemeSwitcher/ThemeSwitcher'
import DocumentTitleProvider from './contexts/DocumentTitleProvider'
import ToastProvider from './contexts/ToastProvider'
import './App.css'

function App() {
  return (
    <DocumentTitleProvider>
      <ToastProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/plans' element={<Plans />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

            <Route path='/home' element={<Home />} />
            {/* Otras rutas */}
            <Route path='*' element={<Error404 />} />
          </Routes>
          <div className="theme-container">
            <ThemeSwitcher right />
          </div>
        </Router>
      </ToastProvider>
    </DocumentTitleProvider>
  )
}

export default App

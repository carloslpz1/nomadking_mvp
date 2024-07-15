import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/route/ProtectedRoute/ProtectedRoute'
import Landing from './pages/Landing/Landing'
import Plans from './pages/Plans/Plans'
import Login from './pages/auth/Login/Login'
import Signup from './pages/auth/Signup/Signup'
import Home from './pages/user/Home/Home'
import Error404 from './pages/Error404/Error404'
import ThemeSwitcher from './components/common/ThemeSwitcher/ThemeSwitcher'
import './App.css'
import useAuth from './hooks/useAuth'


function App() {
  const { isLoading } = useAuth()

  return (
    <>
      {isLoading
        ? <div>Loading...</div>
        : <>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/plans' element={<Plans />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            {/* Protected routes */}
            <Route
              path='/home'
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            {/* Otras rutas */}
            <Route path='*' element={<Error404 />} />
          </Routes>

          <div className="theme-container">
            <ThemeSwitcher right />
          </div>
        </>
      }
    </>
  )

}

export default App

import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/route/ProtectedRoute/ProtectedRoute'
import Landing from './pages/Landing/Landing'
import Plans from './pages/Plans/Plans'
import Login from './pages/auth/Login/Login'
import Signup from './pages/auth/Signup/Signup'
import Home from './pages/user/Home/Home'
import Profile from './pages/user/Profile/Profile'
import PostPage from './pages/post/PostPage/PostPage'
import Messages from './pages/Messages/Messages'
import Settings from './pages/user/Settings/Settings'
import Error404 from './pages/Error404/Error404'
import ThemeSwitcher from './components/common/ThemeSwitcher/ThemeSwitcher'
import Loading from './components/common/Loading/Loading'
import useAuth from './hooks/useAuth'
import './App.css'
import Places from './pages/place/Places/Places'
import Place from './pages/place/Place/Place'


function App() {
  const { isLoading } = useAuth()

  return (
    <>
      {isLoading
        ? <Loading />
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
            <Route
              path='/profile/:userId'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/post/:postId'
              element={
                <ProtectedRoute>
                  <PostPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/messages'
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              }
            />
            <Route
              path='/settings'
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path='/places'
              element={
                <ProtectedRoute>
                  <Places />
                </ProtectedRoute>
              }
            />
            <Route
              path='/place/:placeId'
              element={
                <ProtectedRoute>
                  <Place />
                </ProtectedRoute>
              }
            />

            {/* Otras rutas */}
            <Route path='*' element={<Error404 />} />
          </Routes>

        </>
      }
      <div className="theme-container">
        <ThemeSwitcher right />
      </div>
    </>
  )

}

export default App

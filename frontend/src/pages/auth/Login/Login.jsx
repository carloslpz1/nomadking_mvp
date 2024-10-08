import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../../components/common/Header/Header'
import Footer from '../../../components/common/Footer/Footer'
import ButtonLoading from '../../../components/common/ButtonLoading/ButtonLoading'
import useDocumentTitle from '../../../hooks/useDocumentTitle'
import useToast from '../../../hooks/useToast'
import useAuth from '../../../hooks/useAuth'

import { FaGoogle, FaFacebookF, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa'

import './Login.css'

const Login = () => {
  const navigate = useNavigate()
  const setTitle = useDocumentTitle()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [showPass, setShowPass] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { addToast } = useToast()
  // const { user } = useAuth()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/home')
    }
  }, [navigate])

  useEffect(() => {
    setTitle('Login')
  }, [setTitle])

  const validate = () => {
    const errors = {}

    if (!email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid'
    }

    if (!password) {
      errors.password = 'Password is required'
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }

    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      // Handle successful login
      setIsLoading(true)
      try {
        const res = await login({ email, password })

        if (res.status == 'error') {
          addToast(res.message, 5000, 'error')
        }

        if (res.status == 'success') {
          addToast(res.message, 5000, 'success')
          navigate('/home')
        }
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <>
      <Header />
      <div className="login-container">
        <div className="form-container">
          <h2>Log in with</h2>
          <div className="log-options">
            <button className="log-option google">
              <FaGoogle />
              Google
            </button>
            <button className="log-option fb">
              <FaFacebookF />
              Facebook
            </button>
          </div>
          <span>or</span>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="Enter email address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="input-error"><FaTimes /><p>{errors.email}</p></div>}
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <div className="input-pass">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="pass"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="show-pass" onClick={() => setShowPass(!showPass)}>
                  {
                    showPass
                      ? <FaEye />
                      : <FaEyeSlash />
                  }
                </div>
              </div>
              {errors.password && <div className="input-error"><FaTimes /><p>{errors.password}</p></div>}
            </div>
            {
              isLoading
                ? <ButtonLoading />
                : <button type="submit" className="btn">Log In</button>
            }
          </form>
        </div>
        <p>Don&apos;t have an account? <Link to={'/signup'}>Sign up</Link></p>
      </div>
      <Footer />
    </>
  )
}

export default Login
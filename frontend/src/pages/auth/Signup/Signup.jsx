import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Header from '../../../components/common/Header/Header'
import Footer from '../../../components/common/Footer/Footer'
import { FaGoogle, FaFacebookF, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa'
import './Signup.css'
import useDocumentTitle from '../../../hooks/useDocumentTitle'

const Signup = () => {
  const setTitle = useDocumentTitle()
  const { state } = useLocation()
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [showPass, setShowPass] = useState(false)

  useEffect(() => {
    setTitle('Signup')
  }, [setTitle])

  useEffect(() => {
    if (state != null && state.email) {
      setEmail(state.email)
    }
  }, [state])

  const validate = () => {
    const errors = {}

    if (!name) {
      errors.name = 'Name is required'
    }

    if (!surname) {
      errors.surname = 'Surname is required'
    }

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

  const handleSubmit = (e) => {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
    } else {
      // Handle successful signup
    }
  }

  return (
    <>
      <Header />
      <div className="login-container">
        <div className="form-container">
          <h2>Sign up with</h2>
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
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <div className="input-error"><FaTimes /><p>{errors.name}</p></div>}
            </div>
            <div className="input-field">
              <label htmlFor="surname">Surname</label>
              <input
                type="text"
                placeholder="Enter your surname"
                name="surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
              {errors.surname && <div className="input-error"><FaTimes /><p>{errors.surname}</p></div>}
            </div>
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
            <button type="submit" className="btn">Sign In</button>
          </form>
        </div>
        <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
      </div>
      <Footer />
    </>
  )
}

export default Signup
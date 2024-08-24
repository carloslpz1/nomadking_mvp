import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Header from '../../../components/common/Header/Header'
import Footer from '../../../components/common/Footer/Footer'
import ButtonLoading from '../../../components/common/ButtonLoading/ButtonLoading'
import useDocumentTitle from '../../../hooks/useDocumentTitle'
import useToast from '../../../hooks/useToast'
import { FaGoogle, FaFacebookF, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa'
import './Signup.css'

const Signup = () => {
  const navigate = useNavigate()
  const setTitle = useDocumentTitle()
  const { state } = useLocation()
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [showPass, setShowPass] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { addToast } = useToast()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      navigate('/home')
    }
  }, [navigate])

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
    } else if (name.length < 3) {
      errors.name = 'Name is too short'
    }

    if (!surname) {
      errors.surname = 'Surname is required'
    } else if (surname.length < 3) {
      errors.surname = 'Surname is too short'
    }

    if (!username) {
      errors.username = 'Surname is required'
    } else if (!/^[a-zA-z0-9_]+$/.test(username)) {
      errors.username = "Only can contain letters, numbers and '_'"
    } else if (username.length < 3) {
      errors.username = 'Username is too short'
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

  const checkUsername = async () => {
    if (username.length > 0) {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${username}/check`, {
          method: 'GET'
        })

        if (!response.ok) {
          const errorData = await response.json()
          setErrors({ ...errors, username: errorData.error.message })
          throw new Error(errorData.error.message)
        }

        setErrors({ ...errors, username: undefined })
      } catch (e) {
        console.error(e)
      }
    } else {
      setErrors({ ...errors, username: undefined })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      // Handle successful signup
      setIsLoading(true)
      try {
        const response = await fetch('http://localhost:3000/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, surname, username, email, password })
        })

        if (!response.ok) {
          const errorData = await response.json()
          addToast(errorData.error.message, 5000, 'error')
          throw new Error(errorData.error.message)
        }

        // const data = await response.json()

        addToast('Account successfuly created!', 5000, 'success')
        navigate('/login')
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
              <label htmlFor="username">username</label>
              <input
                type="text"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={checkUsername}
              />
              {errors.username && <div className="input-error"><FaTimes /><p>{errors.username}</p></div>}
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
            {
              isLoading
                ? <ButtonLoading />
                : <button type="submit" className="btn">Sign In</button>
            }
          </form>
        </div>
        <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
      </div>
      <Footer />
    </>
  )
}

export default Signup
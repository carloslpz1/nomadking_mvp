import { useRef, useState } from 'react'
import ButtonLoading from '../../common/ButtonLoading/ButtonLoading'
import useAuth from '../../../hooks/useAuth'
import useToast from '../../../hooks/useToast'
import './Account.css'

import { BsPencil } from "react-icons/bs"
import { LiaTimesSolid } from "react-icons/lia"
import { FaTimes } from "react-icons/fa"

export const Account = () => {
  const { addToast } = useToast()
  const { user, setUser } = useAuth()
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    con_password: '',
    career: '',
    birthdate: user.birthdate ? user.birthdate : ''
  })
  const [password, setPassword] = useState('')
  const [image, setImage] = useState(null)
  const imageRef = useRef()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const apiUrl = import.meta.env.VITE_API_URL

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0]

      setImage({
        file: img,
        image: URL.createObjectURL(img)
      })
    }
  }

  const validate = () => {
    const errors = {}

    if (userData.name.length > 0 && userData.name.length < 3) {
      errors.name = 'Name is too short'
    }

    if (userData.surname.length > 0 && userData.surname.length < 3) {
      errors.surname = 'Surname is too short'
    }

    if (userData.username.length > 0) {
      if (userData.username.length < 3) {
        errors.username = 'Username is too short'
      } else if (!/^[a-zA-z0-9_]+$/.test(userData.username)) {
        errors.username = "Only can contain letters, numbers and '_'"
      }
    }

    if (userData.email.length > 0) {
      if (!/\S+@\S+\.\S+/.test(userData.email)) {
        errors.email = 'Email address is invalid'
      }
    }

    if (userData.password.length > 0 && userData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    } else if (userData.password !== userData.con_password) {
      errors.con_password = 'Passwords do not match'
    }

    return errors
  }

  const checkUsername = async () => {
    if (userData.username.length > 0) {
      try {
        const response = await fetch(`${apiUrl}/users/${userData.username}/check`, {
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
      if (password.length > 0) {
        const sendData = {
          name: userData.name ? userData.name : user.name,
          surname: userData.surname ? userData.surname : user.surname,
          username: userData.username ? userData.username : user.username,
          email: userData.email ? userData.email : user.email,
          password: userData.password ? userData.password : null,
          career: userData.career ? userData.career : user.career,
          birthdate: userData.birthdate ? userData.birthdate : user.birthdate,
          avatar: null,
          check_password: password,
        }

        setLoading(true)
        try {
          if (image != null) {
            const formData = new FormData()
            formData.append('file', image.file)

            const mediaResponse = await fetch(`${apiUrl}/storage`, {
              method: 'POST',
              body: formData
            })

            const mediaData = await mediaResponse.json()

            if (mediaData.error) {
              throw new Error(mediaData.error.message)
            }

            sendData.avatar = mediaData.data.items.id
          }

          const res = await fetch(`${apiUrl}/users`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(sendData)
          })

          const resData = await res.json()

          if (resData.error) {
            throw new Error(resData.error.message)
          }

          addToast('Your data has been updated successfuly', 5000, 'success')
          setUser({ ...resData.data.items, token: resData.token })
        } catch (e) {
          addToast(e.message, 5000, 'error')
          console.log(e.message)
        } finally {
          setLoading(false)
        }
      } else {
        addToast('You must pass your current password in order to update your data', 5000, 'error')
      }
    }
  }

  return (
    <div className="account-container">
      <div className="editable">
        {image
          ? <div className="edit-avatar" onClick={() => setImage(null)}>
            <LiaTimesSolid />
          </div>
          : <div className="edit-avatar" onClick={() => imageRef.current.click()}>
            <BsPencil />
          </div>
        }
        <div className="avatar">
          <img src={image ? image.image : user.avatar} alt="avatar" />
        </div>
      </div>

      <p>Change the fields you want to update and leave blank the others you want to keep.</p>

      <form onSubmit={handleSubmit} className="user-data">
        <div className="col col-1">
          <div className="input-field">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder={user.name}
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
            {errors.name && <div className="input-error"><FaTimes /><p>{errors.name}</p></div>}
          </div>
          <div className="input-field">
            <label htmlFor="">Username</label>
            <input
              type="text"
              placeholder={user.username}
              value={userData.username}
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
              onBlur={checkUsername}
            />
            {errors.username && <div className="input-error"><FaTimes /><p>{errors.username}</p></div>}
          </div>
          <div className="input-field">
            <label htmlFor="">New password</label>
            <input
              type="password"
              placeholder="Place your new password"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            />
            {errors.password && <div className="input-error"><FaTimes /><p>{errors.password}</p></div>}
          </div>
          <div className="input-field">
            <label htmlFor="">Career</label>
            <input
              type="text"
              placeholder={user.career ? user.career : 'what do you do for a living'}
              value={userData.career}
              onChange={(e) => setUserData({ ...userData, career: e.target.value })}
            />
          </div>
        </div>
        <div className="col col-2">
          <div className="input-field">
            <label htmlFor="">Surname</label>
            <input
              type="text"
              placeholder={user.surname}
              value={userData.surname}
              onChange={(e) => setUserData({ ...userData, surname: e.target.value })}
            />
            {errors.surname && <div className="input-error"><FaTimes /><p>{errors.surname}</p></div>}
          </div>
          <div className="input-field">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder={user.email}
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
            {errors.email && <div className="input-error"><FaTimes /><p>{errors.email}</p></div>}
          </div>
          <div className="input-field">
            <label htmlFor="">Confirm new password</label>
            <input
              type="password"
              placeholder="Confirm your new password"
              value={userData.con_password}
              onChange={(e) => setUserData({ ...userData, con_password: e.target.value })}
            />
            {errors.con_password && <div className="input-error"><FaTimes /><p>{errors.con_password}</p></div>}
          </div>
          <div className="input-field">
            <label htmlFor="">Birthdate</label>
            <input
              type="date"
              // max={() => {
              //   const today = new Date()
              //   const y = today.getFullYear()
              //   const m = today.getMonth() + 1
              //   const d = today.getDate()

              //   return `${y}-${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d}`
              // }}
              value={userData.birthdate}
              onChange={(e) => setUserData({ ...userData, birthdate: e.target.value })}
            />
            {errors.birthdate && <div className="input-error"><FaTimes /><p>{errors.birthdate}</p></div>}
          </div>
        </div>

        <div className="col col-3">
          <div className="input-field">
            <label htmlFor="">Enter you current password in order to update</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {loading
            ? <ButtonLoading />
            : <button type="submit" className="btn">Log In</button>
          }
        </div>

        <div style={{ display: "none" }}>
          <input
            type="file"
            name="myImage"
            id="myImage"
            accept="image/*"
            ref={imageRef}
            onChange={onImageChange}
          />
        </div>
      </form>
    </div>
  )
}

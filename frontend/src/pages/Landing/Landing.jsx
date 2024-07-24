import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import Header from '../../components/common/Header/Header'
import Footer from '../../components/common/Footer/Footer'
import Avatar from '../../components/common/Avatar/Avatar'

import './Landing.css'

import avatars from '../../data/avatars'
// Illustrations
import searchIl from '../../assets/images/searching.svg';
import meetingIl from '../../assets/images/meeting.svg';
import coupleIl from '../../assets/images/couple.svg';
import travelIl from '../../assets/images/travel.svg';

const Landing = () => {
  const setTitle = useDocumentTitle()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/home')
    }
  }, [navigate])

  useEffect(() => {
    setTitle('')
  }, [setTitle])

  const handleNavigate = (path, state = {}) => {
    navigate(path, { state: state })
  }

  return (
    <>
      <Header />
      <main className="landing-content">
        <section className="join-us">
          <div className="join-us-info">
            <h2>Join us and improve your experience as nomad in the city</h2>
            <div className="people">
              {avatars.map((avatar, index) => (
                <Avatar key={index} src={avatar} />
              ))}
            </div>
            <div className="attributes">
              <p>🧑🏦Get to know the city and the culture</p>
              <p>👫🎈Meet new people</p>
              <p>💼📶Manages to work efficiently</p>
            </div>
          </div>

          <div className="join-us-form">
            <form action="">
              <input
                type="email"
                placeholder="Type your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={() => handleNavigate('/signup', { email: email })}>Join us</button>
              <p>If you already have an account <Link to={'/login'}>login</Link></p>
            </form>
          </div>
        </section>

        <section className="info">
          <div className="info-container info-1">
            <h3>Find places around the city</h3>
            <p>Find the perfect work spot in any city! Our platform helps remote workers discover efficient, convenient locations to stay productive. Explore top-rated cafes, coworking spaces, and more tailored to your needs.</p>
            <div className="illustration">
              <img src={searchIl} alt="Girl searching in the platform." />
              <div className="box"></div>
            </div>
          </div>

          <div className="info-container info-2">
            <h3>Arrive and work without problems</h3>
            <p>Arrive in any city and start working seamlessly! Our platform connects remote workers with ideal locations for productivity. Discover cafes, coworking spaces, and more designed for your remote work needs.</p>
            <div className="illustration">
              <div className="circle"></div>
              <img src={meetingIl} alt="Girls having a meeting." />
            </div>
          </div>

          <div className="info-container info-3">
            <div className="illustration">
              <div className="illu-1">
                <img src={coupleIl} alt="A couple resting in their backs." className="couple" />
                <h3 className="text-meet">Meet new<br />people</h3>
              </div>
              <div className="illu-2">
                <h3 className="text-travel"><span>Keep</span><br /> traveling</h3>
                <img src={travelIl} alt="A couple sitting in a motorcicle." className="travel" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Landing
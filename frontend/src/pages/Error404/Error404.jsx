import { useEffect } from 'react'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import Header from '../../components/common/Header/Header'
import Footer from '../../components/common/Footer/Footer'
import './Error404.css'

import Working404 from '../../assets/images/error404.svg'

const Error404 = () => {
  const setTitle = useDocumentTitle()

  useEffect(() => {
    setTitle('Page not found')
  }, [setTitle])

  return (
    <>
      <Header />
      <div className="not-found-container">
        <h1>404</h1>
        <p>Page not found. We&apos;re probably working on it.</p>
        <img src={Working404} alt="Guy with headphones and working on a laptop." />
      </div>
      <Footer />
    </>
  )
}

export default Error404
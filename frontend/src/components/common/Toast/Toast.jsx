import { useEffect } from 'react'
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import './Toast.css'

const Toast = ({ message, type, duration = 5000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className={`toast-container ${type}`} style={{ animation: `fadein 300ms, fadeout 300ms ${duration}ms` }}>
      <div className="message">{message}</div>
      <FaTimes onClick={onClose} />
      <div className="timer" style={{ animationDuration: `${duration}ms` }}></div>
    </div>
  )
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired
};

export default Toast
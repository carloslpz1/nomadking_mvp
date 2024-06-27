import { useCallback, useState } from "react"
import { ToastContext } from "./contexts"
import Toast from "../components/common/Toast/Toast"
import PropTypes from 'prop-types';

const styles = {
  position: 'fixed',
  bottom: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '16px'
}

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, duration = 3000, type = '') => {
    const id = Math.random().toString(36).substring(2, 9)

    setToasts((prevToasts) => [...prevToasts, { id, message, duration, type }])

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, duration)
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div style={styles}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            duration={toast.duration}
            type={toast.type}
            onClose={() => setToasts((prevToasts) => prevToasts.filter((t) => t.id !== toast.id))}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ToastProvider
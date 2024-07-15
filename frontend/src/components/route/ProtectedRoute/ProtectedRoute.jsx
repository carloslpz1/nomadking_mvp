import { Navigate } from "react-router-dom"
import useAuth from '../../../hooks/useAuth'
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to={'/login'} />
  } else {
    return children
  }

}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProtectedRoute
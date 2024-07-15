import { useContext } from "react"
import { AuthContext } from "../contexts/contexts"

const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth
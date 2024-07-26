import { useContext } from "react"
import { ScrollContext } from "../contexts/contexts"

const useScroll = () => {
  return useContext(ScrollContext)
}

export default useScroll

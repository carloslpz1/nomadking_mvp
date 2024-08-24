import { useContext } from "react";
import { SocketContext } from "../contexts/contexts";

const useSocket = () => useContext(SocketContext)

export default useSocket
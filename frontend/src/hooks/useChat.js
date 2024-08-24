import { useContext } from "react";
import { ChatContext } from "../contexts/contexts";

const useChat = () => useContext(ChatContext)

export default useChat
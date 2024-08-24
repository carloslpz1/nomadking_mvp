import { useContext } from "react";
import { NavbarContext } from "../contexts/contexts";

const useNavbar = () => useContext(NavbarContext)

export default useNavbar
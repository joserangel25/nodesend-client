import { useContext } from "react";
import { AuthContext } from "../context/auth/authContext";

export const useAuthContext = () => {
  return useContext(AuthContext)
}
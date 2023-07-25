import { useContext } from "react";
import { AppContext } from "../context/app/appContext";

export const useAppContext = () => {
    return useContext(AppContext)
}
import { useContext } from "react";
import { authContext } from "../context/authContext";

export const useAuthContext = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error("useAuthContext doit être utilisé dans un AuthProvider");
    }
    return context;
};
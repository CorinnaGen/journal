import { useContext } from "react";
import authContext from "../contexts/auth";

function useAuth() {
    //context consumer
    //to be able to use the sign in and sign out functions
  return useContext(authContext);
}

export default useAuth;
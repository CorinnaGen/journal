import { useState } from "react";
import axios from "axios";

// this is a custom hook that provides a reactive state to know if the user is authenticated or not
// it also provides two functions to signin and signout
function useProvideAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));


//This will be imported in the login component
  const signin = async (user, cb = () => {}) => {
    try {
      const { data } = await axios.post("/users/login", user);

      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      console.log(data.token)
      // an open door so we can do anything after logging in
      cb(data);
    } catch (err) {
      throw err.response.data.message;
    }
  };

  const signout = (cb = () => {}) => {
    localStorage.clear("token");
    setIsLoggedIn(null);
    cb();
  };

  return {
    isLoggedIn,
    signin,
    signout,
  };
}

export default useProvideAuth;
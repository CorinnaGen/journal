import React, {useState} from 'react'
import axios from 'axios'

function Login() {

 const [credentials, setCredentials] = useState({
    username: "test",
    password: "test",
  });

  const { username, password } = credentials;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {

      console.log("am i in the login?")
    try {
      const { data } = await axios("/users/login", {
        method: "POST",
        data: credentials,
        
      });

      //store it locally
      localStorage.setItem("token", data.token);
      console.log(data.message, data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    console.log('am i in the logout?')
  };

  // const requestData = async () => {
  //   try {
  //     const { data } = await axios("/journal_entries", {
  //       headers: {
  //         authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });

  //     console.log('this is the data', data.message);
  //   } catch (error) {
  //     console.log('is this the error?', error);
  //   }
  // };



    return (
       
        <div className="container bg-light shadow mt-4">
                <h2 className='darker'>Welcome back!</h2>
                <br />
            <h3 className='darker'>Login</h3>
            
                <div className="col-6">
            <label>Username</label>
            <input type="text" name="username" placeholder="type your username" value={username} className="form-control" onChange={(e)=>handleChange(e)}/>
            <label>Password</label>
            <input type="password" name="password" className="form-control" value={password} onChange={(e)=>handleChange(e)}/>
            <button className="btn btn-test6 bg-test6 m-4" type="submit" onClick={login}>Log in</button>
           
            <div className="col-6 mt-4">
            <a href="#"> I forgot my password!</a>
            </div>
            </div>
            
             <button className="btn btn-test6 bg-test6 m-4" onClick={logout}>Log out</button>
              {/* <button className="btn btn-test6 bg-test6 m-4" onClick={requestData}>see entries</button> */}
        </div>
    )
}

export default Login

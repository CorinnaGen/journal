import React, {useState} from 'react'
import axios from 'axios'

function Login() {

 const [credentials, setCredentials] = useState({
    username: "test",
    password: "test",
  });

  const { username, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
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

//   const logout = () => {
//     localStorage.removeItem("token");
//   };

  const requestData = async () => {
    try {
      const { data } = await axios("/journal_entries", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };



    return (
       
        <div className="container bg-light shadow mt-4">
                <h2 className='darker'>Welcome back!</h2>
                <br />
            <h3 className='darker'>Login</h3>
            <form onSubmit={login} >
                <div className="col-6">
            <label>Username</label>
            <input type="text" name="username" placeholder="type your username" value={username} className="form-control" onChange={(e)=>handleChange(e)}/>
            <label>Password</label>
            <input type="password" name="password" className="form-control" value={password} onChange={(e)=>handleChange(e)}/>
            <button className="btn btn-test6 bg-test6 m-4">Log in</button>
            <div className="col-6 mt-4">
            <a href="#"> I forgot my password!</a>
            </div>
            </div>
            </form>
        </div>
    )
}

export default Login

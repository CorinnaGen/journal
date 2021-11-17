import React, { useState} from 'react'


function Registration() {
const [user, setUser] = useState({ name: "", email: "", password: "", repeat_password: ""});


const [error, setError] = useState("");
const handleInputChange = (event) => {
event.preventDefault();
 const {value, name} = event.target;
setUser((state) => ({...state, [name]: value}))
}
const handleSubmit = (event) => {
event.preventDefault();
register();
}

 const register = async () => {
     try {
        const response = await fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      const newUser = await response.json();
    //   props.onDoneCb(newUser);
    setUser(newUser)
      
   //Where is this data going 
    } catch (error) {
      setError(error.message);
    }
  
}
const {name, email, password, repeat_password} = user;
 
    return (
        <div>
            <div className="container bg-light shadow mt-4">
            <h1>Registration</h1>
             
            <form id="registrationform" onSubmit={handleSubmit}>
            
<div className="col-6 mt-4">
                <label className="form-label mt-4">Username</label>
                <input 
                className="form-control"
                type="text"
                name="name"
                value={name}
                required
                onChange={(e)=>handleInputChange(e)}
                />
                </div>
                <div className="col-6 mt-4">
                <label className="form-label mt-4">Email</label>
                <input
                className="form-control"
                type="email"
                name="email"
                value={email}
                required
                 onChange={(e)=>handleInputChange(e)}
                />
                </div>
                <div className="col-6 mt-4">
                <label className="form-label mt-4">Password</label>
                <input 
                className="form-control"
                type="password"
                name="password"
                value={password}
                required
                 onChange={(e)=>handleInputChange(e)}
                />
                </div>
                <div className="col-6 mt-4">
                <label className="form-label mt-4">Repeat Password</label>
                <input 
                className="form-control"
                type="password"
                name="repeat_password"
                value={repeat_password}
                required
                minLength="8"
                 onChange={(e)=>handleInputChange(e)}
                />
                </div>
                <div className="col-6 mt-4">
                <div class="form-check">
  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={(e)=>handleInputChange(e)} />
  <label className="form-check-label" htmlFor="flexCheckDefault">
    I agree with Terms of Use
  </label>
</div>
</div>
<div className="col-6 mt-4">
                <button type="submit" className="btn btn-test6 bg-test6 m-4">Register</button>
            </div>
            </form>
            
            </div>
            
        </div>
    )
}

export default Registration

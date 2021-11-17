import React from 'react'

function Login() {





    return (
       
        <div className="container bg-light shadow mt-4">
                <h2 className='darker'>Welcome back!</h2>
                <br />
            <h3 className='darker'>Login</h3>
            <form >
                <div className="col-6">
            <label>E-mail</label>
            <input type="text" name="email" placeholder="example@gmail.com" className="form-control" />
            <label>Password</label>
            <input type="password" name="password" className="form-control "/>
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

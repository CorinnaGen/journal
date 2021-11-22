import React from 'react'
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
// import mainlogo from "./Photos/logo.png";

function Welcome() {

 const auth = useAuth();
  const navigate = useNavigate();
  const logout = () => {
    auth.signout(() => navigate("/login"));
  };

    return (
        <div className="container bg-light shadow mt-4">
         
            <h3 className="darker">Welcome!</h3>
            <div className="col-6">
                <h4>About MyJournal</h4>
                <br/>
                <p>MyJournal provides a safe space for you to write down your toughts, to reflect and remember your moments of Joy.</p>
                <p>Besides, you can fill your own safety plan: what are your triggers? What are things that lift you up?</p>
                <p>And least but not last, now MyJournal offers a mood tracker functionality!</p>
            </div>
            <div className="row">
                <div className="col-6">
            {!auth.isLoggedIn && (	<Link to={`/register`}>
					<button className="btn bg-test6 btn-test6 m-4">
						Register
					</button>
				</Link>)}
           
                 {!auth.isLoggedIn && (	<Link to={`/login`}>
                   
					<button className="btn bg-test6 btn-test6 m-4">
						Login
					</button>
				</Link>)}

              {auth.isLoggedIn && (	<Link to={`/dashboard`}>
                   
					<button className="btn bg-test6 btn-test6 m-4">
						Register
					</button>
				</Link>)}
           
                 {auth.isLoggedIn && (	
                   
					<button  onClick={logout} className="btn bg-test6 btn-test6 m-4">
						Logout
					</button>
				)}
                
                  
                
                </div>
                

                </div>
        </div>
    )
}

export default Welcome

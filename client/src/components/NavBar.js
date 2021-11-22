import React from 'react'
import useAuth from "../hooks/useAuth";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function NavBar() {
    const auth = useAuth();
    // const navigate = useNavigate();
    // const logout = () => {
    // auth.signout(() => navigate("/login"));
//   };
    return (
        <div>
            <nav className="navbar sticky-top shadow navbar-expand-lg navbar-dark bg-test5">
					<div className="container">
						<a className="navbar-brand" href={`/`}>
							{/* <img width="50" height="50" src={mainlogo} /> */}
						</a>
						<button
							className="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#navbarNavAltMarkup"
							aria-controls="navbarNavAltMarkup"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
							<div className="navbar-nav">
								{!auth.isLoggedIn &&(<a className="nav-link mx-4" href={`/`}>
									Welcome
								</a>)}
								{auth.isLoggedIn &&( <a className="nav-link mx-4" href={`/dashboard`}>
									Dashboard
								</a>)}
							    
								{auth.isLoggedIn && (<a className="nav-link mx-4" href={`/journal`}>
									Journal
								</a>)}
							

								{auth.isLoggedIn && (<a className="nav-link mx-4" href={`/journal/joys`}>
									Moments of Joy
								</a>) }
								
								{auth.isLoggedIn && (<a className="nav-link mx-4" href={`/safetyplan`}>
									Safety Plan
								</a>)}

								{auth.isLoggedIn && (<a className="nav-link mx-4" href={`/tracker`}>
									Tracker
								</a>)}
								
								{!auth.isLoggedIn &&(<a className="nav-link mx-4" href={`/login`}>
									Login
								</a>) }	

                                {/* {auth.isLoggedIn && (	
                   
					<button  onClick={logout} className="btn bg-test6 btn-test6 m-4">
						Logout
					</button>
				)} */}
								
								{!auth.isLoggedIn &&(<a className="nav-link mx-4" href={`/register`}>
									Register
								</a>)}
								
							</div>
						</div>
					</div>
				</nav>
        </div>
    )
}

export default NavBar

import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import NavBar from './NavBar';
import mainlogo from "../Photos/logo.png";

function Welcome() {

 const auth = useAuth();
  const navigate = useNavigate();
  const logout = () => {
    auth.signout(() => navigate("/login"));
  };

    return (
        <div><NavBar />
        <div className="container bg-light shadow mt-4">
        
            <h3 className="darker">Welcome!</h3>
            <div className="ro4 m-4">
                <h4>About Emme's Journal</h4>
                <br/>
                <div className='col-8'>
                
                <div className='cardbody m-4'>
                <p>MyJournal provides a <strong>safe space</strong> for you to write down your toughts, to reflect and remember your moments of <strong>Joy</strong>.</p>
                <p>Besides, you can fill your own <strong>safety plan</strong>: what are your triggers? What are the things that lift you up?</p>
                <p>And least but not last, now MyJournal offers a <strong>mood tracker</strong> functionality!</p>
                </div>
                </div>
                <div className='col-8'>
                
                <div className='cardbody m-4'>
                    <img src={mainlogo} className='img-fluid' alt='logo' />
                </div>
                
                </div>
            
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
        </div>
    )
}

export default Welcome

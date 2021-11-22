import React from 'react'

function Logout() {

  const logout = () => {
    localStorage.removeItem("token");
    console.log('am i in the logout?')
  };
    return (
        <div>
             <button className="btn btn-test6 bg-test6 m-4" onClick={logout}>Log out</button>
            
        </div>
    )
}

export default Logout

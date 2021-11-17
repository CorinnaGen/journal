import React, {useState} from 'react'

function Tracker() {
    const [sumMood, setSumMood] = useState([]);

//display mood of each day
//having a function assign a weight to each mood
//automatic message to emergency contact



    return (
        <div className="container bg-light shadow mt-4">
            <h3 className="darker"> Tracker</h3>
            <p>In this section you can see a summary of your whole month</p>

            
        </div>
    )
}

export default Tracker

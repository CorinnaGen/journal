import React, {useState, useEffect} from 'react'

function Tracker() {
    const [sumMood, setSumMood] = useState([]);
    const [entries, setEntries] = useState([])
    const [error, setError] = useState([])

//fetch the entries
// useEffect(getEntries, []);

// const getEntries = async () =>{
//     try {
// 			const response = await fetch(`/journal_entries`);
// 			const data = await response.json();
// 			setEntries(data);
// 		} catch (err) {
// 			setError(err);
// 		}
// }

    //to generate a mood value
const generateMoodValue = () => {
const sumMood = 0;
setEntries.map(entry => {
    switch(entry.mood){
        case 'Happy' :
        sumMood += 120; 
            break;
        case 'Hopeful' :
        sumMood += 100; 
            break;
        case 'Optimistic' :
        sumMood += 110; 
            break;
        case 'Tired' :
        sumMood += 60; 
            break;
        case 'Anxious' :
        sumMood += 60; 
            break;
        case 'Disconnected' :
        sumMood += 30; 
            break;
            case 'Sad' :
        sumMood -= 120; 
            break;
        case 'Depressed' :
        sumMood -= 120; 
            break;
    }
    
})
}

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

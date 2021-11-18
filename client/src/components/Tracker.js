import React, {useState, useEffect} from 'react'
import "./Tracker.css"

function Tracker() {
   
    const [entries, setEntries] = useState([]) //this is an array of obj
    const [error, setError] = useState([])
    

	useEffect(async () => {
		try {
			const response = await fetch("/journal_entries");
			const data = await response.json();
			setEntries(data);
            
            //should I put here generateMoodValue
		} catch (err) {
			setError(err);
		}
	}, []);

//to generate a mood value

const sumMood = entries.map(entry => {
    switch(entry.mood){
        case 'Happy' :
        return 'green'
        case 'Hopeful' :
        return 'light-green'
        case 'Optimistic' :
        return 'light-blue'
        case 'Tired' :
        return 'grey'
        case 'Anxious' :
        return 'yellow'
        case 'Disconnected' :
        return 'orange'
         case 'Angry' :
        return 'red'
            case 'Sad' :
        return 'purple'
        case 'Depressed' :
        return 'black'
            
    }
 
});
console.log(entries)
console.log(sumMood)
  

    return (
        <div className="container bg-light shadow mt-4">
            <h3 className="darker"> Tracker</h3>
            <p>Your mood in the past days based on your entries</p>
            <div className="row m-4">
            {sumMood.map((mood, i) => (
                            <div className="col-3" key={i}>
                            {(mood === 'green') ? (<div className="mood green"></div>)
                            : (mood ==='light-green') ?
                            (<div className=" mood light-green"></div>)
                            : (mood === 'light-blue') ? (<div className="mood light-blue"></div>)
                            : (mood === 'grey') ? (<div className="mood grey"></div>)
                            : (mood === 'yellow') ? (<div className=" mood yellow"></div>)
                            : (mood === 'orange') ? (<div className="mood orange"></div>)
                            : (mood ==='red') ? (<div className="mood red"></div>)
                            : (mood === 'purple') ? (<div className="mood purple"></div>)
                            : (<div className="mood black"></div>)}  
                            </div>
                    
              
            ))}  
            </div>
            
        </div>
    )
}

export default Tracker

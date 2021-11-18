import React, {useState, useEffect} from 'react'
import "./Tracker.css"

function Tracker() {
   
    const [entries, setEntries] = useState([]) //this is an array of obj
    const [error, setError] = useState([])
    //const [sumMood, setSumMood] = useState([])

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
            <p>In this section you can see a summary of your whole month</p>
            {sumMood.map(mood => (
                <div className="row m-4">
                    <div className="col-6">
                            {(mood === 'green') ? (<div className="green">Happy</div>)
                            : (mood ==='light-green') ?
                            (<div className="light-green">Hopeful</div>)
                            : (mood === 'light-blue') ? (<div className="light-blue">Optimistic</div>)
                            : (mood === 'grey') ? (<div className="grey">Tired</div>)
                            : (mood === 'yellow') ? (<div className="yellow">Anxious</div>)
                            : (mood === 'orange') ? (<div className="orange">Disconnected</div>)
                            : (mood ==='red') ? (<div className="red">Angry</div>)
                            : (mood === 'purple') ? (<div className="purple">Sad</div>)
                            : (<div className="black">Depressed</div>)}  
                    </div>
                </div>
            ))}
            
        </div>
    )
}

export default Tracker

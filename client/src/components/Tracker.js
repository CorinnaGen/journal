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
        return 'happy'
        case 'Hopeful' :
        return 'hopeful'
        case 'Optimistic' :
        return 'optmistic'
        case 'Tired' :
        return 'tired'
        case 'Anxious' :
        return 'anxious'
        case 'Disconnected' :
        return 'disconnected'
         case 'Angry' :
        return 'angry'
            case 'Sad' :
        return 'sad'
        case 'Depressed' :
        return 'depressed'
            
    }
 
});
console.log(entries)
console.log(sumMood)

//to display the prevalent mood among the entries

let prevalentMood = sumMood.reduce((counter, current) => (counter[current] = counter[current] + 1 || 1, counter), {});
//it returns an object like this {tired: 1, angry: 1, sad: 1, depressed: 1, happy: 1}
let moodTrack = [];
for(let key in prevalentMood){
if(prevalentMood[key] > 1){
 moodTrack.push(key)
}}

console.log(moodTrack)
  

    return (
        <div className="container bg-light shadow mt-4">
            <h3 className="darker"> Tracker</h3>
            <p>Your mood in the past days based on your entries</p>
            {moodTrack.map((el, i) => (
                <div key={i}>
                <p>You felt mostly: {el}</p>
                </div>
            ))}
            <div className="row m-4">
            {sumMood.map((mood, i) => (
                            <div className="col-3" key={i}>
                            {(mood === 'happy') ? (<div className="mood happy"></div>)
                            : (mood ==='hopeful') ?
                            (<div className=" mood hopeful"></div>)
                            : (mood === 'optimistic') ? (<div className="mood optimistic"></div>)
                            : (mood === 'tired') ? (<div className="mood tired"></div>)
                            : (mood === 'anxious') ? (<div className=" mood anxious"></div>)
                            : (mood === 'disconnected') ? (<div className="mood disconnected"></div>)
                            : (mood ==='angry') ? (<div className="mood angry"></div>)
                            : (mood === 'sad') ? (<div className="mood sad"></div>)
                            : (<div className="mood depressed"></div>)}  
                            </div>
                    
              
            ))} 
            </div>
            
        </div>
    )
}

export default Tracker

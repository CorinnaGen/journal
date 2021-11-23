import React, {useState, useEffect} from 'react'
import axios from 'axios'
import "./Tracker.css"
import NavBar from './NavBar'
import Noty from 'noty'
import "../../node_modules/noty/lib/themes/bootstrap-v4.css";
import "../../node_modules/noty/lib/themes/relax.css"; 
import "../../node_modules/noty/lib/noty.css";  

function Tracker() {
   
    const [entries, setEntries] = useState([]) //this is an array of obj
    const [error, setError] = useState([])
 
    
useEffect(async () => {
		try {
			// const response = await fetch("/journal_entries");
			// const data = await response.json();
			// 
        const { data } = await axios("/journal_entries", {
        headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEntries(data);
            
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
        return 'optimistic'
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

console.log('this is the sum mood array', sumMood)


//I count the times the user felt the same mood
let prevalentMood = sumMood.reduce((counter, current) => (counter[current] = counter[current] + 1 || 1, counter), {}); 
//it returns an object like this {tired: 1, angry: 1, sad: 1, depressed: 1, happy: 1}

//Store the prevalent mood to show to the user / prevalent you felt more than 3 times that way
let moodTrack = [];
for(let key in prevalentMood){
if(prevalentMood[key] > 3){
 moodTrack.push(key)
}}

console.log('this is prevalent mood', prevalentMood)
console.log('this is the moodtrack array', moodTrack)


//if you felt a negative emotion more than 3 days in a row


let sadCount = 0;
for(let i=0; i < sumMood.length; i++){
 if(sumMood[i]  === 'sad' || sumMood[i] === 'depressed' || sumMood[i] === 'angry' || sumMood[i] === 'disconnected'
   && sumMood[i+1] === 'sad' || sumMood[i+1] === 'depressed' || sumMood[i+1] === 'angry' || sumMood[i+1] === 'disconnected'
  && sumMood[i+2] === 'sad' || sumMood[i+2] === 'depressed' || sumMood[i+2] === 'angry' || sumMood[i+2] === 'disconnected')
 sadCount++
}

console.log('this is sad count',sadCount)

//if you felt a positive emotion more than 3 days in a row
let happyCount = 0;
for(let i=0; i < sumMood.length; i++){
 if(sumMood[i]  === 'happy' || sumMood[i] === 'hopeful' || sumMood[i] === 'optimistic' 
   && sumMood[i+1] === 'happy' || sumMood[i+1] === 'hopeful' || sumMood[i+1] === 'optimistic'
  && sumMood[i+2] === 'happy' || sumMood[i+2] === 'hopeful' || sumMood[i+2] === 'optimistic' )
 happyCount++
}
console.log('this is happycount', happyCount)


const moodbalance = () =>{
if(happyCount > sadCount){
    return new Noty({
    type: 'warning',
    theme: 'relax',
    layout: 'topRight',
    text: 'Overall things are good, cheerish these moments!',
    timeout: 3000,
}).show();
} else if(happyCount < sadCount){
    return new Noty({
    type: 'warning',
    theme: 'relax',
    layout: 'topRight',
    text: 'You had some difficult days, check your safety plan',
    timeout: 3000,
}).show();
}else{
    return new Noty({
    type: 'info',
    theme: 'relax',
    layout: 'topRight',
    text: 'Keep tracking your mood!',
    timeout: 3000,
}).show();

}
}
moodbalance();
  

    return (
        <div> <NavBar/>
        <div className="container bg-light shadow mt-4">
            <h3 className="darker"> Tracker</h3>
            <p>Your mood in the past days based on your entries</p>
            <p>You felt mostly:</p>
            {moodTrack.map((el, i) => (
                <div key={i}>
                <p>{el}</p>
                </div>
            ))}
            <div className="row m-4">
            {sumMood.map((mood, i) => (
                            <div className="col-3" key={i}>
                            {(mood === 'happy') ? (<div className="mood happy"></div>)
                            : (mood ==='hopeful') ?
                            (<div className="mood hopeful"></div>)
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
        </div>
    )
}

export default Tracker

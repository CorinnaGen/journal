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
 
//get the entries
useEffect(async () => {
		try {

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




//store in array all the mood entries, the name are associated with css class to display the squares in different colors
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


//I count the times the user felt the same mood, storing each mood as a key and assign a value, representing how many times said mood appears
let prevalentMood = sumMood.reduce((counter, current) => (counter[current] = counter[current] + 1 || 1, counter), {}); 
//{tired: 1, angry: 1, sad: 1, depressed: 1, happy: 1}

//Once I have this object, I loop into it to store only the mood with a values of more than 5 // this display in 'You felt xxx for more than 5 days'
let moodTrack = [];
for(let key in prevalentMood){
if(prevalentMood[key] > 5){
 moodTrack.push(key)
}}



//To pop up notification when a particular set of emotions shows more than 3 days in a row 

//Sadness
let sadCount = 0;
for(let i=0; i < sumMood.length; i++){
 if(sumMood[i]  === 'sad' || sumMood[i] === 'depressed' || sumMood[i] === 'disconnected'
   && sumMood[i+1] === 'sad' || sumMood[i+1] === 'depressed' || sumMood[i+1] === 'disconnected'
  && sumMood[i+2] === 'sad' || sumMood[i+2] === 'depressed'  || sumMood[i+2] === 'disconnected')
 sadCount++
}



//Anxiety
let anxietyCount = 0;
for(let i=0; i < sumMood.length; i++){
 if(sumMood[i]  === 'anxious' || sumMood[i] === 'tired' || sumMood[i] === 'angry' 
   && sumMood[i+1] === 'anxious' || sumMood[i+1] === 'tired' || sumMood[i+1] === 'angry'
  && sumMood[i+2] === 'anxious' || sumMood[i+2] === 'tired' || sumMood[i+2] === 'angry' )
 anxietyCount++
}


//Happiness
let happyCount = 0;
for(let i=0; i < sumMood.length; i++){
 if(sumMood[i]  === 'happy' || sumMood[i] === 'hopeful' || sumMood[i] === 'optimistic' 
   && sumMood[i+1] === 'happy' || sumMood[i+1] === 'hopeful' || sumMood[i+1] === 'optimistic'
  && sumMood[i+2] === 'happy' || sumMood[i+2] === 'hopeful' || sumMood[i+2] === 'optimistic' )
 happyCount++
}
// console.log('this is happycount', happyCount)


const moodbalance = () =>{
if(happyCount > sadCount && anxietyCount < 2 ){
    return new Noty({
    type: 'warning',
    theme: 'relax',
    layout: 'topRight',
    text: 'Overall things are good, cheerish these moments!',
    timeout: 3000,
}).show();
} else if(happyCount < sadCount || anxietyCount > 2){
    return new Noty({
    type: 'warning',
    theme: 'relax',
    layout: 'topRight',
    text: 'You had some difficult days, check your safety plan',
    timeout: 3000,
}).show();
}else if(sadCount < anxietyCount){
    return new Noty({
    type: 'info',
    theme: 'relax',
    layout: 'topRight',
    text: 'Seems you could use some relaxation exercises',
    timeout: 3000,
}).show();

}
}

//it still triggers 2 times, but the first the counters are empty so no noty shows
useEffect(() =>{moodbalance()}, [entries]) 
  

    return (
        <div> <NavBar/>
        <div className="container bg-light shadow mt-4">
            <h3 className="darker"> Tracker</h3>
            <p>Your mood in the past days based on your entries</p>
            <p>You felt for more than 5 days:</p>
            <ul>
            {moodTrack.map((el, i) => (
                <div key={i}>
                <li>{el}</li>
                </div>
            ))}
            </ul>
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

import React from "react";
import { Link } from "react-router-dom";
import journalpic from "../Photos/myjournal.png";
import sfplanpic from "../Photos/mysafetyplan.png";
import joypic from "../Photos/mymomentsofjoy.png";
import moodpic from "../Photos/moodtracker.png";
import NavBar from "./NavBar";


import "../App.css";

export default function Dashboard() {

	

	return (
		<div><NavBar />
		<div className="container shadow bg-light mt-4 mb-4">
			 
			<h3 className="darker">Welcome!</h3> <hr />
			
			<div className="text-center">
				<Link to={`/journal/`}>
					<img className="img-fluid shadow" width="40%" src={journalpic} />
				</Link>
				<br />
				<br />
				<Link to={`/journal/joys`}>
					<img className="img-fluid shadow" width="40%" src={joypic} />
				</Link>
				<br />
				<br />
				<Link to={`/safetyplan`}>
					<img className="img-fluid shadow" width="40%" src={sfplanpic} />
				</Link>
				<br />
				<br />
				<Link to={`/tracker`}>
					<img className="img-fluid shadow" width="40%" src={moodpic} />
				</Link>
			</div>
			<br />
			<br />
		</div>
		</div>
	);
}

import React from "react";
import { Link } from "react-router-dom";

import "../App.css";

export default function Home() {
	return (
		<div>
			<br />
			<div className="container shadow bg-light">
				<h3 className="test5">Welcome!</h3> <hr />
				<Link to={`/journal/`}>
					<img src="https://www.teachingenglish.org.uk/sites/teacheng/files/styles/large/public/og/gallery/class_journals_iStock_000021675732XSmall.jpg?itok=UJFlJ2go/" />{" "}
				</Link>
				<Link to={`/journal/joys`}>
					<img src="https://lumiere-a.akamaihd.net/v1/images/au_character_insideout_bio_joy_847d0fd9.jpeg?region=0,0,600,600" />
				</Link>
				<Link to={`/safetyplan`}>
					<img src="https://www.diabnext.com/wp-content/uploads/2019/04/peer-supports.jpg" />
				</Link>
			</div>
			<br />
		</div>
	);
}

import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";

import "../App.css";

export default function Journal() {
	let [entries, setEntries] = useState([]);

	useEffect(async () => {
		try {
			const response = await fetch("/journal_entries");
			const data = await response.json();
			setEntries(data);
		} catch (err) {
			console.log(err);
		}
	}, []);

	return (
		<div>
			<h1> Journal </h1>{" "}
			<div>
				{entries &&
					entries.map((entry) => (
						<div key={entry.id}>
							<Link to={`/journal/${entry.id}`}>{entry.title}</Link>
						</div>
					))}
			</div>
			<hr />
			<Outlet />
		</div>
	);
}

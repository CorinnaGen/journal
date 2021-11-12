import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../App.css";

export default function Journal() {
	let [entries, setEntries] = useState([]);
	let navigate = useNavigate();

	useEffect(async () => {
		try {
			const response = await fetch("/journal_entries");
			const data = await response.json();
			setEntries(data);
		} catch (err) {
			console.log(err);
		}
	}, []);

	const quotes = [
		{
			quote:
				"When someone is going through a storm, your silent presence is more powerful than a million, empty words.",
			author: "Dr. Thema Davis",
		},
		{
			quote:
				"Some people don't like you just because your strength reminds them of their weakness. Don't let the hate slow you down.",
			author: "Dr. Thema Davis",
		},
		{
			quote:
				"You either walk inside your story and own it or you stand outside your story and hustle for your worthiness.",
			author: "Brené Brown",
		},
		{
			quote:
				"There is no greater agony than bearing an untold story inside you.",
			author: "Maya Angelou",
		},
		{
			quote:
				"Have enough courage to trust love one more time and always one more time.",
			author: "Maya Angelou",
		},
		{
			quote: "Everything in the universe has a rhythm, everything dances.",
			author: "Maya Angelou",
		},
		{
			quote:
				"Breathe. Let go. And remind yourself that this very moment is the only one you know you have for sure.",
			author: "Oprah",
		},
		{
			quote:
				"Be patient with yourself. Self-growth is tender; it’s holy ground. There’s no greater investment.",
			author: "Stephen Covey",
		},
		{
			quote: "The challenge is not to be perfect — it is to be whole.",
			author: "Jane Fonda",
		},
		{
			quote: "We cannot direct the wind, but we can adjust the sails.",
			author: "Dolly Parton",
		},
		{
			quote:
				"Self-care is not a waste of time; self-care makes your use of time more sustainable.",
			author: "Jackie Viramontez",
		},
	];

	// const selectedTag = tagArr[Math.floor(Math.random()*tagArr.length)]

	// let selectedMemory = Math.floor(Math.random() * entries.length);
	// let selectedMemory = entries[Math.floor(Math.random() * entries.length)].moment_of_joy;

	let selectedMemory;

	if (entries.length > 0) {
		selectedMemory = entries[Math.floor(Math.random() * entries.length)];
	}

	let selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];

	return (
		<div>
			<br />
			{/* <button className="btn bg-test1">test1</button>{" "}
			<button className="btn bg-test2">test2</button>{" "}
			<button className="btn bg-test3">test3</button>{" "}
			<button className="btn bg-test4">test4</button>{" "}
			<button className="btn bg-test5">test5</button>{" "}
			<button className="btn bg-test6">test6</button>{" "}
			<button className="btn bg-test7">test7</button>{" "} */}
			<div className="container bg-light shadow">
				<h3 className="test5"> My Journal </h3> <hr />
				<table className="table table-bordered table-striped shadow">
					<thead className="table text-light bg-test5">
						<tr>
							<th className="col-3">Date</th>
							<th className="col-6">Title</th>
							<th className="col-3">View Entry</th>
						</tr>
					</thead>
					<tbody>
						{entries &&
							entries.map((entry) => (
								<tr key={entry.id}>
									<td>{entry.date}</td>
									<td>{entry.title}</td>
									<td
										className="test5"
										// className="text-info"
										onClick={() => navigate(`/journal/${entry.id}`)}
									>
										Click Here!
									</td>
								</tr>
							))}
					</tbody>
				</table>
				<br />
				<Link to={`/journal/newentry`}>
					<button type="button" className="btn bg-test6 btn-test6">
						Add New Entry
					</button>
				</Link>
				<hr />
				<h5 className="test5">
					{selectedMemory && selectedMemory.moment_of_joy
						? `Moment of joy from ${selectedMemory.date}: ${selectedMemory.moment_of_joy}`
						: `"${selectedQuote.quote}" -${selectedQuote.author}`}{" "}
				</h5>
				<br />
				<br />
			</div>{" "}
			<br />
		</div>
	);
}

//on hover change color/maybe add shadow

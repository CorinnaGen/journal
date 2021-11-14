import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import quotes from "./quotes";

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

	let selectedMemory;

	if (entries.length > 0) {
		selectedMemory = entries[Math.floor(Math.random() * entries.length)];
	}

	let selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];

	return (
		<div className="container bg-light shadow mt-4 mb-4">
			<h3 className="darker"> My Journal </h3> <hr />
			<table className="table table-bordered table-striped shadow">
				<thead className="table text-light bg-test5">
					<tr>
						<th className="col-1">Entry # </th>
						<th className="col-3">Date</th>
						<th className="col-5">Title</th>
						<th className="col-3">View Entry</th>
					</tr>
				</thead>
				<tbody>
					{entries &&
						entries.map((entry) => (
							<tr key={entry.id}>
								<td className="darker">#{entry.id}</td>

								<td className="darker">
									{entry.date && entry.date !== "undefined"
										? entry.date
										: "no date"}
								</td>
								<td>
									{entry.title && entry.title !== "undefined"
										? entry.title
										: "No Title"}
								</td>
								<td
									className="clickhere"
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
		</div>
	);
}

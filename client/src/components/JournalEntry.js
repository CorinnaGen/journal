import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../App.css";

export default function JournalEntry() {
	const { id } = useParams();
	const [entry, setEntry] = useState({});

	useEffect(async () => {
		try {
			const response = await fetch(`/journal_entries/"${id}"`);
			const data = await response.json();
			setEntry(data);
		} catch (err) {
			console.log(err);
		}
	}, [id]);

	return (
		<div>
			<br />
			<div className="container bg-light shadow">
				<h3>Journal Entry #{entry.id}</h3> <hr />
				<div className="row">
					<div className="col-3">
						<h6>Date:</h6>
						<p className="bg-white border rounded">{entry.date}</p>
					</div>
					<div className="col-5">
						<h6>Title: </h6>
						<p className="bg-white border rounded"> {entry.title}</p>
					</div>
					<div className="col-4">
						<h6>Mood: </h6>
						<p className="bg-white border rounded"> {entry.mood}</p>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<h5>Journal Entry: </h5>
						<p className="bg-white border rounded">{entry.entry_text}</p>
					</div>
				</div>
				<div>
					{entry.moment_of_joy && (
						<div className="row">
							<div className="col">
								<h6>Moment of Joy </h6>
								<p className="bg-white border rounded">{entry.moment_of_joy}</p>
							</div>
						</div>
					)}
				</div>
				<Link to={`/journal`}>
					<button className="btn bg-test6 btn-test6">Go back </button>{" "}
				</Link>
				<br />
				<br />
			</div>
			<br />
		</div>
	);
}

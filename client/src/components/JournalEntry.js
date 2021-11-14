import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../App.css";

export default function JournalEntry() {
	const { id } = useParams();
	const [entry, setEntry] = useState([""]);

	let navigate = useNavigate();

	useEffect(() => {
		if (entry.length === 0 || entry.message === "Entry not found") {
			navigate("/journal");
		}
	}, [entry]);

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
		<div className="container bg-light shadow mt-4">
			<h3 className="darker">Journal Entry #{entry.id}</h3>

			<hr />
			<div className="row">
				{entry.date && entry.date !== "undefined" && (
					<div className="col-3">
						<label>Date</label> <br />
						<input
							className="form-control"
							name="date"
							type="text"
							value={entry.date !== "undefined" ? entry.date : " "}
						/>
					</div>
					// <div className="col-3">
					// 	<h6>Date:</h6>
					// 	<p className="bg-white border rounded">{entry.date}</p>
					// </div>
				)}
				{entry.title && entry.title !== "undefined" && (
					<div className="col-6">
						<label>Title</label> <br />
						<input
							className="form-control"
							name="title"
							type="text"
							value={entry.title !== "undefined" ? entry.title : " "}
						/>
					</div>
				)}
				{entry.mood && entry.mood !== "undefined" && (
					<div className="col-3">
						<label>Mood</label> <br />
						<input
							className="form-control"
							name="mood"
							type="text"
							value={entry.mood !== "undefined" ? entry.mood : " "}
						/>
					</div>
				)}
			</div>
			<div>
				{entry.entry_text && entry.entry_text !== "undefined" && (
					<div>
						<label>Entry</label> <br />
						<textarea
							className="form-control"
							name="entry_text"
							value={entry.entry_text !== "undefined" ? entry.entry_text : " "}
						/>
					</div>
				)}
			</div>
			<div>
				{entry.moment_of_joy && entry.moment_of_joy !== "undefined" && (
					<div>
						<label>Moment of joy</label>
						<input
							className="form-control"
							name="moment_of_joy"
							type="text"
							value={
								entry.moment_of_joy !== "undefined" ? entry.moment_of_joy : " "
							}
						/>
					</div>
				)}
			</div>
			<br />
			<Link to={`/journal/${id}/edit`}>
				<button className="btn bg-test6 btn-test6">Edit Entry</button>
			</Link>
			<br />
			<br />
			<Link to={`/journal`}>
				<button className="btn bg-test6 btn-test6">Go Back to Journal</button>{" "}
			</Link>

			<br />
			<br />
		</div>
	);
}

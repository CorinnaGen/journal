import React, { useState } from "react";
import "../App.css";

function NewEntry({ addEntry }) {
	const [entry, setEntry] = useState({
		date: "",
		title: "",
		mood: "",
		entry_text: "",
		moment_of_joy: "",
	});

	const { date, title, mood, entry_text, moment_of_joy } = entry;

	const handleInputChange = (e) => {
		const { value, name } = e.target;
		setEntry((state) => ({ ...state, [name]: value }));
	};

	const handleSubmit = async (e) => {
		try {
			const res = await fetch("/journal_entries", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(entry),
			});
			const data = await res.json();
			setEntry(data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<br />
			<div className="container bg-light shadow">
				<form onSubmit={handleSubmit}>
					<h3>New Journal Entry</h3> <hr />
					<div className="row">
						<div className="col-3">
							<label>Date</label> <br />
							<input
								className="form-control"
								name="date"
								type="text"
								value={date}
								onChange={handleInputChange}
							/>
						</div>
						<div className="col-6">
							<label>Title</label> <br />
							<input
								className="form-control"
								name="title"
								type="text"
								value={title}
								onChange={handleInputChange}
							/>{" "}
						</div>
						<div className="col-3">
							<label>Mood</label> <br />
							<input
								className="form-control"
								name="mood"
								type="text"
								value={mood}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="row">
						<div>
							<label>Entry</label> <br />
							<textarea
								className="form-control"
								name="entry_text"
								value={entry_text}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="row">
						<div>
							<label>Moment of joy</label>
							<input
								className="form-control"
								name="moment_of_joy"
								type="text"
								value={moment_of_joy}
								onChange={handleInputChange}
							/>
						</div>
					</div>{" "}
					<br />
					<button className="btn btn-test6">Submit</button>
				</form>
				<br />
			</div>
			<br />
		</div>
	);
}

export default NewEntry;

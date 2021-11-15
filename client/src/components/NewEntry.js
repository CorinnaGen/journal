import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function NewEntry() {
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
			<div className="container bg-light shadow mt-4">
				<form onSubmit={handleSubmit}>
					<h3 className="darker">New Journal Entry</h3> <hr />
					<div className="row">
						<div className="col-3">
							<label>Date</label> <br />
							<input
								className="form-control"
								name="date"
								type="text"
								value={date}
								onChange={handleInputChange}
								required
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
								required
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
					<button className="btn btn-test6 bg-test6">Submit</button>{" "}
					<Link to={`/journal`}>
						<button className="btn bg-test6 btn-test6">
							Go Back to My Journal{" "}
						</button>
					</Link>
				</form>
				<br />
			</div>
			<br />
		</div>
	);
}

export default NewEntry;

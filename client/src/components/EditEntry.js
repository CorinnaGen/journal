import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";

export default function EditEntry() {
	const { id } = useParams();
	const [entry, setEntry] = useState([]);

	useEffect(async () => {
		try {
			// const response = await fetch(`/journal_entries/${id}`);
			// const data = await response.json();
			const { data } = await axios(`/journal_entries/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
			setEntry(data);
		} catch (err) {
			console.log(err);
		}
	}, [id]);

	let handleInputChange = (e) => {
		const { value, name } = e.target;
		setEntry((state) => ({ ...state, [name]: value }));
	};

	useEffect(() => {
		if (entry.length === 0 || entry.message === "Entry not found") {
			navigate("/journal");
		}
	}, [entry]);

	let navigate = useNavigate();

	//make changes and send user back to the journal entry
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`/journal_entries/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					 authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify(entry),
			});
			const data = await res.json();
			setEntry(data);
		} catch (err) {
			console.log(err);
		}
		navigate(`/journal/${id}`);
	};

	//delete by id
	const deleteEntry = async () => {
		try {
			const res = await fetch(`/journal_entries/${id}`, {
				method: "DELETE",
				     headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
			});
			const data = await res.json();
			setEntry(data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="container bg-light shadow mt-4">
			<form onSubmit={handleSubmit}>
				<h3 className="darker">Edit Journal Entry #{id}</h3> <hr />
				<div className="row">
					<div className="col-3">
						<label>Date</label> <br />
						<input
							className="form-control"
							name="date"
							type="text"
							value={entry.date !== "undefined" ? entry.date : " "}
							onChange={handleInputChange}
						/>
					</div>
					<div className="col-6">
						<label>Title</label> <br />
						<input
							className="form-control"
							name="title"
							type="text"
							value={entry.title !== "undefined" ? entry.title : " "}
							onChange={handleInputChange}
						/>{" "}
					</div>
					<div className="col-3">
						<label>Mood</label> <br />
						<input
							className="form-control"
							name="mood"
							type="text"
							value={entry.mood !== "undefined" ? entry.mood : " "}
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
							value={entry.entry_text !== "undefined" ? entry.entry_text : " "}
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
							value={
								entry.moment_of_joy !== "undefined" ? entry.moment_of_joy : " "
							}
							onChange={handleInputChange}
						/>
					</div>
				</div>{" "}
				<br />
				<button className="btn btn-test6 bg-test6">Make Changes</button>
			</form>
			<br />
			<button className="btn btn-delete" onClick={deleteEntry}>
				Delete Entry
			</button>
			<br />
			<br />
		</div>
	);
}

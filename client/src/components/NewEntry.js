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
			<form onSubmit={handleSubmit}>
				<h1>Add New Entry</h1>
				<label>Date</label>
				<input
					name="date"
					type="text"
					value={date}
					onChange={handleInputChange}
				/>
				<label>Title</label>
				<input
					name="title"
					type="text"
					value={title}
					onChange={handleInputChange}
				/>
				<label>Mood</label>
				<input
					name="mood"
					type="text"
					value={mood}
					onChange={handleInputChange}
				/>
				<label>Entry</label>
				<input
					name="entry_text"
					type="text"
					value={entry_text}
					onChange={handleInputChange}
				/>
				<label>Moment of joy</label>
				<input
					name="moment_of_joy"
					type="text"
					value={moment_of_joy}
					onChange={handleInputChange}
				/>
				<button>Submit</button>
			</form>
		</div>
	);
}

export default NewEntry;

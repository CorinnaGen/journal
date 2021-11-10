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

	const handleSubmit = (e) => {
		e.preventDefault();
		addEntry(entry);
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

// id
// :
// 2
// date
// :
// "11/2111"
// entry_text
// :
// "Thisd,nvhbe"
// moment_of_joy
// :
// "making wdfww work"
// mood
// :
// "eweffe"
// title
// :
// "First tjkfbhjwebjdewhile..."
// new entry
// :

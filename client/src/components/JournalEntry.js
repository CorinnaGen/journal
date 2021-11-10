import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
			<h1>Title </h1>
			{entry.title}
			<h3>date </h3>
			{entry.date}
			<h3>Entry </h3>
			{entry.entry_text}
			<h3>Mood </h3>
			{entry.mood}
			<h3>Joy</h3>
			{entry.moment_of_joy}
		</div>
	);
}

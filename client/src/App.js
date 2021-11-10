import { BrowserRouter, Routes, Route } from "react-router-dom";

import React, { useState } from "react";
import NewEntry from "./components/NewEntry";
import JournalEntry from "./components/JournalEntry";
import Journal from "./components/Journal";
import SafetyPlan from "./components/SafetyPlan";
import SafetyPlanEntry from "./components/SafetyPlanEntry";
import "./App.css";

function App() {
	const [entries, setEntries] = useState([]);
	const [safetyPlansResources, setSafetyPlansResources] = useState([]);
	const [safetyPlansIdentifiers, setSafetyPlansIdentifiers] = useState([]);

	const handleAddEntry = async (newEntry) => {
		try {
			const res = await fetch("/journal_entries", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newEntry),
			});
			const data = await res.json();
			setEntries(data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<BrowserRouter>
			hello
			<SafetyPlanEntry />
			<Routes>
				<Route path="/Journal" element={<Journal />}>
					<Route path=":id" element={<JournalEntry />} />
					<Route
						path="NewEntry"
						element={
							<NewEntry addEntry={(newEntry) => handleAddEntry(newEntry)} />
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

/* <Route path="/Journal" element={<Journal />} /> */
/* <Route path="/JournalEntry" element={<JournalEntry />} /> */

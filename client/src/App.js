import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import React, { useState } from "react";
import NewEntry from "./components/NewEntry";
import JournalEntry from "./components/JournalEntry";
import Journal from "./components/Journal";
import SafetyPlan from "./components/SafetyPlan";
import SafetyPlanEntry from "./components/SafetyPlanEntry";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<Link to={`/journal`}> Journal </Link> <br />
			<Link to={`/safetyplan`}> Safety Plan </Link>
			<Routes>
				<Route path="/safetyplan" element={<SafetyPlan />} />
				<Route path="/safetyplan/:id/newplan" element={<SafetyPlanEntry />} />

				<Route path="/Journal" element={<Journal />}>
					<Route path=":id" element={<JournalEntry />} />
					<Route path="NewEntry" element={<NewEntry />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

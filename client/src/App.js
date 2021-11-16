import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import mainlogo from "./Photos/logo.png";

import React from "react";
import Home from "./components/Home";
import NewEntry from "./components/NewEntry";
import JournalEntry from "./components/JournalEntry";
import Journal from "./components/Journal";
import SafetyPlan from "./components/SafetyPlan";
import SafetyPlanEntry from "./components/SafetyPlanEntry";
import Joy from "./components/Joy";
import EditEntry from "./components/EditEntry";

import "./App.css";

function App() {
	return (
		<div className="app">
			<BrowserRouter>
				<nav className="navbar sticky-top shadow navbar-expand-lg navbar-dark bg-test5">
					<div className="container">
						<a className="navbar-brand" href={`/`}>
							<img width="50" height="50" src={mainlogo} />
						</a>
						<button
							className="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#navbarNavAltMarkup"
							aria-controls="navbarNavAltMarkup"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
							<div className="navbar-nav">
								<a className="nav-link" href={`/`}>
									Home
								</a>
								<a className="nav-link" href={`/journal`}>
									Journal
								</a>

								<a className="nav-link" href={`/journal/joys`}>
									Moments of Joy
								</a>
								<a className="nav-link" href={`/safetyplan`}>
									Safety Plan
								</a>
							</div>
						</div>
					</div>
				</nav>

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/journal/joys/*" element={<Joy />} />

					<Route path="/safetyplan" element={<SafetyPlan />} />
					<Route path="/safetyplan/:id/newplan" element={<SafetyPlanEntry />} />

					<Route path="/Journal" element={<Journal />} />
					<Route path="/journal/:id" element={<JournalEntry />} />
					<Route path="/journal/:id/edit" element={<EditEntry />} />

					<Route path="/journal/NewEntry" element={<NewEntry />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

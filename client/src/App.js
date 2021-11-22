import { BrowserRouter, Routes, Route, Link } from "react-router-dom";



import React from "react";
import AuthProvider from "./components/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import Welcome from "./components/Welcome";
import NewEntry from "./components/NewEntry";
import JournalEntry from "./components/JournalEntry";
import Journal from "./components/Journal";
import SafetyPlan from "./components/SafetyPlan";
import SafetyPlanEntry from "./components/SafetyPlanEntry";
import Joy from "./components/Joy";
import EditEntry from "./components/EditEntry";
import Registration from "./components/Registration";
import Login from "./components/Login";

import Tracker from "./components/Tracker";
import NavBar from "./components/NavBar";


import "./App.css";


function App() {
	
	return (
		<div className="app">

			<AuthProvider>
				   <NavBar />
			<BrowserRouter>
				
				<Routes>
					
					<Route path="/" element={<Welcome/>} />
					<Route path="/register" element={<Registration />} />
					<Route path="/login" element={<Login />} />
					

					<Route path="/dashboard" element={<PrivateRoute> <Dashboard /></PrivateRoute>} />
					<Route path="/journal/joys/" element={<PrivateRoute><Joy /></PrivateRoute>} />
					<Route path="/safetyplan" element={<PrivateRoute><SafetyPlan /></PrivateRoute>} />
					<Route path="/safetyplan/:id/newplan" element={<PrivateRoute><SafetyPlanEntry /></PrivateRoute>} />

					<Route path="/Journal" element={<PrivateRoute><Journal/></PrivateRoute>} />
					<Route path="/journal/:id" element={<PrivateRoute><JournalEntry /></PrivateRoute>} />
					<Route path="/journal/:id/edit" element={<PrivateRoute><EditEntry /></PrivateRoute>} />

					<Route path="/journal/NewEntry" element={<PrivateRoute><NewEntry /></PrivateRoute>} />
                    <Route path="/tracker" element={<PrivateRoute><Tracker /></PrivateRoute>} />
				</Routes>
			</BrowserRouter>
			</AuthProvider>
		</div>
	);
}

export default App;

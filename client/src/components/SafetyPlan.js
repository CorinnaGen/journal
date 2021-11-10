import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//display safetyplan

export default function SafetyPlan() {
	const [newPlan, setNewPlan] = useState([]);
	let navigate = useNavigate();

	useEffect(() => {
		if (newPlan.length > 1) {
			routeChange(newPlan[newPlan.length - 1].id);
		}
	}, [newPlan]);

	const handleClick = async (e) => {
		try {
			const res = await fetch("/safetyplan", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newPlan),
			});
			const data = await res.json();
			setNewPlan(data);
		} catch (err) {
			console.log(err);
		}
	};

	const routeChange = async (planID) => {
		navigate(`/safetyplan/${planID}/newplan`);
		console.log(newPlan.id);
	};

	return (
		<div>
			<h1> Safety Plan </h1>
			<div>This is where sp will be displayed</div>

			<button onClick={(e) => handleClick()}>Add New Plan </button>
		</div>
	);
}

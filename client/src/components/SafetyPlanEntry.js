import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../App.css";

//create safetyplan

export default function SafetyPlanEntry() {
	let { id } = useParams();
	const [safetyPlanIdentifier, setSafetyPlanIdentifier] = useState({
		type: "", // "triggers" "space safety" "distractions" "helpful things"
		text: "",
		sp_id: id,
	});

	const [safetyPlanResource, setSafetyPlanResource] = useState({
		name: "",
		info: "",
		type: "", //boolean ~ professional or personal
		sp_id: id,
	});

	const [date, setDate] = useState({ date: "" });

	const handleResourceChange = (e) => {
		const { value, name } = e.target;
		setSafetyPlanResource((state) => ({ ...state, [name]: value }));
	};
	const handleIdentifierChange = (e) => {
		const { value, name } = e.target;
		setSafetyPlanIdentifier((state) => ({ ...state, [name]: value }));
	};
	const handleDateChange = (e) => {
		setDate({ date: e.target.value });
	};

	const handleIdentifierSubmit = async (e) => {
		try {
			const res = await fetch(`/safetyplan/${id}/identifiers`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(safetyPlanIdentifier),
			});
			const data = await res.json();
			setSafetyPlanIdentifier(data);
		} catch (err) {
			console.log(err);
		}
	};
	const handleResourceSubmit = async (e) => {
		try {
			const res = await fetch(`/safetyplan/${id}/resources`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(safetyPlanResource),
			});
			const data = await res.json();
			setSafetyPlanResource(data);
		} catch (err) {
			console.log(err);
		}
	};

	const updateDate = async (e) => {
		try {
			const res = await fetch(`/safetyplan/${id}/`, {
				method: "Put",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(date),
			});
			const data = await res.json();
			setDate(data);
		} catch (err) {
			console.log(err);
		}
	};

	// router.put("/:id", spMustExist, async function (req, res, next) {
	// 	try {
	// 		const { id } = req.params;
	// 		const { date } = req.body;

	// 		if (date) {
	// 			await db(`UPDATE safety_plan SET date = "${date}" WHERE id ="${id}";`);
	// 		}

	// 		const results = await db(`SELECT * FROM safety_plan WHERE id ="${id}";`);
	// 		res.send(results.data);
	// 	} catch (err) {
	// 		res.status(500).send(err);
	// 	}
	// });

	const heading = (safetyPlanIdentifier) => {
		switch (safetyPlanIdentifier.type) {
			case "Trigger":
				return <h3>How I know I don't feel well:</h3>;

			case "Distraction":
				return <h3>Good ways to distract myself:</h3>;

			case "Something Helpful":
				return <h3>Things that help when I feel this way:</h3>;

			case "Space safety":
				return <h3>Ways to keep my space safe:</h3>;

			default:
				return (
					<h3>
						Add triggers, distractions, helpful things, and ways to keep your
						space
					</h3>
				);
		}
	};

	return (
		<div className="container">
			<form onSubmit={updateDate}>
				<label>Date</label>
				<input
					name="date"
					type="text"
					value={date.date}
					onChange={handleDateChange}
				/>
				<h1>Identify Things...</h1>
				{heading(safetyPlanIdentifier)}
				<select name="type" onChange={handleIdentifierChange}>
					<option selected> Choose one </option>

					<option value="Trigger">How I know I don't feel well:</option>
					<option value="Distraction">Good ways to distract myself:</option>
					<option value="Something Helpful">
						Things that help when I feel this way:
					</option>
					<option value="Space safety">Ways to keep my space safe:</option>
				</select>{" "}
				<br />
				<input
					value={safetyPlanIdentifier.text}
					onChange={handleIdentifierChange}
					name="text"
				/>{" "}
				<button onClick={handleIdentifierSubmit} type="submit">
					Add{" "}
				</button>
			</form>
			<br />
			<h1>Identify Resources...</h1>
			<form onSubmit={handleResourceSubmit}>
				<select name="type" onChange={handleResourceChange}>
					<option selected> Choose one </option>
					<option value="1">Friend</option>
					<option value="2">Professional</option>
				</select>
				<label>Name</label>
				<input
					name="name"
					type="text"
					value={safetyPlanResource.name}
					onChange={handleResourceChange}
				/>
				<label> Contact Info: </label>
				<input
					name="info"
					type="text"
					value={safetyPlanResource.info}
					onChange={handleResourceChange}
				/>
				<button type="submit">Add </button>
			</form>
			Finished?{" "}
			<Link to={`/safetyplan`}>
				<button>Go back </button>{" "}
			</Link>
		</div>
	);
}

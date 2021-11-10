import React, { useState } from "react";
import { useParams } from "react-router-dom";
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

	const handleResourceChange = (e) => {
		const { value, name } = e.target;
		setSafetyPlanResource((state) => ({ ...state, [name]: value }));
	};
	const handleIdentifierChange = (e) => {
		const { value, name } = e.target;
		setSafetyPlanIdentifier((state) => ({ ...state, [name]: value }));
		// heading(safetyPlanIdentifier);
	};

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
		<div>
			<form>
				<h1>Identify Things...</h1>
				{heading(safetyPlanIdentifier)}
				<select name="type" onChange={handleIdentifierChange}>
					<option name="How I know I don't feel well:" value="Trigger">
						How I know I don't feel well:
					</option>
					<option name="Good ways to distract myself:" value="Distraction">
						Good ways to distract myself:
					</option>
					<option
						name="Things that help when I feel this way:"
						value="Something Helpful"
					>
						Things that help when I feel this way:
					</option>
					<option name="Ways to keep my space safe:" value="Space safety">
						Ways to keep my space safe:
					</option>
				</select>{" "}
				<br />
				<input
					value={safetyPlanIdentifier.text}
					onChange={handleIdentifierChange}
					name="text"
				/>{" "}
				<button>Add </button>
			</form>
			<br />
			<h1>Identify Resources...</h1>
			<form>
				<select name="type" onChange={handleResourceChange}>
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
			</form>
		</div>
	);
}

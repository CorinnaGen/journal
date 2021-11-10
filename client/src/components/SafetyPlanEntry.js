import React, { useState } from "react";
import "../App.css";

//create safetyplan

export default function SafetyPlanEntry() {
	const [safetyPlanResource, setSafetyPlanResource] = useState({
		type: "",
		text: "",
		sp_id: "",
	});
	const [safetyPlanIdentifier, setSafetyPlansIdentifier] = useState({
		name: "",
		info: "",
		type: "",
		sp_id: "",
	});

	return (
		<div>
			hi
			<form>
				<h1>Identify Things...</h1>

				<h1>Identify Resources...</h1>
			</form>
		</div>
	);
}

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

//display safetyplan

export default function SafetyPlan() {
	const [newPlan, setNewPlan] = useState([]);
	const [showSafetyPlan, setShowSafetyPlan] = useState([]);
	const [showPlanIdentifiers, setShowPlanIdentifiers] = useState([]);
	const [showPlanResources, setShowPlanResources] = useState([]);

	let navigate = useNavigate();

	//if most recent does not have an updated date, do length - 2? loop backward until find date. Date needs to be made mandatory when adding new safety plan identifiers

	let mostRecent =
		showSafetyPlan.length > 0 && showSafetyPlan[showSafetyPlan.length - 1];

	//get safetyplans to get id for resources and identifiers
	useEffect(async () => {
		try {
			const response = await fetch(`/safetyplan`);
			const data = await response.json();
			setShowSafetyPlan(data);
		} catch (err) {
			console.log(err);
		}
	}, []);

	useEffect(async () => {
		try {
			const response = await fetch(`/safetyplan/identifiers`);
			const data = await response.json();
			setShowPlanIdentifiers(data);
		} catch (err) {
			console.log(err);
		}
	}, []);

	useEffect(async () => {
		try {
			const response = await fetch(`/safetyplan/resources`);
			const data = await response.json();
			setShowPlanResources(data);
		} catch (err) {
			console.log(err);
		}
	}, []);

	//once a new plan is created (new plan length is > 1), redirect user to form for changing rows of "sp_resources" and "sp_identifiers". Use effect is listening for this change.
	useEffect(() => {
		if (newPlan.length >= 1) {
			routeChange(newPlan[newPlan.length - 1].id);
		}
	}, [newPlan]);

	//create new row in "safety_plan" table:
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

	//once a new "safety_plan" row has been created (aka newPlan.length >1), use effect calls this navigate:
	const routeChange = async (planID) => {
		navigate(`/safetyplan/${planID}/newplan`);
	};

	return (
		<div className="container bg-light mt-4">
			<h3 className="darker">Safety Plan </h3> <hr />
			<div>
				{mostRecent && mostRecent.date !== "undefined" && (
					<h5 className="darker">Created {mostRecent.date}</h5>
				)}
			</div>
			<div className="row">
				<div className="col-sm-6 mb-4">
					<div className="card">
						<div className="card-header bg-test5 text-light">Distractions:</div>
						<div className="card-body bg-test6 ">
							<p className="card-text">
								{showPlanIdentifiers.map(
									(identifier) =>
										identifier.sp_id === mostRecent.id &&
										identifier.type === "Distraction" && (
											<div>
												<p>{identifier.text}</p>{" "}
											</div>
										)
								)}
							</p>
						</div>
					</div>
				</div>
				<div className="col-sm-6 mb-4">
					<div className="card">
						<div className="card-header bg-test5 text-light">Triggers:</div>
						<div className="card-body bg-test6 ">
							<p className="card-text">
								{showPlanIdentifiers.map(
									(identifier) =>
										identifier.sp_id === mostRecent.id &&
										identifier.type === "Trigger" && <p>{identifier.text}</p>
								)}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-6 mb-4">
					<div className="card">
						<div className="card-header bg-test5 text-light">
							Things that help me when I feel this way:
						</div>
						<div className="card-body bg-test6">
							<p className="card-text">
								{showPlanIdentifiers.map(
									(identifier) =>
										identifier.sp_id === mostRecent.id &&
										identifier.type === "Something Helpful" && (
											<div>
												<p>{identifier.text}</p>{" "}
											</div>
										)
								)}
							</p>
						</div>
					</div>
				</div>
				<div className="col-sm-6 mb-4">
					<div className="card">
						<div className="card-header bg-test5 text-light">
							Ways to Keep My Space Safe:
						</div>
						<div className="card-body bg-test6">
							<p className="card-text">
								{showPlanIdentifiers.map(
									(identifier) =>
										identifier.sp_id === mostRecent.id &&
										identifier.type === "Space safety" && (
											<div>
												<p>{identifier.text}</p>{" "}
											</div>
										)
								)}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-6 mb-4">
					<div className="card">
						<div className="card-header bg-test5 text-light">
							Friends I can reach out to:
						</div>
						<div className="card-body bg-test6">
							<p className="card-text">
								{showPlanResources.map(
									(resource) =>
										resource.sp_id === mostRecent.id &&
										resource.type === 1 && (
											<div>
												<h5>{resource.name}:</h5>
												<p>{resource.info}</p>
											</div>
										)
								)}
							</p>
						</div>
					</div>
				</div>
				<div className="col-sm-6 mb-4">
					<div className="card">
						<div className="card-header bg-test5 text-light">
							Professional resources I can reach out to:
						</div>
						<div className="card-body bg-test6">
							<p className="card-text">
								{showPlanResources.map(
									(resource) =>
										resource.sp_id === mostRecent.id &&
										resource.type === 2 && (
											<div>
												<h5>{resource.name}:</h5>
												<p>{resource.info}</p>
											</div>
										)
								)}
							</p>
						</div>
					</div>
				</div>
			</div>
			{showSafetyPlan.length > 0 ? (
				<div>
					<Link to={`/safetyplan/${mostRecent.id}/newplan`}>
						<button className="btn bg-test6 btn-test6">
							Update Current Plan
						</button>
					</Link>{" "}
					<button
						className="btn bg-test6 btn-test6"
						onClick={(e) => handleClick()}
					>
						Replace Current Plan
					</button>
				</div>
			) : (
				<button
					className="btn bg-test6 btn-test6"
					onClick={(e) => handleClick()}
				>
					Create New Plan
				</button>
			)}
			<br />
		</div>
	);
}

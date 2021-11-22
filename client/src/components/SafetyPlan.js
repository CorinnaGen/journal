import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

//display safetyplan

export default function SafetyPlan() {
	const [newPlan, setNewPlan] = useState([]);
	const [showSafetyPlan, setShowSafetyPlan] = useState([]);
	const [showPlanIdentifiers, setShowPlanIdentifiers] = useState([]);
	const [showPlanResources, setShowPlanResources] = useState([]);

	const navigate = useNavigate();

	//get safetyplan information
	useEffect(async () => {
		try {
			// const response = await fetch(`/safetyplan`);
			// const data = await response.json();
	    const { data } = await axios("/safetyplan", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
			setShowSafetyPlan(data);
		} catch (err) {
			console.log(err);
		}
	}, []);

	//get identifiers information
	useEffect(async () => {
		try {
			// const response = await fetch(`/safetyplan/identifiers`);
			// const data = await response.json();
			  const { data } = await axios("/safetyplan/identifiers", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
			
			setShowPlanIdentifiers(data);
		} catch (err) {
			console.log(err);
		}
	}, []);

	//get resources information
	useEffect(async () => {
		try {
			// const response = await fetch(`/safetyplan/resources`);
			// const data = await response.json();
			  const { data } = await axios("/safetyplan/resources", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
			setShowPlanResources(data);
		} catch (err) {
			console.log(err);
		}
	}, []);

	//once a new plan is created (new plan length is > 1), navigate user to form for to create rows of "sp_resources" and "sp_identifiers" tables. Use effect is listening for this change.

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
					authorization: `Bearer ${localStorage.getItem("token")}`
				},
				body: JSON.stringify(newPlan),
			});
			const data = await res.json();
			setNewPlan(data); //this is what the useEffect is listening for
		} catch (err) {
			console.log(err);
		}
	};

	//once a new "safety_plan" row has been created (aka newPlan.length >= 1), use effect calls this navigate:
	const routeChange = async (planID) => {
		navigate(`/safetyplan/${planID}/newplan`);
	};

	//this is to display most recent safety plan:
	const mostRecent =
		showSafetyPlan.length > 0 && showSafetyPlan[showSafetyPlan.length - 1];

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
						<div className="card-header bg-test5 text-light">
							Good ways to distract myself:
						</div>
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
						<div className="card-header bg-test5 text-light">
							Ways to keep my space safe:
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
							How I know I don't feel well:
						</div>
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
				<div className="col-sm-6 mb-4">
					<div className="card">
						<div className="card-header bg-test5 text-light">
							Things that help when I feel this way:
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
			{/* if there is no previous plan, show create new plan button, otherwise, show update and replace buttons. */}
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
			<br />
		</div>
	);
}

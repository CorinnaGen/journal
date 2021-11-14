import React, { useState, useEffect } from "react";
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
	const [showPlanIdentifiers, setShowPlanIdentifiers] = useState([]);
	const [showPlanResources, setShowPlanResources] = useState([]);
	const [showSafetyPlan, setShowSafetyPlan] = useState([]);
	useEffect(async () => {
		try {
			const response = await fetch(`/safetyplan/${id}`);
			const data = await response.json();
			setShowSafetyPlan(data);
		} catch (err) {
			console.log(err);
		}
	}, []);

	const [date, setDate] = useState({ date: "" });

	useEffect(async () => {
		try {
			const response = await fetch(`/safetyplan/${id}/identifiers`);
			const data = await response.json();
			setShowPlanIdentifiers(data);
		} catch (err) {
			console.log(err);
		}
	}, []);

	useEffect(async () => {
		try {
			const response = await fetch(`/safetyplan/${id}/resources`);
			const data = await response.json();
			setShowPlanResources(data);
		} catch (err) {
			console.log(err);
		}
	}, []);

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

	const deleteIdentifier = async (ident_id) => {
		try {
			const res = await fetch(`/safetyplan/${id}/identifiers/${ident_id}`, {
				method: "DELETE",
			});
			const data = await res.json();
			setShowPlanIdentifiers(data);
		} catch (err) {
			console.log(err);
		}
	};

	const deleteResource = async (resource_id) => {
		try {
			const res = await fetch(`/safetyplan/${id}/resources/${resource_id}`, {
				method: "DELETE",
			});
			const data = await res.json();
			setShowPlanResources(data);
		} catch (err) {
			console.log(err);
		}
	};

	const heading = (safetyPlanIdentifier) => {
		switch (safetyPlanIdentifier.type) {
			case "Trigger":
				return "How I know I don't feel well:";

			case "Distraction":
				return "Good ways to distract myself:";

			case "Something Helpful":
				return "Things that help when I feel this way:";

			case "Space safety":
				return "Ways to keep my space safe:";

			default:
				return "Add triggers, distractions, helpful things, and ways to keep your space";
		}
	};

	return (
		<div>
			<div className="bg-light shadow container mt-4">
				<div className="row">
					<div className="col-sm-8 mt-4">
						<h3 className="darker">Current Safety Plan</h3>
					</div>
					<div className="col-sm-1 mt-4">
						<h5 className="darker">Date: </h5>
					</div>
					<div className="col-sm-3 mt-4">
						<h5 className="darker">
							{showSafetyPlan.length > 0 &&
							showSafetyPlan[0].date !== "undefined" ? (
								showSafetyPlan[0].date
							) : (
								<form>
									<div class="input-group">
										<input
											className="form-control"
											name="date"
											type="text"
											value={date.date}
											onChange={handleDateChange}
										/>
										<button
											className="btn btn-test6 bg-test6 ms-1"
											onClick={updateDate}
											type="submit"
										>
											Add Date
										</button>{" "}
									</div>
								</form>
							)}
						</h5>
					</div>
				</div>
				<hr />
				<div className="row">
					<div className="col-sm-6 mb-4">
						<div className="card-header bg-test5 text-light">
							Good ways to distract myself:
						</div>
						<div className="card-body bg-test6 ">
							<p className="card-text">
								{showPlanIdentifiers.map(
									(identifier) =>
										identifier.type === "Distraction" && (
											<div className="row">
												<h6 className="col-6">{identifier.text}</h6>
												<button
													onClick={() => deleteIdentifier(identifier.id)}
													className="col-6 mb-3 btn btn-danger"
												>
													Delete
												</button>
											</div>
										)
								)}
							</p>
						</div>
					</div>
					<div className="col-sm-6 mb-4">
						<div className="card-header bg-test5 text-light">
							Ways to keep my space safe:
						</div>
						<div className="card-body bg-test6 ">
							<p className="card-text">
								{showPlanIdentifiers.map(
									(identifier) =>
										identifier.type === "Space safety" && (
											<div className="row">
												<h6 className="col-6">{identifier.text}</h6>
												<button
													onClick={() => deleteIdentifier(identifier.id)}
													className="col-6 mb-3 btn btn-danger"
												>
													Delete
												</button>
											</div>
										)
								)}
							</p>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6 mb-4">
						<div className="card-header bg-test5 text-light">
							How I know I don't feel well:
						</div>
						<div className="card-body bg-test6 ">
							<p className="card-text">
								{showPlanIdentifiers.map(
									(identifier) =>
										identifier.type === "Trigger" && (
											<div className="row">
												<h6 className="col-6">{identifier.text}</h6>
												<button
													onClick={() => deleteIdentifier(identifier.id)}
													className="col-6 mb-3 btn btn-danger"
												>
													Delete
												</button>
											</div>
										)
								)}
							</p>
						</div>
					</div>
					<div className="col-sm-6 mb-4">
						<div className="card-header bg-test5 text-light">
							Things that help when I feel this way:
						</div>
						<div className="card-body bg-test6 ">
							<p className="card-text">
								{showPlanIdentifiers.map(
									(identifier) =>
										identifier.type === "Something Helpful" && (
											<div className="row">
												<h6 className="col-6">{identifier.text}</h6>
												<button
													onClick={() => deleteIdentifier(identifier.id)}
													className="col-6 mb-3 btn btn-danger"
												>
													Delete
												</button>
											</div>
										)
								)}
							</p>
						</div>
					</div>
				</div>
				<hr />
				<form>
					<h4 className="darker">
						Add distractions, ways to keep your space safe, triggers, and things
						that help when you don't feel well:
					</h4>
					<select
						className="btn bg-test5 text-light dropdown-toggle"
						name="type"
						onChange={handleIdentifierChange}
					>
						<option defaultValue> Choose one </option>
						<option value="Distraction">Good ways to distract myself:</option>
						<option value="Space safety">Ways to keep my space safe:</option>
						<option value="Trigger">How I know I don't feel well:</option>
						<option value="Something Helpful">
							Things that help when I feel this way:
						</option>
					</select>{" "}
					<br />
					<br />
					<input
						className="form-control "
						placeholder={heading(safetyPlanIdentifier)}
						value={safetyPlanIdentifier.text}
						onChange={handleIdentifierChange}
						name="text"
					/>{" "}
					<br />
					<button
						className="btn bg-test6 btn-test6"
						onClick={handleIdentifierSubmit}
						type="submit"
					>
						Add{" "}
					</button>
				</form>
				<hr />
				<br />
				<h4 className="darker">
					People I can contact when I'm not feeling well:
				</h4>
				<div className="row">
					<div className="col-sm-6">
						<div className="card">
							<div className="card-header bg-test5 text-light">
								Friends I can reach out to:
							</div>

							<div className="card-body bg-test6">
								<p className="card-text">
									{showPlanResources.map(
										(resource) =>
											resource.type === 1 && (
												<div>
													<h5>{resource.name}:</h5>
													<p>{resource.info}</p>
													<button
														onClick={() => deleteResource(resource.id)}
														className="col-6 mb-3 btn btn-danger"
													>
														Delete
													</button>
												</div>
											)
									)}
								</p>
							</div>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="card">
							<div className="card-header bg-test5 text-light">
								Professional resources I can reach out to:
							</div>
							<div className="card-body bg-test6">
								<p className="card-text">
									{showPlanResources.map(
										(resource) =>
											resource.type === 2 && (
												<div>
													<h5>{resource.name}:</h5>
													<p>{resource.info}</p>
													<button
														onClick={() => deleteResource(resource.id)}
														className="col-6 mb-3 btn btn-danger"
													>
														Delete
													</button>
												</div>
											)
									)}
								</p>
							</div>
						</div>
					</div>
				</div>
				<hr />
				<h5 className="darker">Add person:</h5>
				<form onSubmit={handleResourceSubmit}>
					<div className="row">
						<div className="col">
							<select
								className="btn bg-test5 text-light dropdown-toggle"
								name="type"
								onChange={handleResourceChange}
							>
								<option defaultValue> Choose type of support </option>
								<option value="1">Friend</option>
								<option value="2">Professional</option>
							</select>
						</div>
					</div>
					<br />
					<div className="row">
						<div className="col-5">
							<label>Name: </label>
							<input
								className="form-control "
								name="name"
								type="text"
								value={safetyPlanResource.name}
								onChange={handleResourceChange}
							/>
						</div>
						<div className="col-5">
							<label> Contact Info: </label>
							<input
								className="form-control "
								name="info"
								type="text"
								value={safetyPlanResource.info}
								onChange={handleResourceChange}
							/>
						</div>
					</div>
					<br />
					<button className="btn bg-test6 btn-test6" type="submit">
						Add person to safety plan
					</button>
				</form>
				<hr />
				Finished?
				<Link to={`/safetyplan`}>
					<button className="btn bg-test6 btn-test6">Go back </button>
				</Link>
				<br />
				<br />
			</div>
			<br />
		</div>
	);
}

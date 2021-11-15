import React, { useState } from "react";

export default function AddJoy({ onDone }) {
	const [joy, setJoy] = useState({
		date: "",
		moment_of_joy: "",
	});

	const { date, moment_of_joy } = joy;

	const handleInputChange = (e) => {
		const { value, name } = e.target;
		setJoy((state) => ({ ...state, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch("/journal_entries", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(joy),
			});
			const data = await res.json();
			setJoy(data);
		} catch (err) {
			console.log(err);
		}
		setJoy({ date: "", moment_of_joy: "" });
		onDone();
	};

	return (
		<div>
			<hr />
			<h3 className="darker">New Moment of Joy:</h3>
			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="col-5">
						<label>Date</label> <br />
						<input
							className="form-control"
							name="date"
							type="text"
							value={date}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className="col-5">
						<div>
							<label>Moment of joy</label>
							<input
								className="form-control"
								name="moment_of_joy"
								type="text"
								value={moment_of_joy}
								onChange={handleInputChange}
								required
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-2">
							<button className="btn btn-test6 bg-test6 mt-4 mb-4">
								Submit
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";

import "../App.css";

export default function Joy() {
	let [entries, setEntries] = useState([]);

	useEffect(async () => {
		try {
			const response = await fetch("/journal_entries/momentsOfJoy");
			const data = await response.json();
			setEntries(data);
		} catch (err) {
			console.log(err);
		}
	}, []);

	const deleteEntry = async (id) => {
		try {
			const res = await fetch(`/journal_entries/${id}`, {
				method: "DELETE",
			});
			const data = await res.json();
			setEntries(data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<div className="container bg-light shadow mt-4">
				<h3 className="darker">My Moments of Joy: </h3>
				<hr />
				<div className=" table-responsive">
					<table className="table table-bordered table-striped">
						<thead className="table bg-test5 text-light">
							<tr>
								<th scope="col">Date</th>
								<th scope="col">Moment of Joy</th>
								<th scope="col">Edit Entry</th>
								<th scope="col">Delete</th>
							</tr>
						</thead>
						<tbody>
							{entries &&
								entries.map(
									(entry) =>
										entry.moment_of_joy && (
											<tr key={entry.id}>
												<td>{entry.date}</td>
												<td>{entry.moment_of_joy}</td>
												<td> Placeholder </td>
												<td>
													<button
														onClick={() => deleteEntry(entry.id)}
														className="col-6 btn btn-danger"
													>
														Delete
													</button>{" "}
												</td>
											</tr>
										)
								)}
						</tbody>
					</table>
				</div>
				<Link to={`/journal/joys/add`}>
					<button className="btn bg-test6 btn-test6">
						Add new moment of joy
					</button>
				</Link>

				<Outlet />
				<br />
				<br />
			</div>
			<br />
		</div>
	);
}

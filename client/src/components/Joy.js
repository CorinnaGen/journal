import React, { useEffect, useState } from "react";

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

	return (
		<div>
			{" "}
			<br />
			<div className="container bg-white">
				<h3>My Moments of Joy: </h3>
				<hr />
				{/* <div class="card"> */}
				<div className=" table-responsive">
					<table className="table table-bordered table-striped">
						<thead className="table bg-test5 text-light">
							<tr>
								<th scope="col">Date</th>
								<th scope="col">Moment of Joy</th>
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
											</tr>
										)
								)}
						</tbody>
					</table>
					{/* </div> */}
				</div>{" "}
				<br />
			</div>
			<br />
		</div>
	);
}

// router.get("/momentsOfJoy", async function (req, res, next) {
// 	try {
// 		const results = await db(
// 			"SELECT date, moment_of_joy FROM journal_entries;"
// 		);
// 		res.send(results.data);
// 	} catch (err) {
// 		res.status(500).send(err);
// 	}
// });

// <table className="table">
// 					<thead>
// 						<tr>
// 							<th scope="col">ID</th>
// 							<th scope="col">First Name</th>
// 							<th scope="col">Last Name</th>
// 							<th scope="col">Remove Student</th>
// 						</tr>
// 					</thead>
// 					<tbody>
// 						{students.map((student) => (
// 							<tr key={student.id}>
// 								<th scope="row">{student.id}</th>
// 								<td>{student.firstname}</td>
// 								<td>{student.lastname}</td>
// 								<td>
// 									<button
// 										className="btn btn-sm btn-outline-danger "
// 										onClick={() => deleteStudent(student.id)}
// 									>
// 										Delete
// 									</button>
// 								</td>
// 							</tr>
// 							// </div>
// 						))}
// 					</tbody>
// 				</table>

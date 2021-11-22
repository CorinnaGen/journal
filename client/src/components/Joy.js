import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AddJoy from "./AddJoy";
//AddJoy gets imported here, not in App.js so that onDone can be passed down to it

import "../App.css";

export default function Joy() {
	let [entries, setEntries] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		getMomentsOfJoy();
	}, []);

	const getMomentsOfJoy = async () => {
		try {
			// const response = await fetch("/journal_entries/");
			// const data = await response.json();
			  const { data } = await axios("/journal_entries", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
			
			setEntries(data);
		} catch (err) {
			console.log(err);
		}
	};

	//to communicate with the addJoy component, onDone gets passed down as a prop. It triggers the journal_entries fetch so that new moments can be displayed on the parent page right away
	const onDone = () => getMomentsOfJoy();

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
							</tr>
						</thead>
						<tbody>
							{entries.length > 0 &&
								entries.map(
									(entry) =>
										entry.moment_of_joy && (
											<tr key={entry.id}>
												<td>{entry.date}</td>
												<td>{entry.moment_of_joy}</td>
												<td
													className="clickhere"
													onClick={() => navigate(`/journal/${entry.id}/edit`)}
												>
													Click Here!
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
				<br />
				<br />
				<Routes>
					{/* onDone getting passed down: */}
					<Route path="add" element={<AddJoy onDone={onDone} />} />
				</Routes>
			</div>
			<br />
		</div>
	);
}

import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import LabelingAxiosClient from "../config/api/axios";

export const Home = () => {
	const [info, setInfo] = useState({
		email: "",
		isAdmin: false,
	});

	useEffect(() => {
		fetchMyInfo();
	}, []);

	async function fetchMyInfo() {
		try {
			const response = await LabelingAxiosClient.get("http://localhost:3030/user/my-info");
			setInfo(response.data);
		} catch (e) {
			console.error("Error while getting api");
		}
	}

	return (
		<Container style={{ textAlign: "center", marginTop: "75px" }}>
			<h1>Лабелисање података апликације</h1>
			<hr />
			<p>Лабелирајте податке!</p>

			<br />

			{info.isAdmin == true ? (
				<a href="/admin">Креирајте пројекте // АДМИН</a>
			) : (
				<a className="button" href="/user">
					Лабелирајте! // КОРИСНИК
				</a>
			)}
		</Container>
	);
};

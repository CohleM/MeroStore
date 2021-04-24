import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/authAction";
import { Button } from "antd";

function Logout() {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const dispatch = useDispatch();

	const onLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
	};
	return (
		<div>
			<Button type="button" onClick={onLogout}>
				logout
			</Button>
			{!isAuthenticated ? (
				<h2>logoutSuccessFull</h2>
			) : (
				<h2>Still logged in </h2>
			)}
		</div>
	);
}

export default Logout;

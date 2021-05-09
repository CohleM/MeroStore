import { withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { loadStore } from "../../actions/authAction";
//import { loadUser } from "../../../actions/authAction";
import { useDispatch } from "react-redux";
import { USER_SERVER } from "../config";

import HomePage from "../HomePage/HomePage";
function MainStore(props) {
	const dispatch = useDispatch();
	console.log('yoo this is mainstore');
	console.log (props.match.params.storeName);	
	const storeName  = props.match.params.storeName;

	//const storeName  = useSelector((state) => state.auth.storeName);
	useEffect(() => {
	dispatch(loadStore(storeName));
	}, [storeName]);



	//const searchValue = props.match.params.searchValue;
//	axios
//	// `${USER_SERVER}/users/getinfo`
//	// .post("http://localhost:5000/product/getProducts", variables)
//		.post(`${USER_SERVER}/store/getstore`, { storeName: storeName }, {
//			"Content-type": "application/json",
//		})
//		.then((response) => {
//			if (response.data.success) {
//				console.log(response.data);
//	
//			} else {
//				alert("Failed to fetch the products");
//				console.log(response.err);
//			}
//		});
	//
	return (
		<div>
		<HomePage />
				</div>
	);
}

export default withRouter(MainStore);

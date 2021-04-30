import { withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
//import { loadUser } from "../../actions/authAction";
//import { loadUser } from "../../../actions/authAction";
import { useDispatch } from "react-redux";
// import { Card, Col, Row } from "antd";
// import ImageSlider from "../utilities/ImageSlider";
// import CheckBox from "../utilities/CheckBox";
// import { continents, price } from "../utilities/Datas";
// import RadioBox from "../utilities/RadioBox";
// import SearchFeature from "../utilities/SearchFeature";

import { USER_SERVER } from "../config";
function MainStore(props) {

	console.log('yoo this is mainstore');
	console.log (props.match.params.storeName);	
	const storeName  = props.match.params.storeName
	//const searchValue = props.match.params.searchValue;
	axios
	// `${USER_SERVER}/users/getinfo`
	// .post("http://localhost:5000/product/getProducts", variables)
		.post(`${USER_SERVER}/store/getstore`, { storeName: storeName }, {
			"Content-type": "application/json",
		})
		.then((response) => {
			if (response.data.success) {
				console.log(response.data);
	
			} else {
				alert("Failed to fetch the products");
				console.log(response.err);
			}
		});
	return (
		<div>
		<h1> This is mainstorepage</h1>	
		</div>
	);
}

export default withRouter(MainStore);

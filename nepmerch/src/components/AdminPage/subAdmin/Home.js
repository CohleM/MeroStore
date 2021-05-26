
import React from "react";
//import SideBarWithNavbar from "./sidebarAndNavbar"
import { withRouter } from "react-router-dom";

 function Home(props) {
	
	const storeName  = props.match.params.storeName;
	console.log(storeName, "from homeeee");
	return (
		<div> 
		<h1  style = {{ marginTop : "100px", margin: "0 auto", marginLeft: "260px" }} > This is home </h1>
		<h1  style = {{ marginTop : "100px" }} > This is home </h1>
		<h1  style = {{ marginTop : "100px" }} > This is home </h1>
		</div> 
	) 
	
}



export default withRouter(Home);

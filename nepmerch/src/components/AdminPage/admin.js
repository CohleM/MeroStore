
import React from "react";
import SideBarWithNavbar from "./sidebarAndNavbar"
import { withRouter } from "react-router-dom";

import ProductList from "./subAdmin/ProductList";
 function Admin(props) {
	
	const storeName  = props.match.params.storeName;
	return (
		<div> 

		<SideBarWithNavbar  storeName = {storeName } />	
			
		<ProductList  storeName = {storeName} />
		</div> 
	) 
	
}



export default withRouter(Admin);

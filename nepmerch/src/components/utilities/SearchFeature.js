import React, { useState } from "react";
import { Input } from "antd";
const { Search } = Input;

function SearchFeature(props) {
	const searchValue = props.match.params.searchValue;
	console.log(searchValue);
	// const [SearchItems, setSearchItems] = useState("")
	// const updateItems = (event) => {
	//     //console.log(event.currentTarget.value)
	//     setSearchItems(event.currentTarget.value)
	//     props.refreshSearch(event.currentTarget.value)
	// }
	return (
		<div>
			{/* <Search 
           value = {SearchItems} 
           onChange = {updateItems}
           placeholder = "Search here" 
           />  */}
			This is search page
		</div>
	);
}

export default SearchFeature;

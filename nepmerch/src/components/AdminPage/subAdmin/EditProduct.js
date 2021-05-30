
import React, { useState, useEffect } from "react";
import UploadProduct from "./UploadProduct";
function EditProduct(props) {
	
	const productId = props.match.params.productId;
	console.log('this is productiddddd', productId);
	const storeName = props.match.params.storeName;
	console.log('storeName', storeName);
	return ( 
		<UploadProduct productId = {productId} {...props} />	
	)

}


export default EditProduct;

import React, { useState, useEffect } from "react";
import { Descriptions, Button } from "antd";

function ProductInfo(props) {
	const [Product, setProduct] = useState([]);

	useEffect(() => {
		setProduct(props.detail);
	}, [props.detail]);

	const addToCart = () => {
		//console.log(props.detail._id);
		props.addToCartHandler(props.detail._id);
	};
	return (
		<div>
			<Descriptions title="Product Info">
				<Descriptions.Item label="Price">{Product.price}</Descriptions.Item>

				<Descriptions.Item label="Sold">{Product.sold}</Descriptions.Item>

				<Descriptions.Item label="views">{Product.views}</Descriptions.Item>

				<Descriptions.Item label="Description">
					{Product.description}
				</Descriptions.Item>
			</Descriptions>
			<br></br>

			<Button onClick={addToCart}>Add to Cart</Button>
			{/* {Product._id} */}
		</div>
	);
}

export default ProductInfo;

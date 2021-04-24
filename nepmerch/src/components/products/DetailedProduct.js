import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "antd";
import ProductImage from "./subProducts/ProductImage";
import ProductInfo from "./subProducts/ProductInfo";
import { addToCart } from "../../actions/authAction";
import { useDispatch, useSelector } from "react-redux";
function DetailedProduct(props) {
	const productId = props.match.params.productId;
	const [Product, setProduct] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		axios
			.get(
				`http://localhost:5000/product/product_by_id?id=${productId}&type=single`
			)
			.then((response) => {
				setProduct(response.data[0]);
				console.log(response.data[0]);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const addToCartHandler = (productId) => {
		//console.log("from dp", productId);
		dispatch(addToCart(productId));
	};
	return (
		<div>
			{console.log(props.match.params.productId)}
			<div style={{ display: "flex", justifyContent: "Center" }}>
				<h2>{Product.title}</h2>
			</div>
			<Row gutter={[16, 16]}>
				<Col lg={12} xs={24}>
					<ProductImage detail={Product} />
				</Col>
				<Col lg={12} xs={24}>
					<ProductInfo addToCartHandler={addToCartHandler} detail={Product} />
				</Col>
			</Row>
		</div>
	);
}

export default DetailedProduct;

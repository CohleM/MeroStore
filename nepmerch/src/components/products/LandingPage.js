import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Row } from "antd";
import ImageSlider from "../utilities/ImageSlider";
import CheckBox from "../utilities/CheckBox";
import { continents, price } from "../utilities/Datas";
import RadioBox from "../utilities/RadioBox";
import SearchFeature from "../utilities/SearchFeature";
import { loadUser } from "../../actions/authAction";
import { useDispatch } from "react-redux";
const { Meta } = Card;

function LandingPage() {
	const [Products, setProducts] = useState([]);
	const [Skip, setSkip] = useState(0);
	const [Limit, setLimit] = useState(8);
	const [PostSize, setPostSize] = useState(0);
	const [Filters, setFilters] = useState({
		continents: [],
		price: [],
	});
	const [Searchitems, setSearchitems] = useState("");
	//useEffect is similar to  componentDidMount it executes before loading the actual page
	//const dispatch = useDispatch();
	const getProducts = (variables) => {
		axios
			.post("http://localhost:5000/product/getProducts", variables)
			.then((response) => {
				if (response.data.success) {
					// console.log(variables.loadmore)
					//setProducts(response.data.products)
					if (variables.loadmore)
						setProducts([...Products, ...response.data.products]);
					else setProducts(response.data.products);
					setPostSize(response.data.postSize);
					// console.log(response.data.products)
				} else {
					alert("Failed to fetch the products");
					console.log(response.err);
				}
			});
	};

	useEffect(() => {
		const variables = {
			skip: Skip,
			limit: Limit,
		};
		getProducts(variables);
		//dispatch(loadUser());
	}, []);

	const onLoadMore = () => {
		let skip = Skip + Limit;

		const variables = {
			skip: skip,
			limit: Limit,
			loadmore: true,
			filters: Filters,
		};

		console.log(Products);
		getProducts(variables);
		setSkip(skip);
	};

	const renderCards = Products.map((product, index) => {
		return (
			<Col lg={6} md={8} xs={24}>
				<a href={`/product/${product._id}`}>
					{" "}
					<Card hoverable style={{ width: "240px" }} cover>
						<Meta title={product.title} description={product.price} />
					</Card>
				</a>
			</Col>
		);
	});

	const showFilteredResults = (filters) => {
		const variables = {
			skip: 0,
			limit: Limit,
			filters: filters,
		};
		setSkip(0);
		getProducts(variables);
	};

	const handlePrice = (value) => {
		let data = price;
		let array = [];
		for (let key in data) {
			if (data[key]._id === parseInt(value, 10)) {
				array = data[key].array;
			}
		}
		return array;
	};
	const handleFilters = (filters, category) => {
		//console.log(filters)

		const newFilters = { ...Filters };
		// console.log(newFilters)
		newFilters[category] = filters;

		if (category === "price") {
			newFilters[category] = handlePrice(filters);
		}
		showFilteredResults(newFilters);
		setFilters(newFilters);
		console.log(newFilters);
	};

	const updateSearchItems = (newSearchItems) => {
		setSearchitems(newSearchItems);

		const variables = {
			skip: 0,
			limit: Limit,
			filters: Filters,
			searchItem: newSearchItems,
		};
		getProducts(variables);
		console.log(newSearchItems);
		setSkip(0);
	};

	return (
		<div style={{ width: "75%", margin: "3rem auto" }}>
			<div style={{ textAlign: "center" }}>
				<h2>Nepali Products</h2>
			</div>
			{/* Filter */}
			<Row gutter={[16, 16]}>
				<Col lg={12} xs={24}>
					{" "}
					<CheckBox
						list={continents}
						handleFilters={(filters) => handleFilters(filters, "continents")}
					/>{" "}
				</Col>

				<Col lg={12} xs={24}>
					<RadioBox
						list={price}
						handleFilters={(filters) => handleFilters(filters, "price")}
					/>{" "}
				</Col>
			</Row>
			<br />
			<br />
			{/* Search   */}

			<SearchFeature refreshSearch={updateSearchItems} />
			<br />
			<br />

			{Products.length === 0 ? (
				<div
					style={{
						display: "flex",
						height: "300px",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<h2>No post yet...</h2>
				</div>
			) : (
				<div>
					<Row gutter={[16, 16]}>{renderCards}</Row>
				</div>
			)}

			<br />
			<br />

			{PostSize >= 8 ? (
				<div style={{ display: "flex", justifyContent: "center" }}>
					<button onClick={onLoadMore}> Load More </button>
				</div>
			) : (
				""
			)}
		</div>
	);
}

export default LandingPage;

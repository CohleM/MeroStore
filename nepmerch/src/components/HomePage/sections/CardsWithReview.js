import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import { useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

import image from "../../../images/beauty.jpg";
import two from "../../../images/Headphones.jpg";

import { withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
//import { loadUser } from "../../actions/authAction";
import { loadUser } from "../../../actions/authAction";
import { useDispatch } from "react-redux";
// import { Card, Col, Row } from "antd";
// import ImageSlider from "../utilities/ImageSlider";
// import CheckBox from "../utilities/CheckBox";
// import { continents, price } from "../utilities/Datas";
// import RadioBox from "../utilities/RadioBox";
// import SearchFeature from "../utilities/SearchFeature";
import { useStyles } from "./Styles";
import { USER_SERVER } from "../../config";
const { Meta } = Card;

function CenteredGrid(props) {
	const [value, setValue] = React.useState(2);
	const classes = useStyles();

	const [Products, setProducts] = useState([]);
	const [Skip, setSkip] = useState(0);
	const [Limit, setLimit] = useState(8);
	const [PostSize, setPostSize] = useState(0);
	const [Filters, setFilters] = useState({
		continents: [],
		price: [],
	});
	const [Searchitems, setSearchitems] = useState("");
	const searchValue = props.match.params.searchValue;
	//useEffect is similar to  componentDidMount it executes before loading the actual page
	//const storeName  = useSelector((state) => state.auth.storeName);

	const storeName  = useSelector((state) => state.auth.storeName);
	
//	const storeName  = "manish";
	console.log('card with rev', storeName);
	//const dispatch = useDispatch();
	const getProducts = (variables) => {
	

	if(storeName ) { 		
		axios
			// `${USER_SERVER}/users/getinfo`
			// .post("http://localhost:5000/product/getProducts", variables)
			.post(`${USER_SERVER}/product/getProducts?storeName=${storeName}`, variables)
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
			}).catch((error) => {
				console.log('card with revvvvv', error);
			})

	}
	};



	useEffect(() => {
		if (searchValue && searchValue.length > 0) {
			console.log("this is lenght", searchValue.length);
			const variables = {
				skip: 0,
				limit: Limit,
				filters: Filters,
				searchItem: searchValue,
			};
			getProducts(variables);
			setSkip(0);
		} else {
			const variables = {
				skip: Skip,
				limit: Limit,
			};
			getProducts(variables);
		}
		//dispatch(loadUser());
	}, [searchValue,storeName]);

	// useEffect(() => {

	// }, [searchValue]);

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

	const showFilteredResults = (filters) => {
		const variables = {
			skip: 0,
			limit: Limit,
			filters: filters,
		};
		setSkip(0);
		getProducts(variables);
	};

	// const handlePrice = (value) => {
	// 	let data = price;
	// 	let array = [];
	// 	for (let key in data) {
	// 		if (data[key]._id === parseInt(value, 10)) {
	// 			array = data[key].array;
	// 		}
	// 	}
	// 	return array;
	// };
	// const handleFilters = (filters, category) => {
	// 	//console.log(filters)

	// 	const newFilters = { ...Filters };
	// 	// console.log(newFilters)
	// 	newFilters[category] = filters;

	// 	if (category === "price") {
	// 		newFilters[category] = handlePrice(filters);
	// 	}
	// 	showFilteredResults(newFilters);
	// 	setFilters(newFilters);
	// 	console.log(newFilters);
	// };

	const updateSearchItems = (newSearchItems) => {
		setSearchitems(newSearchItems);

		const variables = {
			skip: 0,
			limit: Limit,
			filters: Filters,
			searchItem: props.match.params.searchValue,
		};
		getProducts(variables);
		console.log(newSearchItems);
		setSkip(0);
	};

	return (
		<div className={classes.root} style={{ backgroundColor: "white" }}>
			<Container maxWidth="xl" className={classes.ct}>
				{searchValue && searchValue.length > 0 ? (
					<div styles={{}}>
						{" "}
						<Typography className={classes.searchres} color="textSecondary">
							Your Search results for:{" "}
						</Typography>
						<Typography gutterBottom className={classes.catt1}>
							"{searchValue}"
						</Typography>
					</div>
				) : (
					<Typography gutterBottom className={classes.catt}>
						FEATURED
					</Typography>
				)}

				<Grid container spacing={2}>
					{Products.map((item, i) => (
						<Grid item xs={6} sm={4} md={3} key={i}>
							<Card className={classes.root1} elevation={0}>
								<CardActionArea
									style={{ outline: "none" }}
									onClick={() => props.history.push(`/store/${storeName}/product/${item._id}`)}
								>
									<CardMedia
										className={classes.media}
										image={`${USER_SERVER}/uploads/${item.images[0]}`}
										title={item.title}
									/>
									<CardContent>
										<Typography gutterBottom className={classes.typ}>
											{item.title}
										</Typography>
										{/* <Typography
											variant="body2"
											color="textSecondary"
											component="p"
											style={{ textAlign: "center" }}
										>
											{item.description}
										</Typography> */}
										<Box
											component="fieldset"
											mb={3}
											borderColor="transparent"
											className={classes.box}
										>
											<Rating
												name="read-only"
												value={3}
												readOnly
												size="small"
											/>
											<Typography gutterBottom className={classes.pricetyp}>
												${item.price}
											</Typography>
										</Box>
									</CardContent>
								</CardActionArea>
							</Card>
						</Grid>
					))}
				</Grid>

				{/* {Products.length === 0 ? (
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
			<br /> */}

				{PostSize >= 8 ? (
					<Typography
						variant="h6"
						display="block"
						gutterBottom
						className={classes.lm}
					>
						<Button
							size="medium"
							style={{
								outline: "none",
								margin: "0px",
								borderBottom: "2px solid #D6C9C9",
								borderRadius: "0px",
							}}
							onClick={onLoadMore}
						>
							LOAD MORE
						</Button>
					</Typography>
				) : (
					""
				)}
			</Container>
		</div>
	);
}

export default withRouter(CenteredGrid);

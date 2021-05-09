// import image from "../images/beauty.jpg";
// import two from "../images/Headphones.jpg";
import { useTheme } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import { Paper, Divider, Button } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import Container from "@material-ui/core/Container";
import Carousel from "react-material-ui-carousel";
//import Carousel from "react-elastic-carousel";
import Rating from "@material-ui/lab/Rating";
// import one from "../images/beauty.jpg";
import axios from "axios";
import { addToCart } from "../../actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Cards from "../HomePage/sections/Cards";
import Footer from "../utilities/Footer";
import { useStyles } from "./Style";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CardMedia from "@material-ui/core/CardMedia";
import Snackbar from "@material-ui/core/Snackbar";
import ImageGallery from "react-image-gallery";
import Slide from "@material-ui/core/Slide";
import { USER_SERVER } from "../config";
function SlideTransition(props) {
	return <Slide {...props} direction="up" />;
}

export default function ProductPage(props) {
	const classes = useStyles();
	const theme = useTheme();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const productId = props.match.params.productId;
	const [Product, setProduct] = useState([]);

	// const [state, setState] = React.useState({
	// 	open: false,
	// 	vertical: "vertical",
	// 	horizontal: "right",
	// });
	const [open, setopen] = useState(false);
	// const { vertical, horizontal, open } = state;

	// const handleClick = (newState) => () => {
	// 	setState({ open: true, ...newState });
	// };

	const handleClose = () => {
		setopen(false);
	};

	const storeName  = useSelector((state) => state.auth.storeName);
	const dispatch = useDispatch();
	useEffect(() => {
		axios
			.get(`${USER_SERVER}/product/product_by_id?id=${productId}&type=single&storeName=${storeName}`)
			.then((response) => {
				setProduct(response.data[0]);
				console.log("this is data", response.data[0]);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [ storeName]);

	// useEffect(() => {
	// 	window.scrollTo({ top: 0, behavior: "smooth" });
	// }, []);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [items, setitems] = useState([]);

	//	var items = [];
	useEffect(() => {
		let images = [];
		if (Product.images) {
			console.log("this is product", Product.images);
			Product.images.map((image) => {
				console.log(image);
				images.push({
					original: `${USER_SERVER}/uploads/${image}`,
					thumbnail: `${USER_SERVER}/uploads/${image}`,
				});
			});
			setitems(images);
			//items = images;
			console.log("bhaak", items);
		}

		// console.log("prr", Images);
	}, [Product]);

	const addToCartHandler = () => {
		dispatch(addToCart(Product._id));
		if (!isAuthenticated) setopen(true);
	};

	// var items = [
	// 	{
	// 		image: two,
	// 		name: "Random Name #1",
	// 		description: "Probably the most random thing you have ever seen!",
	// 	},
	// 	{
	// 		image: two,
	// 		name: "Random Name #2",
	// 		description: "Hello World!",
	// 	},
	// ];

	return (
		<div>
			<div className={classes.root1} style={{ backgroundColor: "white" }}>
				<Container maxWidth="xl" className={classes.ct}>
					<div>
						<Grid container direction="row" spacing={5}>
							<Grid item xs={12} md={6}>
								<ImageGallery
									items={items}
									showNav={false}
									showPlayButton={false}
									showBullets={true}
									showThumbnails={false}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<Grid container direction="column" spacing={3} style={{}}>
									<Grid item xs={12}>
										<Paper elevation={0}>
											<Typography
												// className={classes.priceTitle}
												variant="h6"
												component="p"
												style={{ textAlign: "left" }}
											>
												<span>{Product.title}</span>

												{/* Rolex Watch */}
											</Typography>
										</Paper>
									</Grid>

									<Grid item xs={12}>
										<Rating name="read-only" value={3} readOnly size="small" />
									</Grid>

									<Grid item xs={12}>
										<Paper elevation={0}>
											<Typography
												// className={classes}
												component="p"
												style={{
													textAlign: "left",
													color: "#FA4242",
													fontWeight: "600",
												}}
											>
												<span>${Product.price}</span>

												{/* Rolex Watch */}
											</Typography>
										</Paper>
									</Grid>
									<Grid item xs={12}>
										<div style={{ textAlign: "left" }}>
											<Button
												variant="outlined"
												size="medium"
												className={classes.margin}
												style={{ outline: "none" }}
												onClick={addToCartHandler}
											>
												ADD TO CART
											</Button>
											<Snackbar
												style={{}}
												open={open}
												onClose={handleClose}
												message="Please Login or Register!"
												TransitionComponent={SlideTransition}
											/>
										</div>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</div>
					<hr style={{ marginTop: "50px", marginBottom: "25px" }}></hr>
					{/* <Typography variant="h6" component="p" style={{ textAlign: "left" }}>
						<span>{Product.description}</span>

					
					</Typography>
					<div style={{ width: "100%", marginTop: "20px" }}>
						<Typography
							className={classes.discountTitle}
							component="p"
							style={{ textAlign: "left" }}
						>
							<span>
								100% genuine (The SELLER guarantees the authenticity of the
								product) Brand Series: Sonata Model Number : 77075PP04 For: Men
								Water Resistant : Yes 1 Year Manufacturer Warranty DIAL Movement
								: Quartz Display Type : Digital Case Thickness : 15.6mm Case
								Length : 52.5mm Case Width : 48mm BODY Case Material : Plastic
								Dial Color: Grey Strap Material : Plastic Case Shape: Round
								Strap Colour: Grey Closure :Buckle{" "}
							</span>

						</Typography>
					</div> */}
					<Accordion
						elevation={0}
						style={{ border: "1px solid #D6C9C9", borderRadius: "0px" }}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography className={classes.heading}>
								Product Details
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography
								variant="overline"
								component="p"
								style={{ textAlign: "left" }}
							>
								<span>
									{Product.description}
									100% genuine (The SELLER guarantees the authenticity of the
									product) Brand Series: Sonata Model Number : 77075PP04 For:
									Men Water Resistant : Yes 1 Year Manufacturer Warranty DIAL
									Movement : Quartz Display Type : Digital Case Thickness :
									15.6mm Case Length : 52.5mm Case Width : 48mm BODY Case
									Material : Plastic Dial Color: Grey Strap Material : Plastic
									Case Shape: Round Strap Colour: Grey Closure :Buckle{" "}
								</span>
							</Typography>
						</AccordionDetails>
					</Accordion>
				</Container>
			</div>
			<Cards />
		</div>
	);
}

function Item(props) {
	const classes = useStyles();
	return (
		// <Paper style={{ outline: "none" }} elevation={0}>
		// 	{console.log("prosss", props)}
		// 	<img
		// 		src={`http://localhost:5000/uploads/${props.item.image}`}
		// 		className={classes.img2}
		// 	/>
		// 	{/* <h2>{props.item.name}</h2>
		// 	<p>{props.item.description}</p>

		// 	<Button className="CheckButton">Check it out!</Button> */}
		// </Paper>

		<Paper style={{ outline: "none" }} elevation={0}>
			{/* <img src={props.item.image} className={classes.img2} /> */}
			<CardMedia className="Media" image={props.item.image}>
				hello
			</CardMedia>
			{console.log(props.item.image)}
		</Paper>
	);
}

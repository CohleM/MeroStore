import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	loadCart,
	getCartItems,
	removeFromCart,
	paymentSuccess,
} from "../../actions/authAction";
import CartTable from "./SubFiles/CartTable";
import { Result, Empty } from "antd";
import Paypal from "../utilities/Paypal";

import image from "../../images/beauty.jpg";
import two from "../../images/Headphones.jpg";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import Grid from "@material-ui/core/Grid";
import { Paper, Divider, Button } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import Container from "@material-ui/core/Container";
import { useStyles } from "./SubFiles/Style";
import CardsWithReview from "../HomePage/sections/CardsWithReview";
import Footer from "../utilities/Footer";
function CartPage() {
	const classes = useStyles();
	const theme = useTheme();

	const dispatch = useDispatch();
	const [Total, setTotal] = useState(0);
	const productIds = [];
	const userCart = useSelector((state) => state.auth.user.cart);
	const cartDetail = useSelector((state) => state.auth.cartDetail);
	const [ShowSuccess, setShowSuccess] = useState(false);
	//let flag = false
	console.log("outside");

	// usercart is an array of whole product with quantity and productids is only the ids
	//fires up cartDetail state
	//dispatch(getCartItems(productIds, userCart));

	useEffect(() => {
		userCart.forEach((item) => {
			productIds.push(item.id);
		});
		// usercart is an array of whole product with quantity and productids is only the ids
		//fires up cartDetail state
		if (productIds && productIds.length > 0)
			dispatch(getCartItems(productIds, userCart));
	}, [userCart]);

	useEffect(() => {
		if (cartDetail && cartDetail.length >= 0) {
			let total = 0;
			cartDetail.forEach((product) => {
				total += product.price * product.quantity;
			});
			console.log("this is total", total);
			setTotal(total);
		}
	}, [cartDetail]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const removeCart = (productId) => {
		//console.log(productId);
		dispatch(removeFromCart(productId));
	};

	const transactionSuccess = (payment) => {
		dispatch(paymentSuccess(payment, cartDetail));
		setShowSuccess(true);
	};

	return (
		// <div style={{ width: "100%" }}>
		// 	{Total ? (
		// 		<div>
		// 			<h4>Cart</h4>
		// 			<CartTable removeProduct={removeCart} />
		// 			<div style={{ marginTop: "3rem" }}>
		// 				<h3> Total amount :${Total} </h3>
		// 			</div>
		// <Paypal transOnSuccess={transactionSuccess} amount={Total}>
		// 	{" "}
		// </Paypal>
		// 		</div>
		// 	) : ShowSuccess ? (
		// 		<Result status="success" title="Successfully Purchased Item"></Result>
		// 	) : (
		// 		<div
		// 			style={{
		// 				justifyContent: "center",
		// 				width: "100%",
		// 				display: "flex",
		// 				flexDirection: "column",
		// 				marginTop: "10rem",
		// 			}}
		// 		>
		// 			<Empty description={false}>Cart is Empty </Empty>
		// 		</div>
		// 	)}
		// </div>
		<div>
			<div className={classes.root1}>
				<Container maxWidth="xl" className={classes.ct}>
					<div>
						<Typography
							className={classes.title}
							component="p"
							gutterBottom
							//variant="overline"
							color="textPrimary"
						>
							<span>MY CART</span>
							{/* Rolex Watch */}
						</Typography>
						<Grid
							container
							direction="row"
							spacing={10}
							style={{ padding: "0px" }}
						>
							<Grid item xs={12} md={6}>
								<hr></hr>
								<CartTable removeProduct={removeCart} />
							</Grid>
							<Grid item xs={12} md={6}>
								<Paper
									variant="outlined"
									className={classes.paper}
									style={{
										borderRadius: "0px",
										paddingLeft: "25px",
										paddingRight: "25px",
									}}
								>
									<Typography className={classes.title1} component="p">
										<span> TOTAL </span>
									</Typography>
									<hr></hr>
									<Grid container direction="row" spacing={4}>
										<Grid item xs={6}>
											<Paper elevation={0}>
												<Typography
													className={classes.priceTitle}
													component="p"
													style={{ textAlign: "left" }}
												>
													<span>SUB-TOTAL </span>
												</Typography>
											</Paper>
										</Grid>
										<Grid item xs={6}>
											<Paper elevation={0}>
												<Typography
													className={classes.priceTitle}
													component="p"
													style={{ textAlign: "right" }}
												>
													<span>${Total} </span>
												</Typography>
											</Paper>
										</Grid>
										<Grid item xs={6}>
											<Paper elevation={0}>
												<Typography
													className={classes.discountTitle}
													component="p"
													style={{ textAlign: "left" }}
												>
													<span>DISCOUNT </span>
												</Typography>
											</Paper>
										</Grid>
										<Grid item xs={6}>
											<Paper elevation={0}>
												<Typography
													className={classes.discountTitle}
													component="p"
													style={{ textAlign: "right" }}
												>
													<span>-0</span>
												</Typography>
											</Paper>
										</Grid>
									</Grid>
									<hr></hr>
									<Grid container direction="row" spacing={4} style={{}}>
										<Grid item xs={6}>
											<Paper elevation={0}>
												<Typography
													className={classes.discountTitle2}
													component="p"
													style={{
														textAlign: "left",
													}}
												>
													<span>TOTAL </span>
												</Typography>
											</Paper>
										</Grid>
										<Grid item xs={6}>
											<Paper elevation={0}>
												<Typography
													className={classes.discountTitle2}
													component="p"
													style={{
														textAlign: "right",
													}}
												>
													<span>${Total}</span>
												</Typography>
											</Paper>
										</Grid>
									</Grid>
									<div style={{ textAlign: "center" }}>
										{/* <Button
										variant="outlined"
										size="large"
										className={classes.margin}
										style={{ outline: "none" }}
									>
										Checkout
									</Button> */}
										<Paypal transOnSuccess={transactionSuccess} amount={Total}>
											{" "}
										</Paypal>
									</div>
								</Paper>
							</Grid>
						</Grid>
					</div>
				</Container>
			</div>
		</div>
	);
}

export default CartPage;

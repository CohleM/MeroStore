import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import image from "../../../images/beauty.jpg";
import two from "../../../images/Headphones.jpg";

import { useTheme } from "@material-ui/core/styles";
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
import { useStyles } from "./Style";
import Link from "@material-ui/core/Link";
import { USER_SERVER } from "../../config";
function CartTable(props) {
	const classes = useStyles();
	const theme = useTheme();

	const cartDetail = useSelector((state) => state.auth.cartDetail);
	//	let removeProductId = "";
	const dispatch = useDispatch();

	let check = false;
	if (cartDetail) check = true;

	const retImage = (images) => {
		if (images) {
			if (images.length > 0) {
				let image = images[0];
				// `${USER_SERVER}`
				// return `http://localhost:5000/uploads/${image}`;
				return `${USER_SERVER}/uploads/${image}`;
			}
		}
	};

	// const renderProducts = () =>
	// 	cartDetail &&
	// 	cartDetail.map((product) => (
	// 		<tr key={product._id}>
	// 			<td style={{ border: "1px solid black" }}>
	// 				{/* <h5>hahah</h5> */}
	// 				<img style={{ width: "70px" }} src={retImage(product.images)} />
	// 			</td>
	// 			<td style={{ border: "1px solid black" }}>{product.quantity}</td>
	// 			<td style={{ border: "1px solid black" }}>{product.price}</td>
	// 			<td style={{ border: "1px solid black" }}>
	// 				<button onClick={() => props.removeProduct(product._id)}>
	// 					{" "}
	// 					Remove from cart
	// 				</button>
	// 			</td>
	// 		</tr>

	// 		// <h1> </h1>
	// 	));
	// cartDetail.forEach((product) => {
	// 	console.log(product.quantity);
	// });
	return (
		<div>
			{/* start cartTable here */}
			{cartDetail &&
				cartDetail.map((item, i) => (
					<div key={i}>
						{" "}
						{/* <Divider style={{ border: "1px solid #D6C9C9" }} /> */}
						<Card className={classes.root} elevation={0}>
							<CardMedia
								className={classes.cover}
								image={retImage(item.images)}
								title="cart"
							/>
							<div className={classes.details}>
								<CardContent
									className={classes.content}
									style={{ padding: 0, paddingLeft: "10px" }}
								>
									<Grid
										container
										direction="row"
										spacing={1}
										// className={classes.grid}
									>
										<Grid item xs={12}>
											<Typography
												className={classes.title}
												component="p"
												gutterBottom
												//variant="overline"
												color="textPrimary"
											>
												<span> {item.title} </span>
												{/* Rolex Watch */}
											</Typography>
										</Grid>
									</Grid>
									<Grid
										container
										direction="row"
										spacing={3}
										// className={classes.cont}
									>
										<Grid item xs={4}>
											<Typography
												component="p"
												// className={classes.qty}
												variant="overline"
												style={{ color: "#FA4242" }}
												// className={classes.qty}
											>
												${item.price}
											</Typography>
										</Grid>
										<Grid item xs={4}>
											<Typography
												// className={classes.title}
												color="textSecondary"
												// className={classes.qty}
												variant="overline"
											>
												Qty:{item.quantity}
											</Typography>

											{/* <Typography
												color="textSecondary"
												className={classes.remove}
											>
												QUANTITY
											</Typography> */}
										</Grid>
										<Grid item xs={4}>
											{/* <Button
															className={classes.title}
															color="textSecondary"
															className={classes.qty}
														>
															Remove
														</Button> */}

											<Link
												variant="overline"
												underline="none"
												color="textSecondary"
												style={{ outline: "none" }}
												onClick={() => props.removeProduct(item._id)}
											>
												{" "}
												Remove
											</Link>
										</Grid>
									</Grid>
								</CardContent>
								{/* 0 */}
							</div>
						</Card>
						<hr></hr>
					</div>
				))}
		</div>
	);
}

export default CartTable;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import image from "../../../images/beauty.jpg";
import two from "../../../images/Headphones.jpg";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginLeft: 10,
		marginRight: 10,
		[theme.breakpoints.up("lg")]: {
			marginLeft: 100,
			marginRight: 100,
		},
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
	root1: {
		maxWidth: 345,
		borderRadius: 0,
		border: "1px solid #D6C9C9",
	},
	media: {
		height: 100,
		[theme.breakpoints.up("sm")]: {
			height: 200,
		},
	},
	typ: {
		//fontFamily: "Roboto",
		fontWeight: "500",
		fontSize: "13px",
		textAlign: "center",
		[theme.breakpoints.up("sm")]: {
			fontWeight: "500",
			fontSize: "18px",
			textAlign: "center",
		},
	},
	desc: {
		fontSize: "10px",
		[theme.breakpoints.up("sm")]: {
			fontSize: "14px",
		},
	},
	catt: {
		marginTop: "25px",
		marginBottom: "25px",
		fontWeight: "600",
		fontSize: "16px",
		[theme.breakpoints.up("sm")]: {
			marginTop: "50px",
			marginBottom: "50px",
			fontWeight: "600",
			fontSize: "24px",
		},
	},
	// ct: {
	// 	marginLeft: 20,
	// 	marginRight: 20,
	// },
}));

export default function CenteredGrid() {
	const classes = useStyles();

	var Items = [
		{
			image: image,
			category: "BEAUTY",
			description: "2,153 items in this category",
		},
		{
			image: two,
			category: "ELECTRONICS",
			description: "2,153 items in this category",
		},
		{
			image: image,
			category: "BEAUTY",
			description: "2,153 items in this category",
		},
		{
			image: two,
			category: "ELECTRONICS",
			description: "2,153 items in this category",
		},
	];

	return (
		<div className={classes.root} style={{ backgroundColor: "white" }}>
			<Container maxWidth="xl" className={classes.ct}>
				<Typography gutterBottom className={classes.catt}>
					CATEGORIES
				</Typography>
				<Grid container spacing={2}>
					{" "}
					{Items.map((item, i) => (
						<Grid item xs={6} sm={4} md={3} key={i}>
							<Card className={classes.root1} elevation={0}>
								<CardActionArea style={{ outline: "none" }}>
									<CardMedia
										className={classes.media}
										image={item.image}
										title="Contemplative Reptile"
									/>
									<CardContent>
										<Typography
											gutterBottom
											className={classes.typ}
											style={{ textAlign: "center" }}
										>
											{item.category}
										</Typography>
										<Typography
											variant="body2"
											color="textSecondary"
											component="p"
											style={{ textAlign: "center" }}
											className={classes.desc}
										>
											{item.description}
										</Typography>
									</CardContent>
								</CardActionArea>
								{/* <CardActions>
								<Button size="small" color="primary">
									Share
								</Button>
								<Button size="small" color="primary">
									Learn More
								</Button>
							</CardActions> */}
							</Card>
						</Grid>
					))}
					{/* <Card className={classes.root1} elevation={0}>
							<CardActionArea style={{ outline: "none" }}>
								<CardMedia
									className={classes.media}
									image={image}
									title="Contemplative Reptile"
								/>
								<CardContent>
									<Typography gutterBottom className={classes.typ}>
										BEAUTY
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
										style={{ textAlign: "center" }}
									>
										2,153 items in this category
									</Typography>
								</CardContent>
							</CardActionArea>
							{/* <CardActions>
								<Button size="small" color="primary">
									Share
								</Button>
								<Button size="small" color="primary">
									Learn More
								</Button>
							</CardActions> */}
					{/* </Card>
					</Grid>
					<Grid item xs={6} sm={3}>
						<Paper className={classes.paper}>gg</Paper>
					</Grid>
					<Grid item xs={6} sm={3}>
						<Paper className={classes.paper}>gg</Paper>
					</Grid>
					<Grid item xs={6} sm={3}>
						<Paper className={classes.paper}>gg</Paper>
					</Grid> */}{" "}
				</Grid>
			</Container>
		</div>
	);
}

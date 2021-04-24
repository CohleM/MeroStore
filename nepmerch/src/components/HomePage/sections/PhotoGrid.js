// // import React from "react";
// // import { makeStyles } from "@material-ui/core/styles";
// // import Card from "@material-ui/core/Card";
// // import CardActionArea from "@material-ui/core/CardActionArea";
// // import CardActions from "@material-ui/core/CardActions";
// // import CardContent from "@material-ui/core/CardContent";
// // import CardMedia from "@material-ui/core/CardMedia";
// // import Button from "@material-ui/core/Button";
// // import Typography from "@material-ui/core/Typography";

// // const useStyles = makeStyles({
// // 	root: {
// // 		maxWidth: 345,
// // 	},
// // });

// // export default function ImgMediaCard() {
// // 	const classes = useStyles();

// // 	return (
// // 		<Card className={classes.root}>
// // 			<CardActionArea>
// // 				<CardMedia
// // 					component="img"
// // 					alt="Contemplative Reptile"
// // 					height="140"
// // 					image="/static/images/cards/contemplative-reptile.jpg"
// // 					title="Contemplative Reptile"
// // 				/>
// // 				<CardContent>
// // 					<Typography gutterBottom variant="h5" component="h2">
// // 						Lizard
// // 					</Typography>
// // 					<Typography variant="body2" color="textSecondary" component="p">
// // 						Lizards are a widespread group of squamate reptiles, with over 6,000
// // 						species, ranging across all continents except Antarctica
// // 					</Typography>
// // 				</CardContent>
// // 			</CardActionArea>
// // 			<CardActions>
// // 				<Button size="small" color="primary">
// // 					Share
// // 				</Button>
// // 				<Button size="small" color="primary">
// // 					Learn More
// // 				</Button>
// // 			</CardActions>
// // 		</Card>
// // 	);
// // }

// import React from "react";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import two from "./gg.jpg";

const useStyles = makeStyles((theme) => ({
	img2: {
		width: "100%",
		height: "auto",
	},
}));

export default function Example(props) {
	const classes = useStyles();
	var items = [
		{
			image: two,
			name: "Random Name #1",
			description: "Probably the most random thing you have ever seen!",
		},
		{
			image: two,
			name: "Random Name #2",
			description: "Hello World!",
		},
	];

	return (
		<Carousel>
			{items.map((item, i) => (
				<Item key={i} item={item} />
			))}
		</Carousel>
	);
}

function Item(props) {
	const classes = useStyles();
	return (
		<Paper style={{ outline: "none" }} elevation={0}>
			<img src={props.item.image} className={classes.img2} />
			{console.log(props.item.image)}
			{/* <h2>{props.item.name}</h2>
			<p>{props.item.description}</p>

			<Button className="CheckButton">Check it out!</Button> */}
		</Paper>
	);
}

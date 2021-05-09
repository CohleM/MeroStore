
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

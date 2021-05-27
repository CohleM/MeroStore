import React, { useState } from "react";
import FileUpload from "../../utilities/FileUpload";
import axios from "axios";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
//import { useStyles } from "./Style";
import Container from "@material-ui/core/Container";

import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import Grid from "@material-ui/core/Grid";
import { Paper, Divider } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
//import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Link from "@material-ui/core/Link";

import { makeStyles } from "@material-ui/core/styles";
const Continents = [
	{ key: 1, value: "Africa" },
	{ key: 2, value: "Europe" },
	{ key: 3, value: "Asia" },
	{ key: 4, value: "North America" },
	{ key: 5, value: "South America" },
	{ key: 6, value: "Australia" },
	{ key: 7, value: "Antarctica" },
];

const useToolbarStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	paper: {
		margin: "auto",
		[theme.breakpoints.up("sm")]: {
			marginLeft: 300,

			marginTop: theme.spacing(15),
			marginRight: theme.spacing(6),
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(1),
			paddingTop: theme.spacing(2),
		},
		marginRight: theme.spacing(1.5),
		marginLeft: theme.spacing(1.5),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
		paddingTop: theme.spacing(2),

		marginTop: theme.spacing(10),
		border: "1px solid #b5b5b5",
		borderRadius: 0,
	},
	title: {},
	form: {},
}));

function UploadProduct(props) {
	const [TitleValue, setTitleValue] = useState("");
	const [DescriptionValue, setDescriptionValue] = useState("");
	const [PriceValue, setPriceValue] = useState(0);
	const [ContinentValue, setContinentValue] = useState("");
	const [Images, setImages] = useState([]);

	const classes = useToolbarStyles();
	//	const storeName  = props.match.params.storeName;
	const storeName = "RustCohle";

	const onTitleChange = (event) => {
		setTitleValue(event.currentTarget.value);
	};

	const onDescriptionChange = (event) => {
		setDescriptionValue(event.currentTarget.value);
	};
	const onPriceChange = (event) => {
		setPriceValue(event.currentTarget.value);
	};
	const onContinentsSelectChange = (event) => {
		setContinentValue(event.currentTarget.value);
	};
	const updateImages = (newImages) => {
		setImages(newImages);
		// console.log(newImages)
	};
	const onSubmit = (event) => {
		event.preventDefault();
		const variables = {
			writer: "InsertObjectID",
			title: TitleValue,
			description: DescriptionValue,
			price: PriceValue,
			images: Images,
			continents: ContinentValue,
		};
		axios
			.post(
				`http://localhost:5000/product/uploadProduct?storeName=${storeName}`,
				variables
			)
			.then((response) => {
				if (response.data.success) {
					console.log("done");
					alert("Product uploaded successfully");
					window.location = `/store/${storeName}`;
				} else {
					console.log("not done");
					alert("Failed to Upload ");
				}
			})
			.catch((err) => {
				console.log(err);
			});

		//JOI validations remaining
	};

	return (
		<Paper elevation={1} className={classes.paper}>
			<Typography
				className={classes.title}
				variant="h6"
				id="tableTitle"
				component="div"
			>
				Add Product
			</Typography>

			<form noValidate autoComplete="off" className={classes.form}>
				<Grid
					container
					direction="column"
					spacing={4}
					style={{ padding: "0px" }}
				>
					<Grid item xs={12}>
						<Typography
							variant="h6"
							style={{ textTransform: "uppercase" }}
						>
							{" "}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField
							error
							fullWidth
							id="standard-basic"
							label="Email"
							onChange
							helperText
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							id="filled-multiline-static"
							label="Description"
							multiline
							rows={4}
							variant="filled"
							fullWidth
						/>
					</Grid>

					<Grid item xs={12}>
						<FileUpload refreshfunction={updateImages} />
					</Grid>


							<Grid item xs={12}>
						<TextField
							error
							fullWidth
							id="standard-basic"
							label="Price"
							onChange
							helperText
						/>
					</Grid>

				<Grid item xs={12}>
						<TextField
							error
							fullWidth
							id="standard-basic"
							label="Vendor"
							onChange
							helperText
						/>
					</Grid>

				<Grid item xs={12}>
						<TextField
							error
							fullWidth
							id="standard-basic"
							label="Inventory"
							onChange
							helperText
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							error
							fullWidth
							id="standard-basic"
							label="Type"
							onChange
							helperText
						/>
					</Grid>









				</Grid>
			</form>

			<form>
				<br />
				<br />

				<label>Description</label>
				<textarea
					onChange={onDescriptionChange}
					value={DescriptionValue}
				/>
				<br />
				<br />
				<label>Price($)</label>
				<input
					onChange={onPriceChange}
					value={PriceValue}
					type="number"
				/>
				<br />
				<br />
				<select
					onChange={onContinentsSelectChange}
					value={ContinentValue}
				>
					{Continents.map((item) => (
						<option key={item.key} value={item.key}>
							{item.value}{" "}
						</option>
					))}
				</select>
				<br />
				<br />

				<button onClick={onSubmit}>Submit</button>
			</form>
		</Paper>
	);
}

export default UploadProduct;

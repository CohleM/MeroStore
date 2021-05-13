import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";

import { register,registerStore } from "../../actions/authAction";

import TextField from "@material-ui/core/TextField";
import { useStyles } from "./Style";
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

function RegisterUser(props) {
	const classes = useStyles();
	const [storename, setstorename] = useState("");
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");
	const checkError = useSelector((state) => state.error.type);

	const errorMessage = useSelector((state) => state.error.msg);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const data = useSelector((state) => state.auth);
	const error = useSelector((state) => state.error);
	const [emailError, setemailError] = useState("");
	const [passwordError, setpasswordError] = useState("");

	const [usernameError, setusernameError] = useState("");
	const dispatch = useDispatch();
	//very nice mofo saved me some time yollooo

	const storeID  = useSelector((state) => state.auth.storeName);


	useEffect(() => {
		if (storeID) props.history.push(`/store/${storeID}`);
	}, [storeID]);

	useEffect(() => {
		if (checkError == "email") {
			setemailError(errorMessage);
			setpasswordError("");
			setusernameError("");
		} else if (checkError == "password") {
			setpasswordError(errorMessage);
			setemailError("");
			setusernameError("");
		} else if (checkError == "storename") {
			setusernameError(errorMessage);
			setemailError("");
			setpasswordError("");
		}
	}, [checkError, errorMessage]);

	const handleOnSubmit = (e) => {
		e.preventDefault();
		console.log(storename, email, password);

		const storeID = storename;
		const newStore  = {
			storeID ,
			email,
			password,
		};

		// this is register actioni

		dispatch(registerStore(newStore));

		if (!checkError) {
			setusernameError("");
			setpasswordError("");
			setemailError("");
		}
	};

	return (
		// <div>
		// 	<Form>
		// 		<label>Username</label>{" "}
		// 		<Input onChange={(e) => setusername(e.target.value)} />
		// 		<label>email</label>{" "}
		// 		<Input onChange={(e) => setemail(e.target.value)} />
		// 		<label>password</label>{" "}
		// 		<Input onChange={(e) => setpassword(e.target.value)} type="password" />
		// 		<Button onClick={handleOnSubmit}>Submit </Button>
		// 	</Form>
		// </div>

		<div >
			<div className={classes.root1} >
				<Container maxWidth="xl">
					<Paper
						variant="outlined"
						className={classes.paper}
						style={{}}
					>
						<form noValidate autoComplete="off">
							<Grid
								container
								direction="column"
								spacing={3}
								style={{ padding: "0px" }}
							>
								<Grid item xs={12}>
									<Typography
										variant="h6"
										style={{ textTransform: "uppercase" }}
									>
										{" "}
										Create Store	
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<TextField
										error={usernameError}
										fullWidth
										id="standard-basic"
										label="Store name"
										onChange={(e) =>
											setstorename(e.target.value)
										}
										helperText={usernameError}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										error={emailError}
										fullWidth
										id="standard-basic"
										label="Email"
										onChange={(e) =>
											setemail(e.target.value)
										}
										helperText={emailError}
									/>
								</Grid>

								<Grid item xs={12}>
									<TextField
										error={passwordError}
										id="standard-password-input"
										label="Password"
										type="password"
										autoComplete="current-password"
										fullWidth
										onChange={(e) =>
											setpassword(e.target.value)
										}
										helperText={passwordError}
									/>
								</Grid>
								<Grid item xs={12}>
									<Button
										variant="outlined"
										size="small"
										className={classes.margin}
										style={{ outline: "none" }}
										onClick={handleOnSubmit}
									>
										Create Store
									</Button>
								</Grid>
								
							</Grid>
						</form>
					</Paper>
				</Container>
			</div>
		</div>
	);
}

export default RegisterUser;

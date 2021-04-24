import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { Divider, Typography, Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import IconButton from "@material-ui/core/IconButton";
const useStyles = makeStyles((theme) => ({
	typ: {
		//fontFamily: "Roboto",
		fontWeight: "500",
		fontSize: "18px",
		color: "black",

		//textAlign: "center",
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
	txtDiv: {
		marginTop: "50px",
		marginBottom: "50px",
		// textAlign: "center",
	},
	sec: {
		marginTop: "20px",
		fontSize: "13px",
	},
	bottomTxt: {
		fontWeight: "500",
		fontSize: "12px",
		marginTop: 5,
		marginBottom: 5,
		textAlign: "left",

		[theme.breakpoints.up("sm")]: {
			fontWeight: "500",
			fontSize: "15px",
			marginTop: 5,
			marginBottom: 5,
			textAlign: "left",
		},
	},
	grd: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "block",
		},
	},
	// ct: {
	// 	marginLeft: 20,
	// 	marginRight: 20,
	// },
}));

export default function Footer() {
	const classes = useStyles();

	// var Items = [
	// 	{
	// 		image: image,
	// 		category: "BEAUTY",
	// 		description: "2,153 items in this category",
	// 	},
	// 	{
	// 		image: two,
	// 		category: "ELECTRONICS",
	// 		description: "2,153 items in this category",
	// 	},
	// 	{
	// 		image: image,
	// 		category: "BEAUTY",
	// 		description: "2,153 items in this category",
	// 	},
	// 	{
	// 		image: two,
	// 		category: "ELECTRONICS",
	// 		description: "2,153 items in this category",
	// 	},
	// 	{
	// 		image: image,
	// 		category: "BEAUTY",
	// 		description: "2,153 items in this category",
	// 	},
	// 	{
	// 		image: two,
	// 		category: "ELECTRONICS",
	// 		description: "2,153 items in this category",
	// 	},
	// ];

	return (
		<div style={{ width: "100%", backgroundColor: "white" }}>
			{" "}
			{/* <Divider /> */}
			<Container maxWidth="lg">
				<div className={classes.grd}>
					<hr></hr>
					<Grid container direction="row" spacing={10}>
						<Grid item md={4}>
							{/* <Paper className={classes.paper}>xs=6</Paper> */}
							<div className={classes.txtDiv}>
								<Link
									variant="h6"
									className={classes.typ}
									component="button"
									underline="none"
									style={{ outline: "none" }}
								>
									Nepali Merchandise
								</Link>
								<Typography
									variant="body2"
									color="textSecondary"
									component="p"
									className={classes.sec}
								>
									Nepali Merchandise is one of the leading platform in nepalese
									market
								</Typography>
								<Typography> </Typography>
							</div>
						</Grid>
						<Grid item xs={6} sm={4} md={4}>
							{/* <Paper className={classes.paper}>xs=6</Paper> */}
							<div className={classes.txtDiv}>
								<Link
									variant="h6"
									className={classes.typ}
									component="button"
									underline="none"
									style={{ outline: "none" }}
								>
									Follow Us
								</Link>
								<Typography
									variant="body2"
									color="textSecondary"
									component="p"
									className={classes.sec}
								>
									Follow us on our Social Media platform to get updated and
									don't forget to hit that bell icon
									<br />
									<IconButton style={{ outline: "none" }}>
										<FacebookIcon />{" "}
									</IconButton>
									<IconButton style={{ outline: "none" }}>
										<TwitterIcon />
									</IconButton>
									<IconButton style={{ outline: "none" }}>
										<InstagramIcon />
									</IconButton>
								</Typography>
								<Typography> </Typography>
							</div>
						</Grid>
						<Grid item xs={6} sm={4} md={4}>
							{/* <Paper className={classes.paper}>xs=6</Paper> */}
							<div className={classes.txtDiv}>
								<Link
									variant="h6"
									className={classes.typ}
									component="button"
									underline="none"
									style={{ outline: "none" }}
								>
									Contact Us
								</Link>
								<Typography
									variant="body2"
									color="textSecondary"
									component="p"
									className={classes.sec}
								>
									Contact us in our Office at Kathmandu University, Dhulikhel,
									Kavre
								</Typography>
								<Typography> </Typography>
							</div>
						</Grid>
						{/* <Grid item xs={6} sm={4} md={4}>
					<Paper className={classes.paper}>xs=6</Paper>
				</Grid> */}
					</Grid>
				</div>
				<hr></hr>
				<Grid container direction="row" spacing={2}>
					<Grid item xs={4} md={2}>
						<div className={classes.txtDiv}>
							<Typography variant="h6" className={classes.bottomTxt}>
								Information
							</Typography>
							<div style={{ marginTop: "20px" }}>
								{" "}
								<Link
									variant="h6"
									className={classes.bottomTxt}
									component="button"
									underline="none"
									color="textSecondary"
									style={{ outline: "none" }}
								>
									About us
								</Link>
								<br />
								<Link
									variant="h6"
									className={classes.bottomTxt}
									component="button"
									underline="none"
									color="textSecondary"
									style={{ outline: "none" }}
								>
									Extras
								</Link>
								<br />
								<Link
									variant="h6"
									className={classes.bottomTxt}
									component="button"
									underline="none"
									color="textSecondary"
									style={{ outline: "none" }}
								>
									Privacy Policy
								</Link>
								<br />
								<Link
									variant="h6"
									className={classes.bottomTxt}
									component="button"
									underline="none"
									color="textSecondary"
									style={{ outline: "none" }}
								>
									Terms and Conditions
								</Link>
							</div>
						</div>
					</Grid>
					<Grid item xs={4} md={2}>
						<div className={classes.txtDiv}>
							<Typography variant="h6" className={classes.bottomTxt}>
								My Account
							</Typography>
							<div style={{ marginTop: "20px" }}>
								{" "}
								<Link
									variant="h6"
									className={classes.bottomTxt}
									component="button"
									underline="none"
									color="textSecondary"
									style={{ outline: "none" }}
								>
									About us
								</Link>
								<br />
								<Link
									variant="h6"
									className={classes.bottomTxt}
									component="button"
									underline="none"
									color="textSecondary"
									style={{ outline: "none" }}
								>
									Services
								</Link>
								<br />
								<Link
									variant="h6"
									className={classes.bottomTxt}
									component="button"
									underline="none"
									color="textSecondary"
									style={{ outline: "none" }}
								>
									Privacy Policy
								</Link>
								<br />
								<Link
									variant="h6"
									className={classes.bottomTxt}
									component="button"
									underline="none"
									color="textSecondary"
									style={{ outline: "none" }}
								>
									Terms and Conditions
								</Link>
							</div>
						</div>
					</Grid>
					<Grid item xs={4} md={2}>
						<div className={classes.txtDiv}>
							<Typography variant="h6" className={classes.bottomTxt}>
								Useful Links
							</Typography>
							<div style={{ marginTop: "20px" }}>
								{" "}
								<Link
									variant="h6"
									className={classes.bottomTxt}
									component="button"
									underline="none"
									color="textSecondary"
									style={{ outline: "none" }}
								>
									About us
								</Link>
								<br />
								<Link
									variant="h6"
									className={classes.bottomTxt}
									component="button"
									underline="none"
									color="textSecondary"
									style={{ outline: "none" }}
								>
									Our Offers
								</Link>
								<br />
								<Link
									variant="h6"
									className={classes.bottomTxt}
									component="button"
									underline="none"
									color="textSecondary"
									style={{ outline: "none" }}
								>
									Privacy Policy
								</Link>
								<br />
								<Link
									variant="h6"
									className={classes.bottomTxt}
									component="button"
									underline="none"
									color="textSecondary"
									style={{ outline: "none" }}
								>
									Terms and Conditions
								</Link>
							</div>
						</div>
					</Grid>
					<Grid item xs={4} md={2}>
						<div className={classes.txtDiv}>
							<Typography variant="h6" className={classes.bottomTxt}>
								Our Offers
							</Typography>
							<div style={{ marginTop: "20px" }}>
								{" "}
								<Link
									variant="h6"
									className={classes.bottomTxt}
									component="button"
									underline="none"
									color="textSecondary"
									style={{ outline: "none" }}
								>
									About us
								</Link>
								<br />
								<Link
									variant="h6"
									className={classes.bottomTxt}
									component="button"
									underline="none"
									color="textSecondary"
									style={{ outline: "none" }}
								>
									Information
								</Link>
								<br />
								<Link
									variant="h6"
									className={classes.bottomTxt}
									component="button"
									underline="none"
									color="textSecondary"
									style={{ outline: "none" }}
								>
									Privacy Policy
								</Link>
								<br />
								<Link
									variant="h6"
									className={classes.bottomTxt}
									component="button"
									underline="none"
									color="textSecondary"
									style={{ outline: "none" }}
								>
									Terms and Conditions
								</Link>
							</div>
						</div>
					</Grid>
					<Grid item xs={4} md={2}>
						<div className={classes.txtDiv}>
							<Typography variant="h6" className={classes.bottomTxt}>
								Services
							</Typography>
							<div style={{ marginTop: "20px" }}>
								{" "}
								<Link
									variant="h6"
									className={classes.bottomTxt}
									component="button"
									underline="none"
									color="textSecondary"
									style={{ outline: "none" }}
								>
									About us
								</Link>
								<br />
								<Link
									variant="h6"
									className={classes.bottomTxt}
									component="button"
									underline="none"
									color="textSecondary"
									style={{ outline: "none" }}
								>
									Information
								</Link>
								<br />
								<Link
									variant="h6"
									className={classes.bottomTxt}
									component="button"
									underline="none"
									color="textSecondary"
									style={{ outline: "none" }}
								>
									Privacy Policy
								</Link>
								<br />
								<Link
									variant="h6"
									className={classes.bottomTxt}
									component="button"
									underline="none"
									color="textSecondary"
									style={{ outline: "none" }}
								>
									Terms and Conditions
								</Link>
							</div>
						</div>
					</Grid>
					<Grid item xs={4} md={2}>
						<div className={classes.txtDiv}>
							<Typography variant="h6" className={classes.bottomTxt}>
								Extras
							</Typography>
							<div style={{ marginTop: "20px" }}>
								{" "}
								<Link
									variant="h6"
									className={classes.bottomTxt}
									component="button"
									underline="none"
									color="textSecondary"
									style={{ outline: "none" }}
								>
									About us
								</Link>
								<br />
								<Link
									variant="h6"
									className={classes.bottomTxt}
									component="button"
									underline="none"
									color="textSecondary"
									style={{ outline: "none" }}
								>
									Information
								</Link>
								<br />
								<Link
									variant="h6"
									className={classes.bottomTxt}
									component="button"
									underline="none"
									color="textSecondary"
									style={{ outline: "none" }}
								>
									Privacy Policy
								</Link>
								<br />
								<Link
									variant="h6"
									className={classes.bottomTxt}
									component="button"
									underline="none"
									color="textSecondary"
									style={{ outline: "none" }}
								>
									Terms and Conditions
								</Link>
							</div>
						</div>
					</Grid>
				</Grid>
				<Divider />
				<Typography
					color="textSecondary"
					style={{
						fontSize: "12px",
						textAlign: "center",
						marginTop: "10px",
						marginBottom: "10px",
					}}
				>
					{" "}
					© 2020-2030, Nepali Merchandise Inc
				</Typography>
			</Container>
		</div>
	);
}

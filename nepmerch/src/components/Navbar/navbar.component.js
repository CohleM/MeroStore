import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { useSelector } from "react-redux";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SearchIcon from "@material-ui/icons/Search";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SvgIcon from "@material-ui/core/SvgIcon";
import { useStyles } from "./Style";
import {
	Typography,
	AppBar,
	Toolbar,
	IconButton,
	Badge,
	InputBase,
	Grid,
	CssBaseline,
	Drawer,
	List,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText,
	Link,
} from "@material-ui/core";

function Navbar(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);

	//const storeName  = props.match.params.storeName;
	
	const storeName  = useSelector((state) => state.auth.storeName);
	console.log('this is from navbar', storeName);
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const isAuth = useSelector((state) => state.auth.isAuthenticated);
	//let prodCount = 0;
	//if (isAuth) prodCount = useSelector((state) => state.auth.user.cart);
	const prodCount = useSelector((state) => state.auth.user.cart);

	// const searchitems = () => {
	// 	props.history.push(`/users/logout`);
	// };

	const handleKeyDown = (event) => {
		console.log("this is key ", event.key);
		if (event.key === "Enter" || event.key === "KEYCODE_ENTER") {
			// props.refreshSearch(event.currentTarget.value)
			// props.history.push(`/users/logout`);

			props.history.push(`/store/${storeName}/search/${event.currentTarget.value}`);
		}
	};

	//console.log(prodCount, prodCount.length);
	let count = 0;
	if (prodCount && prodCount.length >= 1) count = prodCount.length;

	return (
		<div style={{ marginBottom: "0px" }}>
			<CssBaseline />
			<AppBar
				position="sticky"
				className={clsx(classes.appBar, classes.appBarBg, {
					[classes.appBarShift]: open,
				})}
				elevation={0}
			>
				<Toolbar>
					{/* <IconButton
					className={classes.menuButton}
					aria-label="Menu"
					color="inherit"
				></IconButton> */}

					<Link
						// variant="overline"
						underline="none"
						component="button"
						color="inherit"
						className={classes.typ}
						onClick={() => props.history.push(`/store/${storeName}`)}
						style={{ outline: "none" }}
					>
						NEP MERCH
					</Link>

					{/* <Icon1 style={{ width: "334px", height: "22px" }} /> */}
					{/* <div className={classes.searchIcon}>
						<SearchIcon style={{ fontSize: "20px" }} />
					</div> */}
					<div className={classes.search1}>
						<div className={classes.searchIcon}>
							<SearchIcon style={{ fontSize: "20px" }} />
						</div>
						<InputBase
							placeholder=""
							fullWidth
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ "aria-label": "search" }}
							// onChange={searchitems}

							onKeyDown={handleKeyDown}
						/>
					</div>

					<section className={classes.rightToolbar}>
						<Grid container spacing={0}>
							<Grid item xs={4}>
								<IconButton
									color="inherit"
									aria-label="Edit"
									className={classes.icons}
									style={{ outline: "none" }}
									onClick={() => props.history.push(`/store/${storeName}/users/cartPage`)}
								>
									<Badge badgeContent={count} color="secondary">
										<ShoppingCartIcon
											style={{ height: "20px", width: "20px" }}
										/>
									</Badge>
								</IconButton>
							</Grid>
							<Grid item xs={4}>
								<IconButton
									color="inherit"
									aria-label="Save"
									className={classes.icons}
									style={{ outline: "none" }}
									aria-haspopup="true"
									onClick={handleClick}
								>
									<PermIdentityIcon style={{ height: "20px", width: "20px" }} />
								</IconButton>
							</Grid>
							<Grid item xs={4}>
								<IconButton
									color="inherit"
									aria-label="More Options"
									//className={classes.icons}

									onClick={handleDrawerOpen}
									className={clsx(open && classes.hide, classes.icons)}
									style={{ outline: "none" }}
								>
									<MenuIcon style={{ height: "20px", width: "20px" }} />
								</IconButton>
							</Grid>
						</Grid>
					</section>
				</Toolbar>
				<Toolbar className={classes.tb}>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon style={{ fontSize: "20px" }} />
						</div>
						<InputBase
							fullWidth
							//placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ "aria-label": "search" }}
							onKeyDown={handleKeyDown}
						/>
					</div>
				</Toolbar>
			</AppBar>
			{/* Main Body goes here */}
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="right"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose} style={{ outline: "none" }}>
						{theme.direction === "rtl" ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</div>
				<Divider />
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					{!isAuth ? (
						<div>
							<MenuItem onClick={() => props.history.push(`/store/${storeName}/users/register`)}>
								Register
							</MenuItem>
							<MenuItem onClick={() => props.history.push(`/store/${storeName}/users/login`)}>
								Login
							</MenuItem>
						</div>
					) : (
						<div>
							<MenuItem onClick={() => props.history.push(`/store/${storeName}/users/history`)}>
								History
							</MenuItem>
							<MenuItem onClick={() => props.history.push(`/store/${storeName}/users/logout`)}>
								Logout
							</MenuItem>
						</div>
					)}
				</Menu>
				<List>
					{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
				<Divider />
				<List>
					{["All mail", "Trash", "Spam"].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			</Drawer>
		</div>
	);
}

function Icon1(props) {
	return (
		<SvgIcon {...props}>
			<path
				d="M8.271 10H6.66504L2.54541 3.44287V10H0.939453V0.757812H2.54541L6.67773 7.34033V0.757812H8.271V10ZM27.4658 5.87402H23.6699V8.71777H28.1069V10H22.0639V0.757812H28.0625V2.05273H23.6699V4.60449H27.4658V5.87402ZM42.9155 6.56592V10H41.3095V0.757812H44.8452C45.8777 0.757812 46.6966 1.02653 47.3017 1.56396C47.9111 2.1014 48.2158 2.81234 48.2158 3.69678C48.2158 4.60238 47.9174 5.30697 47.3208 5.81055C46.7283 6.31413 45.8968 6.56592 44.8261 6.56592H42.9155ZM42.9155 5.27734H44.8452C45.4165 5.27734 45.8523 5.14404 46.1528 4.87744C46.4532 4.60661 46.6035 4.21729 46.6035 3.70947C46.6035 3.21012 46.4511 2.81234 46.1464 2.51611C45.8418 2.21566 45.4228 2.0612 44.8896 2.05273H42.9155V5.27734ZM78.7343 0.757812L81.4003 7.8418L84.06 0.757812H86.1357V10H84.5361V6.95312L84.6947 2.87793L81.9653 10H80.8163L78.0932 2.88428L78.2519 6.95312V10H76.6523V0.757812H78.7343ZM105.337 5.87402H101.541V8.71777H105.978V10H99.935V0.757812H105.934V2.05273H101.541V4.60449H105.337V5.87402ZM122.577 6.43896H120.787V10H119.181V0.757812H122.431C123.497 0.757812 124.32 0.996908 124.9 1.4751C125.48 1.95329 125.769 2.64518 125.769 3.55078C125.769 4.16862 125.619 4.68701 125.319 5.10596C125.023 5.52067 124.608 5.84017 124.075 6.06445L126.15 9.91748V10H124.43L122.577 6.43896ZM120.787 5.15039H122.437C122.979 5.15039 123.402 5.01497 123.706 4.74414C124.011 4.46908 124.163 4.09456 124.163 3.62061C124.163 3.12549 124.022 2.74251 123.738 2.47168C123.459 2.20085 123.04 2.0612 122.481 2.05273H120.787V5.15039ZM146.24 6.99121C146.147 7.97721 145.783 8.7474 145.148 9.30176C144.514 9.85189 143.669 10.127 142.616 10.127C141.879 10.127 141.23 9.95345 140.667 9.60645C140.108 9.25521 139.677 8.75798 139.372 8.11475C139.067 7.47152 138.909 6.72461 138.896 5.87402V5.01074C138.896 4.139 139.05 3.37093 139.359 2.70654C139.668 2.04215 140.11 1.53011 140.686 1.17041C141.266 0.81071 141.934 0.630859 142.692 0.630859C143.712 0.630859 144.533 0.90804 145.155 1.4624C145.777 2.01676 146.139 2.79964 146.24 3.81104H144.64C144.564 3.14665 144.37 2.66846 144.057 2.37646C143.748 2.08024 143.293 1.93213 142.692 1.93213C141.994 1.93213 141.456 2.18815 141.079 2.7002C140.707 3.20801 140.517 3.95492 140.508 4.94092V5.75977C140.508 6.75846 140.686 7.52018 141.041 8.04492C141.401 8.56966 141.926 8.83203 142.616 8.83203C143.246 8.83203 143.72 8.69027 144.037 8.40674C144.355 8.12321 144.556 7.65137 144.64 6.99121H146.24ZM166.914 10H165.314V5.89307H161.182V10H159.576V0.757812H161.182V4.60449H165.314V0.757812H166.914V10Z"
				fill="#FCFCFC"
			/>
		</SvgIcon>
	);
}
export default withRouter(Navbar);

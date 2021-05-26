import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ProductList from "./subAdmin/ProductList";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",

	},
	drawer: {
		[theme.breakpoints.up("sm")]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("sm")]: {
			display: "none",
		},
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

function ResponsiveDrawer(props) {
	const { window } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [mainComp, setMainComp] = React.useState("");
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const storeName  = props.match.params.storeName;
	const chooseComp  = (item) => {
			props.history.push(`/store/${storeName}/admin/${item}`)
	}


	


	const drawer = (
		<div>
			
				<Divider />
			<List>
					<ListItem button key={"hello"}>
					<ListItemIcon></ListItemIcon>
					<ListItemText primary={"storename"} />
				</ListItem>

<ListItem button key={"Home"}  onClick = { () => chooseComp ("home" ) }  >
					<ListItemIcon></ListItemIcon>
					<ListItemText primary={"Home"}   />
				</ListItem>

				<Divider />
				<ListItem button key={"Orders"}   onClick = { () => chooseComp ("orders" ) }  >
					<ListItemIcon></ListItemIcon>
					<ListItemText primary={"Orders"} />
				</ListItem>

				<Divider />
				<ListItem button key={"Products"} onClick = { () => chooseComp ("products" ) } >
					<ListItemIcon></ListItemIcon>
					<ListItemText primary={"Products"} />
				</ListItem>

				<Divider />
				<ListItem button key={"Customers"}  onClick = { () => chooseComp ("customers" ) }  >
					<ListItemIcon></ListItemIcon>
					<ListItemText primary={"Customers"} />
				</ListItem>

				<Divider />
				<ListItem button key={"Analytics"}  onClick = { () => chooseComp ("analytics" ) } >
					<ListItemIcon></ListItemIcon>
					<ListItemText primary={"Analytics"} />
				</ListItem>
			</List>
			<Divider />
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label="mailbox folders">

		

				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === "rtl" ? "right" : "left"}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
		{ /* 	<main className={classes.content}> 
		
		{mainComp}
		<ProductList  storeName = {storeName} />
		</main>

*/ }
		</div>
	);
}

ResponsiveDrawer.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default ResponsiveDrawer;

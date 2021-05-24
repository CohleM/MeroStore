import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
//import UploadProduct from "../products/uploadProduct";

import ProductList from "./subAdmin/ProductList";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 50,
		flexGrow: 1,
		//backgroundColor: theme.palette.background.paper,
		display: "flex",
		//height: 600,
		background : "#f2f2f2"
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
	},
}));

export default function VerticalTabs(props) {
	const classes = useStyles();
	const storeName  = props.match.params.storeName;
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div  >
			{" "}
			<AppBar position="fixed" style = {{ background : "#ededed"}}>
				<Toolbar> 


					<Typography style = {{ fontWeight : 600, fontSize: "0.9rem" , color : "#5c5c5c"}} >{storeName}</Typography>
		</Toolbar>
			</AppBar>
			<div className={classes.root}>
				<Tabs
					orientation="vertical"
					variant="scrollable"
					value={value}
					onChange={handleChange}
					aria-label="Vertical tabs example"
					className={classes.tabs}
				>
					<Tab
						label="Home"
						{...a11yProps(0)}
						style={{ fontWeight: 600 }}
					/>

					<Tab
						label="Orders"
						{...a11yProps(1)}
						style={{ fontWeight: 600 }}
					/>
					<Tab
						label="Products "
						{...a11yProps(2)}
						style={{ fontWeight: 600 }}
					/>
					<Tab
						label="Customers"
						{...a11yProps(3)}
						style={{ fontWeight: 600 }}
					/>
					<Tab
						label="Analytics"
						{...a11yProps(4)}
						style={{ fontWeight: 600 }}
					/>
					<Tab
						label="Marketing"
						{...a11yProps(5)}
						style={{ fontWeight: 600 }}
					/>
					<Tab
						label="Discounts"
						{...a11yProps(6)}
						style={{ fontWeight: 600 }}
					/>
				</Tabs>
				<TabPanel value={value} index={0}>
				</TabPanel>
				<TabPanel value={value} index={1}>
					Item Two
				</TabPanel>
				<TabPanel value={value} index={2}>
		<ProductList storeName = {storeName} />
				</TabPanel>
				<TabPanel value={value} index={3}>
					Item Four
				</TabPanel>
				<TabPanel value={value} index={4}>
					Item Five
				</TabPanel>
				<TabPanel value={value} index={5}>
					Item Six
				</TabPanel>
				<TabPanel value={value} index={6}>
					Item Seven
				</TabPanel>
			</div>
		</div>
	);
}

import { makeStyles, useTheme } from "@material-ui/core/styles";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
	root: {
		//display: "flex",
	},
	// This group of buttons will be aligned to the right
	rightToolbar: {
		// marginLeft: theme.spacing(3),
		// width: "50%",
		// marginBottom: 0,
		// marginTop: 0,
		marginRight: 0,
		[theme.breakpoints.up("sm")]: {
			//marginTop: "30px",
			marginLeft: "auto",
			//marginRight: 20,
		},
	},
	typ: {
		//textAlign: "left",
		marginLeft: "20px",
		marginRight: "auto",
		fontSize: "0.6rem",
		lineHeight: 2.66,
		letterSpacing: "0.4em",
		[theme.breakpoints.up("sm")]: {
			//marginTop: "30px",
			marginLeft: "auto",
			marginRight: "auto",
			fontSize: "0.75rem",
			lineHeight: 2.66,
			letterSpacing: "0.6em",
			//marginRight: 20,
		},
	},

	appBarBg: {
		backgroundColor: "#222F3E",
		//222F3E
		// height: 90,
		// textAlign: "center",
		[theme.breakpoints.up("sm")]: {
			//height: 90,
			//marginRight: 20,
		},

		//height: "90px",
	},
	menuButton: {
		// height: "90px",
		marginRight: "auto",
	},
	search: {
		position: "relative",
		borderRadius: 20,
		border: "1px solid white",
		backgroundColor: "#222F3E",
		"&:hover": {
			backgroundColor: "#222F3E",
		},
		marginRight: theme.spacing(1),
		marginLeft: theme.spacing(1),
		width: "100%",
		// marginTop: 150,
		marginBottom: 20,
		[theme.breakpoints.up("sm")]: {
			// marginLeft: theme.spacing(3),
			// width: "50%",
			// marginBottom: 0,
			// marginTop: 0,
			display: "none",
			//marginTop: "30px",
		},
	},
	search1: {
		// position: "relative",
		// borderRadius: 20,
		// border: "1px solid white",
		// backgroundColor: "#222F3E",
		// "&:hover": {
		// 	backgroundColor: "#222F3E",
		// },
		// marginRight: theme.spacing(2),
		// marginLeft: 30,
		// width: "100%",
		// // marginTop: 150,
		// marginBottom: 20,
		display: "none",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(3),
			width: "50%",
			marginBottom: 0,
			marginTop: 0,
			display: "block",

			position: "relative",
			borderRadius: 0,
			borderBottom: "1px solid white",
			backgroundColor: "#222F3E",
			"&:hover": {
				backgroundColor: "#222F3E",
			},
			//marginTop: "30px",
		},
	},
	tb: {
		[theme.breakpoints.up("sm")]: {
			// marginLeft: theme.spacing(3),
			// width: "50%",
			// marginBottom: 0,
			// marginTop: 0,
			display: "none",
			//marginTop: "30px",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",

		//marginLeft: "90%",
		// background: "white",
		// borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
		color: "white",
		textAlign: "center",
		[theme.breakpoints.up("md")]: {
			//marginLeft: theme.spacing(3),
			marginLeft: "-10px",
		},
		// border: "1px solid white",
	},
	inputRoot: {
		color: "inherit",
		// width: "100%",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		//vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		// [theme.breakpoints.up("md")]: {
		// 	width: "100%",
		// },
	},

	icons: {
		// height: "90px",
		marginRight: "auto",
		[theme.breakpoints.up("md")]: {
			//marginLeft: theme.spacing(3),
			marginRight: 50,
			height: "90px",
		},
	},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		// width: `calc(100% - ${drawerWidth}px)`,
		// transition: theme.transitions.create(["margin", "width"], {
		// 	easing: theme.transitions.easing.easeOut,
		// 	duration: theme.transitions.duration.enteringScreen,
		// }),
		// marginRight: drawerWidth,
	},

	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-start",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginRight: -drawerWidth,
	},
	contentShift: {
		// transition: theme.transitions.create("margin", {
		// 	easing: theme.transitions.easing.easeOut,
		// 	duration: theme.transitions.duration.enteringScreen,
		// }),
		//marginRight: 0,
	},
}));

export { useStyles };

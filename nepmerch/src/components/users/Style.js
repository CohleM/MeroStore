import { makeStyles, useTheme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(5),
		},
	},
	details: {
		display: "flex",
		flexDirection: "column",
		marginLeft: 10,
		// marginTop: 10,
		// marginBottom: 10,
		// [theme.breakpoints.up("md")]: {},
		// border: "1px solid black",
		// width: 250,
	},
	content: {
		flex: "1 0 auto",
	},
	cover: {
		width: 50,
		height: 50,
		borderRadius: 3,
		//padding: 0,
		[theme.breakpoints.up("sm")]: {
			width: 100,
			height: 100,
		},
		[theme.breakpoints.down("sm")]: {
			marginTop: 10,
		},
	},
	controls: {
		display: "flex",
		alignItems: "center",
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
	playIcon: {
		height: 20,
		width: 20,
	},
	pricetyp: {
		fontWeight: "600",
		color: "#FA4242",
		fontSize: "14px",
	},
	title: {
		fontSize: 12,
		fontWeight: 600,
		textTransform: "uppercase",
		lineSpacing: "0.09333em",
		lineHeight: 2.66,
		[theme.breakpoints.up("sm")]: {
			fontSize: 15,
		},

		// width: 20,
		//maxWidth: 20,
	},
	qty: {
		fontSize: 14,
		fontWeight: "100",
	},
	root1: {
		flexGrow: 1,
		// marginLeft: 20,
		// marginRight: 20,
		overflow: "hidden",
		marginBottom: 30,
		textAlign: "center",
		margin: "auto",
		marginTop: "50px",
		[theme.breakpoints.up("lg")]: {
			marginLeft: 100,
			marginRight: 100,
			marginBottom: 30,

			textAlign: "center",
		},
	},
	paper: {
		height: "auto",

		border: "1px solid #D6C9C9",
		borderRadius: "0px",
		display: "block",
		width: "40%",
		marginLeft: "auto",
		marginRight: "auto",
		padding: theme.spacing(7),

		[theme.breakpoints.down("xs")]: {
			width: "100%",
		},
	},
	title1: {
		fontSize: 15,
		fontWeight: "600",
		textAlign: "center",
		marginTop: "25px",
		marginBottom: "25px",
	},
	priceTitle: {
		fontSize: 14,
		fontWeight: "200",
		textAlign: "center",
		marginTop: "25px",
		marginBottom: "0px",
	},
	discountTitle: {
		fontSize: 14,
		fontWeight: "200",
		textAlign: "center",
		marginTop: "0",
		marginBottom: "25px",
	},
	discountTitle2: {
		fontSize: 14,
		fontWeight: "200",
		textAlign: "center",
		marginTop: "0px",
		marginBottom: "25px",
	},
	margin: {
		color: "black",
		border: "1px solid #D6C9C9",
		borderRadius: 0,
		textAlign: "center",
		width: "100%",
		height: "50px",
		lineHeight: 2.66,
		letterSpacing: "0.08333em",
	},
	remove: {
		fontSize: 11,
	},
	test: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "block",
		},
	},
	grid: {
		marginTop: -30,
		marginBottom: -30,
		padding: 0,
		[theme.breakpoints.up("sm")]: {
			marginBottom: 0,
		},

		// [theme.breakpoints.down("sm")]: {
		// 	margin: 0,
		// 	"& > .MuiGrid-root": {
		// 		padding: 0,
		// 	},
		// },
	},
	cont: {
		[theme.breakpoints.up("sm")]: {
			padding: "40px",
		},
	},
	price: {},
}));

export { useStyles };

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginLeft: 10,
		marginRight: 10,
		[theme.breakpoints.up("lg")]: {
			marginLeft: 100,
			marginRight: 100,
		},
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
	root1: {
		maxWidth: 345,
		borderRadius: 0,
		border: "1px solid #D6C9C9",
	},
	media: {
		height: 100,

		[theme.breakpoints.up("sm")]: {
			height: 200,
		},
	},
	typ: {
		//fontFamily: "Roboto",
		fontWeight: "500",
		fontSize: "13px",
		textAlign: "center",
		[theme.breakpoints.up("sm")]: {
			fontWeight: "500",
			fontSize: "18px",
			textAlign: "center",
		},
	},
	box: {
		marginTop: 20,
		textAlign: "center",
		marginBottom: 0,
	},
	pricetyp: {
		fontWeight: "600",
		color: "#FA4242",
		fontSize: "13px",
		[theme.breakpoints.up("sm")]: {
			fontWeight: "600",
			color: "#FA4242",
			fontSize: "18px",
		},
	},
	catt: {
		marginTop: "25px",
		marginBottom: "25px",
		fontWeight: "600",
		fontSize: "16px",
		[theme.breakpoints.up("sm")]: {
			marginTop: "50px",
			marginBottom: "50px",
			fontWeight: "600",
			fontSize: "24px",
		},
	},
	catt1: {
		display: "flex",
		fontWeight: "600",
		fontSize: "16px",
		marginBottom: "25px",
		[theme.breakpoints.up("sm")]: {
			fontWeight: "600",
			marginBottom: "50px",
		},
	},
	lm: {
		//fontFamily: "Roboto",
		fontWeight: "500",
		fontSize: "10px",
		textAlign: "center",
		marginTop: 20,
		marginBottom: 0,

		[theme.breakpoints.up("sm")]: {
			fontWeight: "500",
			fontSize: "18px",
			textAlign: "center",
			marginTop: 70,
			marginBottom: 70,
			backgroundColor: "white",
		},
	},
	searchres: {
		// fontWeight: 400,
		fontSize: "0.75rem",
		lineHeight: 2.66,
		letterSpacing: "0.08333em",
		textTransform: "uppercase",
		display: "flex",
		marginTop: "25px",
		fontWeight: "600",

		[theme.breakpoints.up("sm")]: {
			marginTop: "50px",

			// fontWeight: "600",
		},
	},
	// ct: {
	// 	marginLeft: 20,
	// 	marginRight: 20,
	// },
}));

export { useStyles };

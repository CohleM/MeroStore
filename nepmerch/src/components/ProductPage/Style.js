import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		//	height: 100,
		marginTop: 10,
		marginBottom: 10,
	},
	details: {
		display: "flex",
		flexDirection: "column",
		marginLeft: 10,
		// border: "1px solid black",
		// width: 250,
	},
	content: {
		flex: "1 0 auto",
	},
	cover: {
		width: 100,
		height: 100,
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
		fontSize: 15,
		fontWeight: "600",
		// width: 20,
		//maxWidth: 20,
	},
	qty: {
		fontSize: 14,
		fontWeight: "100",
	},
	root1: {
		flexGrow: 1,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 20,
		[theme.breakpoints.up("lg")]: {
			marginLeft: 100,
			marginRight: 100,
			marginTop: 50,
		},
		[theme.breakpoints.up("sm")]: {
			marginTop: 50,
		},
	},
	paper: {
		height: 500,
		width: "100%",
		border: "1px solid #D6C9C9",
		borderRaduis: "none",
	},
	title1: {
		fontSize: 15,
		fontWeight: "600",
		textAlign: "center",
		marginTop: "25px",
		marginBottom: "25px",
	},
	priceTitle: {
		fontSize: 24,
		fontWeight: "600",
		textAlign: "center",
		// marginTop: "25px",
		// marginBottom: "0px",
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
		// margin: theme.spacing(1),
		color: "black",
		border: "1px solid #D6C9C9",
		borderRadius: 0,
		textAlign: "center",
	},
	img2: {
		width: "100%",
		height: "auto",
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	carousel: {
		// height: "auto",
		// width: 500,
	},
	// cont: {
	// 	spacing: 5,
	// },
}));

export { useStyles };

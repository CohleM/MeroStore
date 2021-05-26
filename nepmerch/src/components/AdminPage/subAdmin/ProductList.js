import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { USER_SERVER } from "../../config";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import ProductUpload from "../../products/uploadProduct";
function createData(product, status, inventory, type, vendor) {
	return { product, status, inventory, type, vendor };
}

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
	{
		id: "product",
		numeric: false,
		disablePadding: true,
		label: "Products",
	},
	{ id: "status", numeric: true , disablePadding: false, label: "Status" },
	{
		id: "inventory",
		numeric: true,
		disablePadding: false,
		label: "Inventory",
	},
	{ id: "type", numeric: true, disablePadding: false, label: "Type" },
	{
		id: "vendor",
		numeric: true,
		disablePadding: false,
		label: "Vendor",
	},
];

function EnhancedTableHead(props) {
	const {
		classes,
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
	} = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						indeterminate={
							numSelected > 0 && numSelected < rowCount
						}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{ "aria-label": "select all desserts" }}

					color="primary"
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? "right" : "left"}
						padding={headCell.disablePadding ? "none" : "default"}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>
									{order === "desc"
										? "sorted descending"
										: "sorted ascending"}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(["asc", "desc"]).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},
	highlight:
		theme.palette.type === "light"
			? {
					color: theme.palette.primary.main,
					backgroundColor: lighten(
						theme.palette.primary.light,
						0.85
					),
			  }
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.primary.dark,
			  },
	title: {
		flex: "1 1 100%",
	},
}));

const EnhancedTableToolbar = (props) => {
	const history = useHistory();

	const UploadProduct = () => {
		history.push(`/store/${props.storeName}/admin/add`);
		console.log("hello");
		//	return (
		//
		//	<ProductUpload />
		//	);
	};

	const classes = useToolbarStyles();
	const { numSelected } = props;

	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: numSelected > 0,
			})}
		>
			{numSelected > 0 ? (
				<Typography
					className={classes.title}
					color="inherit"
					variant="subtitle1"
					component="div"
				>
					{numSelected} selected
				</Typography>
			) : (
				<Typography
					className={classes.title}
					variant="h6"
					id="tableTitle"
					component="div"
				>
					Products
				</Typography>
			)}

			{numSelected > 0 ? (
				<ButtonGroup
					variant="text"
					color="primary"
					aria-label="outlined primary button group"
					size="meduim"
				>
					<Button>Edit</Button>
					<Button>Delete</Button>
				</ButtonGroup>
			) : (
				<Button
					color="primary"
					variant="outlined"
					onClick={UploadProduct}
				>
					Add
				</Button>
			)}
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		//	margin: "0 auto"
	},
	paper: {
		//	marginBottom: theme.spacing(2),
		//	marginLeft: theme.spacing(3),
		margin: "auto",

		maxWidth : 360,
			marginTop: theme.spacing(6),

		[theme.breakpoints.up("sm")]: {
			maxWidth : "100%",
			marginTop: theme.spacing(8),
			marginLeft: 260, 
			marginRight : theme.spacing(5),

		},
	},
	table: {
	
		maxWidth : 360,
		[theme.breakpoints.up("sm")]: {
			maxWidth : "100%",
		},

	},
	visuallyHidden: {
		border: 0,
		clip: "rect(0 0 0 0)",
		height: 1,
		margin: -1,
		overflow: "hidden",
		padding: 0,
		position: "absolute",
		top: 20,
		width: 1,
	},
}));

export default function EnhancedTable(props) {
	const classes = useStyles();
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("status");
	const [selected, setSelected] = React.useState([]);

	const [rows, setRows] = React.useState([]);
	console.log(selected);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n.product);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, product) => {
		const selectedIndex = selected.indexOf(product);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, product);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeDense = (event) => {
		setDense(event.target.checked);
	};

	const isSelected = (product) => selected.indexOf(product) !== -1;

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	const [Products, setProducts] = useState([]);
	const [Skip, setSkip] = useState(0);
	const [Limit, setLimit] = useState(8);
	const [PostSize, setPostSize] = useState(0);
	const [Filters, setFilters] = useState({
		continents: [],
		price: [],
	});
	const [Searchitems, setSearchitems] = useState("");

	//const storeName = props.storeName;
	const storeName  = props.match.params.storeName;
	console.log("this is from productList", storeName);

	useEffect(() => {
		const variables = {
			skip: 0,
			limit: Limit,
			filters: Filters,
		};

		axios
			// `${USER_SERVER}/users/getinfo`
			// .post("http://localhost:5000/product/getProducts", variables)
			.post(
				`${USER_SERVER}/product/getProducts?storeName=${storeName}`,
				variables
			)
			.then((response) => {
				if (response.data.success) {
					console.log(response.data.products);
					setProducts(response.data.products);
					let temprow = [];

					response.data.products.map((element, index) => {
						temprow.push(
							createData(element.title, "hello", 3.7, 67, 4.3)
						);
					});

					setRows(temprow);
					console.log("hehe", rows);
				} else {
					alert("Failed to fetch the products");
					console.log(response.err);
				}
			})
			.catch((error) => {
				console.log("card with revvvvv", error);
			});
	}, []);

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>



				<EnhancedTableToolbar
					numSelected={selected.length}
					storeName={storeName}
				/>
				<TableContainer 

						className={classes.table}
		>
					<Table
						aria-labelledby="tableTitle"
						size={dense ? "small" : "medium"}
						aria-label="enhanced table"
					>
						<EnhancedTableHead
							classes={classes}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{stableSort(rows, getComparator(order, orderBy))
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map((row, index) => {
									const isItemSelected = isSelected(
										row.product
									);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											onClick={(event) =>
												handleClick(event, row.product)
											}

											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row.product}
											selected={isItemSelected}
										>
											<TableCell padding="checkbox">
												<Checkbox
													checked={isItemSelected}
													inputProps={{
														"aria-labelledby":
															labelId,
													}}


					color="primary"
												/>
											</TableCell>
											<TableCell
												component="th"
												id={labelId}
												scope="row"
												padding="none"
											>
												{row.product}
											</TableCell>
											<TableCell align="right">
												{row.status}
											</TableCell>
											<TableCell align="right">
												{row.inventory}
											</TableCell>
											<TableCell align="right">
												{row.type}
											</TableCell>
											<TableCell align="right">
												{row.vendor}
											</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: (dense ? 33 : 53) * emptyRows,
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
			<FormControlLabel
				control={
					<Switch checked={dense} onChange={handleChangeDense} />
				}
				label="Dense padding"
			/>
		</div>
	);
}

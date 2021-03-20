import React, { Fragment } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Pagination from "@components/Pagination";
import InputBase from "@material-ui/core/InputBase";
import CircularProgress from "@material-ui/core/CircularProgress";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import SearchIcon from "@material-ui/icons/Search";
import { useUserRecords } from "@context/UserRecords";

const useStyles2 = makeStyles(theme => ({
	paper: {
		maxWidth: 1000,
		width: "90%",
		margin: "0 auto",
	},
	root: {
		flexGrow: 1,
	},
	appBar: {
		maxWidth: 1000,
		margin: "0 auto",
	},
	title: {
		flexGrow: 1,
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
	table: {
		minWidth: 500,
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			width: "auto",
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
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "15ch",
			"&:focus": {
				width: "30ch",
			},
		},
	},
}));

export default function CustomPaginationActionsTable() {
	const classes = useStyles2();

	const {
		currPage,
		totalRecords,
		currPageUsers,
		recordsPerPage,
		search,
		loading,
		searchResults,

		//
		handleChangePage,
		handleChangeRowsPerPage,
		handleSearch,
	} = useUserRecords();

	console.log({ searchResults });

	return (
		<Fragment>
			{loading && (
				<CircularProgress style={{ position: "fixed", top: "2.5rem", right: "2.5rem" }} />
			)}

			{/* Search */}
			<div className={classes.root}>
				<AppBar position="static" className={classes.appBar}>
					<Toolbar>
						<Typography className={classes.title} variant="h6" noWrap>
							QUESTION #2
						</Typography>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder="Search…"
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								inputProps={{ "aria-label": "search" }}
								value={search}
								onChange={handleSearch}
							/>
						</div>
					</Toolbar>
				</AppBar>
			</div>

			{/* Table */}
			<TableContainer component={Paper} className={classes.paper}>
				<Table className={classes.table} aria-label="custom pagination table">
					<TableHead>
						<TableRow>
							<TableCell style={{ width: 160 }}>Firstname</TableCell>
							<TableCell style={{ width: 160 }}>Lastname</TableCell>
							<TableCell style={{ width: 160 }}>Email</TableCell>
							<TableCell style={{ width: 160 }}>City</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{currPageUsers?.map((user, idx) => (
							<TableRow key={`${user.firstName}-${idx}`}>
								<TableCell component="th" scope="row">
									{user.firstName}
								</TableCell>
								<TableCell style={{ width: 160 }}>{user.lastName}</TableCell>
								<TableCell style={{ width: 160 }}>{user.email}</TableCell>
								<TableCell style={{ width: 160 }}>{user.city}</TableCell>
							</TableRow>
						))}

						{/*
					{emptyRows > 0 && (
						<TableRow style={{ height: 53 * emptyRows }}>
							<TableCell colSpan={6} />
						</TableRow>
					)} */}
					</TableBody>

					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[10, 25, 50, 75, 100]}
								colSpan={3}
								count={totalRecords}
								rowsPerPage={recordsPerPage}
								page={currPage}
								SelectProps={{
									inputProps: { "aria-label": "rows per page" },
									native: true,
								}}
								onChangePage={handleChangePage}
								onChangeRowsPerPage={handleChangeRowsPerPage}
								ActionsComponent={Pagination}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</Fragment>
	);
}

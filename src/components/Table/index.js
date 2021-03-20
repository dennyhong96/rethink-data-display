import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { useUserRecords } from "@context/UserRecords";
import TFooter from "@components/TableFooter";
import UserRow from "@components/UserRow";
import useStyles from "./styles";

// Highlight matching characters in a record
const highlightMatchingUsers = result => {
	const { item: user, matches } = result;
	const [firstMatch] = matches; // For now, highlight the first match in a record

	return Object.keys(user).reduce((acc, key) => {
		if (key !== firstMatch?.key) return { ...acc, [key]: user[key] };
		return {
			...acc,
			[key]: user[key].split("").map((ch, chIndex) => {
				const [firstMathcingIndices] = firstMatch.indices;
				const [startIdx, endIdx] = firstMathcingIndices;
				if (chIndex < startIdx || chIndex > endIdx) {
					return <span key={chIndex}>{ch}</span>;
				}
				return (
					<span key={chIndex} style={{ color: "orangered", fontWeight: "bold" }}>
						{ch}
					</span>
				);
			}),
		};
	}, {});
};

const DataTable = () => {
	const classes = useStyles();

	const { currPageUsers, search, searchResults } = useUserRecords();

	return (
		<TableContainer component={Paper} className={classes.paper}>
			<Table className={classes.table} aria-label="custom pagination table">
				{/* Table Head */}
				<TableHead>
					<TableRow>
						<TableCell align="left" className={classes.cell}>
							Firstname
						</TableCell>
						<TableCell align="left" className={classes.cell}>
							Lastname
						</TableCell>
						<TableCell align="left" className={classes.cell}>
							Email
						</TableCell>
						<TableCell align="left" className={classes.cell}>
							City
						</TableCell>
					</TableRow>
				</TableHead>

				{/* Table body */}
				<TableBody>
					{/* Render search results when searching */}
					{!!search &&
						!!searchResults.length &&
						searchResults.map((result, idx) => {
							const userWithHightlighedMatch = highlightMatchingUsers(result);
							return (
								<UserRow
									key={`${userWithHightlighedMatch.firstName}-${idx}`}
									user={userWithHightlighedMatch}
								/>
							);
						})}

					{/* Render all user data when not search or no search results */}
					{!searchResults.length &&
						currPageUsers?.map((user, idx) => (
							<UserRow key={`${user.firstName}-${idx}`} user={user} />
						))}
				</TableBody>

				{/* For now, render pagination when only displaying all user data */}
				{/* Need to add a few more 'actions' to the UserRecordsContext to enable paaginating search results */}
				{!search && <TFooter />}
			</Table>
		</TableContainer>
	);
};

export default DataTable;

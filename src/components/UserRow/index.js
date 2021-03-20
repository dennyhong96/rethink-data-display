import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import useStyles from "./styles";

const UserRow = ({ user }) => {
	const classes = useStyles();

	return (
		<TableRow>
			<TableCell align="left" className={classes.cell}>
				{user.firstName}
			</TableCell>
			<TableCell align="left" className={classes.cell}>
				{user.lastName}
			</TableCell>
			<TableCell align="left" className={classes.cell}>
				{user.email}
			</TableCell>
			<TableCell align="left" className={classes.cell}>
				{user.city}
			</TableCell>
		</TableRow>
	);
};

UserRow.propTypes = {
	user: PropTypes.object,
};

export default UserRow;

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	paper: {
		maxWidth: 1000,
		width: "90%",
		margin: "0 auto",
	},
	table: {
		minWidth: 500,
	},
	cell: {
		width: 160,
	},
}));

export default useStyles;

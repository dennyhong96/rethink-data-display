import { makeStyles, fade } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
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
	closeIcon: {
		color: "#fff",
	},
}));

export default useStyles;
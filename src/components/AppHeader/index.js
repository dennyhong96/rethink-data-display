import InputBase from "@material-ui/core/InputBase";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/close";

import { useUserRecords } from "@context/UserRecords";
import useStyles from "./styles";
import { IconButton } from "@material-ui/core";

const AppHeader = () => {
	const classes = useStyles();

	const {
		// State slices
		search,
		loading,
		searchResults,

		// Actions
		handleSearch,
	} = useUserRecords();
	return (
		<div className={classes.root}>
			<AppBar position="static" className={classes.appBar}>
				<Toolbar>
					{/* Title */}
					<Typography className={classes.title} variant="h6" noWrap>
						{search && loading && `Searching results for ${search}...`}
						{search &&
							!loading &&
							(searchResults.length
								? `Showing results for ${search}...`
								: `No results for ${search}, display all users`)}
						{!search && "You can paginate or search for users"}
					</Typography>

					{/* Search Input */}
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search users..."
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ "aria-label": "search" }}
							value={search}
							onChange={handleSearch}
							data-testid="search-wrapper"
						/>
					</div>

					{/* Clear search text */}
					<IconButton
						data-testid="search-clear"
						aria-label="delete"
						onClick={() => handleSearch({ target: { value: "" } })}
					>
						<CloseIcon fontSize="small" className={classes.closeIcon} />
					</IconButton>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default AppHeader;

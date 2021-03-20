import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import Pagination from "@components/Pagination";
import { useUserRecords } from "@context/UserRecords";

const TFooter = () => {
	const {
		// State slices
		currPage,
		totalRecords,
		recordsPerPage,

		// Actions
		handleChangePage,
		handleChangeRowsPerPage,
	} = useUserRecords();

	return (
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
	);
};

export default TFooter;

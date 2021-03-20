import { Fragment } from "react";

import AppHeader from "@components/AppHeader";
import DataTable from "@components/Table";
import Loader from "@components/Loader";

export default function CustomPaginationActionsTable() {
	return (
		<Fragment>
			<Loader />
			<AppHeader />
			<DataTable />
		</Fragment>
	);
}

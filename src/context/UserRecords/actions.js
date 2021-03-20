import { listUsers, searchUser } from "@lib/api";

export const loadTable = async (dispatch, state) => {
	const { recordsPerPage } = state;

	const { users, totalRecords } = await listUsers({
		limit: recordsPerPage,
		skip: 0,
	});

	dispatch({
		type: "NEW_PAGE_LOADED",
		payload: {
			newPage: 0,
			users,
			totalRecords,
		},
	});
};

export const switchPage = (dispatch, state) => async newPage => {
	const { recordsPerPage, userPages } = state;

	if (userPages[newPage]) {
		return dispatch({
			type: "PAGE_SWITCHED",
			payload: newPage,
		});
	}

	dispatch({ type: "STARTED_LOADING" });

	const { users, totalRecords } = await listUsers({
		limit: recordsPerPage,
		skip: newPage * recordsPerPage,
	});

	return dispatch({
		type: "NEW_PAGE_LOADED",
		payload: {
			newPage,
			users,
			totalRecords,
		},
	});
};

export const changeRowPerPage = dispatch => async newRowsPerPage => {
	dispatch({ type: "STARTED_LOADING" });

	const { users, totalRecords } = await listUsers({
		limit: newRowsPerPage,
		skip: 0,
	});

	dispatch({
		type: "ROW_PER_PAGE_CHANGED",
		payload: {
			newRowsPerPage,
			users,
			totalRecords,
		},
	});
};

export const searchRecord = dispatch => async newSearchText => {
	dispatch({
		type: "SEARCH_TEXT_CHANGED",
		payload: newSearchText,
	});

	dispatch({ type: "STARTED_LOADING" });

	await searchUser({
		search: newSearchText,
		callback(results) {
			dispatch({
				type: "SEARCH_RESULTS_LOADED",
				payload: results,
			});
		},
	});
};

import { listUsers, searchUser } from "@lib/api";

import {
	NEW_PAGE_LOADED,
	CLEAR_SEARCH_RESULTS,
	PAGE_SWITCHED,
	ROW_PER_PAGE_CHANGED,
	SEARCH_RESULTS_LOADED,
	SEARCH_TEXT_CHANGED,
	STARTED_LOADING,
} from "./actionTypes";

export const loadTable = async (dispatch, state) => {
	const { recordsPerPage } = state;

	const { users, totalRecords } = await listUsers({
		limit: recordsPerPage,
		skip: 0,
	});

	dispatch({
		type: NEW_PAGE_LOADED,
		payload: {
			newPage: 0,
			users,
			totalRecords,
		},
	});
};

export const switchPage = (dispatch, state) => async newPage => {
	const { recordsPerPage, userPages } = state;

	// If we already have records of that page
	// Only change the page number slice of state
	// No need to fetch remote data
	if (userPages[newPage]) {
		return dispatch({
			type: PAGE_SWITCHED,
			payload: newPage,
		});
	}

	// Start fetching remote data
	dispatch({ type: STARTED_LOADING });

	const { users, totalRecords } = await listUsers({
		limit: recordsPerPage,
		skip: newPage * recordsPerPage,
	});

	return dispatch({
		type: NEW_PAGE_LOADED,
		payload: {
			newPage,
			users,
			totalRecords,
		},
	});
};

export const changeRowPerPage = dispatch => async newRowsPerPage => {
	dispatch({ type: STARTED_LOADING });

	const { users, totalRecords } = await listUsers({
		limit: newRowsPerPage,
		skip: 0,
	});

	dispatch({
		type: ROW_PER_PAGE_CHANGED,
		payload: {
			newRowsPerPage,
			users,
			totalRecords,
		},
	});
};

export const searchRecord = dispatch => async newSearchText => {
	// Update search text slice of state
	dispatch({
		type: SEARCH_TEXT_CHANGED,
		payload: newSearchText,
	});

	// No need to search if user cleared search text field
	// Clear search result slice of state
	if (!newSearchText) {
		return dispatch({
			type: CLEAR_SEARCH_RESULTS,
		});
	}

	// Start searching
	dispatch({ type: STARTED_LOADING });
	await searchUser({
		search: newSearchText,

		// Use callback pattern to dispach results to state
		// once the api is called after debounce timeout
		// And we have got the results
		callback({ result }) {
			dispatch({
				type: SEARCH_RESULTS_LOADED,
				payload: result,
			});
		},
	});
};

import { createContext, useContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";

import reducer from "./reducer";
import { changeRowPerPage, loadTable, switchPage, searchRecord } from "./actions";

export const UserRecordsContext = createContext();

const INITIAL_STATE = {
	userPages: {},
	totalRecords: 0,
	recordsPerPage: 10,
	currPage: 0,
	search: "",
	loading: true,
	searchResults: [],
};

export const UserRecordsProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	const {
		currPage,
		totalRecords,
		recordsPerPage,
		userPages,
		search,
		loading,
		searchResults,
	} = state;

	useEffect(() => {
		(async () => {
			// Fetch first page of uses on load
			await loadTable(dispatch, state);
		})();
	}, []);

	const handleChangePage = async (_, newPage) => {
		await switchPage(dispatch, state)(newPage);
	};

	const handleChangeRowsPerPage = evt => {
		const newRowsPerPage = Number(evt.target.value);
		changeRowPerPage(dispatch)(newRowsPerPage);
	};

	const handleSearch = evt => {
		searchRecord(dispatch)(evt.target.value);
	};

	const currPageUsers = userPages[currPage];

	return (
		<UserRecordsContext.Provider
			value={{
				// Slices
				currPage,
				totalRecords,
				currPageUsers,
				recordsPerPage,
				userPages,
				search,
				loading,
				searchResults,

				// Actions
				handleChangePage,
				handleChangeRowsPerPage,
				handleSearch,
			}}
		>
			{children}
		</UserRecordsContext.Provider>
	);
};

UserRecordsProvider.propTypes = {
	children: PropTypes.node,
};

// Expose state slices and actions via a hook api
export const useUserRecords = () => {
	const context = useContext(UserRecordsContext);
	return { ...context };
};

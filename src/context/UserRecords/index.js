import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import { changeRowPerPage, loadTable, switchPage, searchRecord } from "./actions";

export const UserRecordsContext = createContext();

const INITIAL_STATE = {
	userPages: {},
	totalRecords: 0,
	recordsPerPage: 25,
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
			await loadTable(dispatch, state);
		})();
	}, []);

	const currPageUsers = userPages[currPage];

	const handleChangePage = async (event, newPage) => {
		await switchPage(dispatch, state)(newPage);
	};

	const handleChangeRowsPerPage = evt => {
		const newRowsPerPage = Number(evt.target.value);
		changeRowPerPage(dispatch)(newRowsPerPage);
	};

	const handleSearch = evt => {
		searchRecord(dispatch)(evt.target.value);
	};

	return (
		<UserRecordsContext.Provider
			value={{
				currPage,
				totalRecords,
				currPageUsers,
				recordsPerPage,
				userPages,
				search,
				loading,
				searchResults,

				//
				handleChangePage,
				handleChangeRowsPerPage,
				handleSearch,
			}}
		>
			{children}
		</UserRecordsContext.Provider>
	);
};

export const useUserRecords = () => {
	const {
		currPage,
		totalRecords,
		currPageUsers,
		recordsPerPage,
		userPages,
		search,
		loading,
		searchResults,

		//
		handleChangePage,
		handleChangeRowsPerPage,
		handleSearch,
	} = useContext(UserRecordsContext);

	return {
		currPage,
		totalRecords,
		currPageUsers,
		recordsPerPage,
		userPages,
		search,
		loading,
		searchResults,

		//
		handleChangePage,
		handleChangeRowsPerPage,
		handleSearch,
	};
};

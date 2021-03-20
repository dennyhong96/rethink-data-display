const reducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case "STARTED_LOADING": {
			return {
				...state,
				loading: true,
			};
		}

		case "NEW_PAGE_LOADED": {
			const { newPage, users, totalRecords } = payload;
			return {
				...state,
				userPages: { ...state.userPages, [newPage]: users },
				currPage: newPage,
				totalRecords,
				loading: false,
			};
		}

		case "PAGE_SWITCHED": {
			return {
				...state,
				currPage: payload,
			};
		}

		case "ROW_PER_PAGE_CHANGED": {
			const { newRowsPerPage, users, totalRecords } = payload;
			return {
				...state,
				currPage: 0,
				recordsPerPage: newRowsPerPage,
				userPages: { 0: users },
				totalRecords,
				loading: false,
			};
		}

		case "SEARCH_TEXT_CHANGED": {
			return {
				...state,
				search: payload,
			};
		}

		case "SEARCH_RESULTS_LOADED": {
			return {
				...state,
				searchResults: payload,
				loading: false,
			};
		}

		default:
			return state;
	}
};

export default reducer;

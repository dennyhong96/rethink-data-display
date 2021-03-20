import debounce from "@utils/debounce";

export const listUsers = async ({ limit, skip }) => {
	return await fetch(`/api/users?skip=${skip}&limit=${limit}`).then(data => data.json());
};

// Debounce the search api request to reduce 'server' load
export const searchUser = debounce(async ({ search, callback }) => {
	await fetch(`/api/search?text=${search}`)
		.then(data => data.json())
		.then(callback);
}, 250);

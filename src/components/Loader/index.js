import { CircularProgress } from "@material-ui/core";

import { useUserRecords } from "@context/UserRecords";

const Loader = () => {
	const { loading } = useUserRecords();

	return loading ? (
		<CircularProgress style={{ position: "fixed", top: "2.5rem", right: "2.5rem" }} />
	) : null;
};

export default Loader;

import mockAPIDelay from "@utils/mockAPIDelay";
import fs from "fs";
import path from "path";

export default async (req, res) => {
	let { limit, skip } = req.query;
	limit = Number(limit) || 25;
	skip = Number(skip) || 0;

	const data = fs.readFileSync(path.resolve("_data", "users.json"));
	const users = JSON.parse(data);

	// Simulate api call delay
	await mockAPIDelay();

	return res.status(200).json({
		users: users.slice(skip, skip + limit),
		totalRecords: users.length,
	});
};

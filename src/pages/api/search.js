import mockAPIDelay from "@utils/mockAPIDelay";
import fs from "fs";
import path from "path";
import Fuse from "fuse.js";

export default async (req, res) => {
	const { text } = req.query;

	const data = fs.readFileSync(path.resolve("_data", "users.json"));
	const users = JSON.parse(data);

	// Simulate a text search
	// Use fuse.js to fuzzy search through json
	const searchOptions = {
		includeScore: true,
		keys: ["firstName", "lastName", "email"], // indexes
		threshold: 0.2,
		includeMatches: true,
		minMatchCharLength: 3,
	};
	const fuse = new Fuse(users, searchOptions);
	const result = fuse.search(text);

	// Simulate api call delay
	await mockAPIDelay();

	return res.status(200).json({
		result,
	});
};

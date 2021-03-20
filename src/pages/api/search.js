import mockAPIDelay from "@utils/mockAPIDelay";
import fs from "fs";
import path from "path";
import Fuse from "fuse.js";

export default async (req, res) => {
	const { text } = req.query;

	const data = fs.readFileSync(path.resolve("_data", "users.json"));
	const users = JSON.parse(data);

	const options = {
		includeScore: true,
		keys: ["firstName", "lastName", "email", "city"],
		threshold: 0.1,
	};
	const fuse = new Fuse(users, options);
	const result = fuse.search(text);

	await mockAPIDelay();

	return res.status(200).json({
		result,
	});
};

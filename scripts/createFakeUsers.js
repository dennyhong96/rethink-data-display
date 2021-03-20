const fs = require("fs");
const path = require("path");
const faker = require("faker");
const { v4: uuidv4 } = require("uuid");

// Generate fake user data with faker to simulate DB
function createUsers() {
	return Array.from({ length: 10000 }, () => {
		const firstName = faker.name.firstName();
		const lastName = faker.name.lastName();
		const email = faker.internet.email();
		const city = faker.address.city();
		return {
			id: uuidv4(),
			firstName,
			lastName,
			email,
			city,
		};
	});
}

const users = createUsers();
fs.writeFileSync(path.resolve("_data", "users.json"), JSON.stringify(users, null, "\t"));

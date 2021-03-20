import listUsers from "@pages/api/users";

const INVALID_QUERY = { limit: "sdsdf.fd", skip: "0d.fdfdfds" };
const VALID_QUERY = { limit: "100", skip: "200" };

describe("List users api route", () => {
	beforeEach(() => {});

	test("Sould return default 25 user records when passed invalid limit query", async () => {
		const res = await listUsers(
			{ query: INVALID_QUERY },
			{
				status() {
					return this;
				},
				json(obj) {
					return JSON.stringify(obj);
				},
			},
		);
		const { users } = JSON.parse(res);
		expect(users).toHaveLength(25);
	});

	test("Sould return correct number of user records as specific in query", async () => {
		const res = await listUsers(
			{ query: VALID_QUERY },
			{
				status() {
					return this;
				},
				json(obj) {
					return JSON.stringify(obj);
				},
			},
		);
		const { users } = JSON.parse(res);
		expect(users).toHaveLength(Number(VALID_QUERY.limit));
	});
});

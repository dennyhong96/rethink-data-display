module.exports = {
	setupFilesAfterEnv: ["./jest.setup.js"],
	moduleNameMapper: {
		"^@components(.*)$": "<rootDir>/src/components$1",
		"^@lib(.*)$": "<rootDir>/src/lib$1",
		"^@pages(.*)$": "<rootDir>/src/pages$1",
		"^@styles(.*)$": "<rootDir>/src/styles$1",
		"^@utils(.*)$": "<rootDir>/src/utils$1",
	},
};

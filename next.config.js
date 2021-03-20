module.exports = {
	webpack: (config, { isServer }) => {
		// Fixes npm packages that depend on `fs` module
		if (!isServer) {
			config.node = {
				fs: "empty",
			};
		}

		return config;
	},
	images: {
		domains: [
			"images.unsplash.com",
			"via.placeholder.com",
			"firebasestorage.googleapis.com",
			"lh3.googleusercontent.com",
		],
	},
};
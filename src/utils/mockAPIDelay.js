const mockAPIDelay = async () => {
	await new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, (Math.floor(Math.random() * 4) + 1) * 100);
	});
};

export default mockAPIDelay;

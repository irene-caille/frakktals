export const round = (val: number, decimals = 2) =>
	Math.floor(val * 10 ** decimals) / 10 ** decimals

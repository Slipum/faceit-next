export const headers = {
	accept: 'application/json, text/plain, */*',
	'accept-language': 'ru,en;q=0.9,en-GB;q=0.8,en-US;q=0.7',
	'faceit-referer': 'new-frontend',
	priority: 'u=1, i',
	referer: 'https://www.faceit.com/ru/players/s1mle/stats/cs2',
	'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126"',
	'sec-ch-ua-mobile': '?0',
	'sec-ch-ua-platform': '"Windows"',
	'sec-fetch-dest': 'empty',
	'sec-fetch-mode': 'cors',
	'sec-fetch-site': 'same-origin',
	'user-agent':
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0',
};

export const recentResult = {
	de_mirage: '',
	de_ancient: '',
	de_anubis: '',
	de_dust2: '',
	de_inferno: '',
	de_nuke: '',
	de_train: '',
	de_vertigo: '',
};

export const qualityMap = {
	de_mirage: 0,
	de_ancient: 0,
	de_anubis: 0,
	de_dust2: 0,
	de_inferno: 0,
	de_nuke: 0,
	de_train: 0,
	de_vertigo: 0,
};

export const winrate = {
	de_mirage: 0,
	de_ancient: 0,
	de_anubis: 0,
	de_dust2: 0,
	de_inferno: 0,
	de_nuke: 0,
	de_train: 0,
	de_vertigo: 0,
};

export const stats = [
	{
		title: 'Win rate %',
		value: 0,
		change: 0,
		ranges: { red: [0, 39], yellow: [40, 52], green: [53, 100] },
	},
	{
		title: 'AVG kills',
		value: 0,
		change: 0,
		ranges: { red: [0, 11.99], yellow: [12, 15.99], green: [16, 25] },
	},
	{
		title: 'K/D',
		value: 0,
		change: 0,
		ranges: { red: [0, 0.79], yellow: [0.8, 1.09], green: [1.1, 2] },
	},
	{
		title: 'K/R',
		value: 0,
		change: 0,
		ranges: { red: [0, 0.5], yellow: [0.51, 0.75], green: [0.76, 2] },
	},
	{
		title: 'Headshot %',
		value: 0,
		change: 0,
		ranges: { red: [0, 39.99], yellow: [40, 62], green: [63, 100] },
	},
];

export const statsSET = [
	{ title: 'Win rate %', value: 0 },
	{ title: 'AVG kills', value: 0 },
	{ title: 'K/D', value: 0 },
	{ title: 'K/R', value: 0 },
	{ title: 'Headshot %', value: 0 },
];

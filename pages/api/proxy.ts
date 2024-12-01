import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const targetUrl = req.query.url as string;

	if (!targetUrl) {
		return res.status(400).send('URL параметр отсутствует');
	}

	try {
		const response = await axios.get(targetUrl, {
			headers: {
				Accept: 'application/json',
				'User-Agent': 'Next.js Proxy',
			},
		});
		res.status(200).json(response.data);
	} catch (error) {
		console.error('Ошибка при запросе к целевому URL:', error);
		res.status(500).send('Ошибка сервера');
	}
}

'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type MainProps = {
	username: string;
};

type UserData = {
	country: string;
	avatar: string;
	games: {
		cs2: {
			faceit_elo: number;
			skill_level: number;
		};
	};
};

export function Main({ username }: MainProps) {
	const [data, setData] = useState<UserData | null>(null);
	const [error, setError] = useState<string | null>(null);

	// GET
	useEffect(() => {
		const headers = {
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
		const fetchData = async () => {
			try {
				if (!username) return;

				const baseURL = 'https://www.faceit.com/ru/players/';
				let cleanUsername = username;
				if (cleanUsername.startsWith(baseURL)) {
					cleanUsername = cleanUsername.replace(baseURL, '');
				}

				const url = `https://www.faceit.com/api/users/v1/nicknames/${cleanUsername}`;
				const response = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`, {
					method: 'GET',
					headers: headers,
				});

				if (!response.ok) {
					throw new Error(`Ошибка сети: ${response.status} - ${response.statusText}`);
				}

				const result = await response.json();
				setData(result.payload);
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				}
			}
		};

		fetchData();
	}, [username]);

	if (error) {
		console.error(error);
	}
	// ---

	if (data) {
		console.log(data);
		return (
			<div className="main-container">
				<div id="main-c" className="main-info">
					<div id="user-back" className="user-container">
						<div className="overlay"></div>
						<div id="userInfo" className="user-info">
							{data.avatar ? (
								<Image id="avatar" src={data.avatar} alt="avatar" width={300} height={300} />
							) : (
								<Image id="avatar" src="/Group1.png" alt="avatar" width={300} height={300} />
							)}
							<div className="avg-container">
								<div id="average-kills">
									<h1 className="username">{username}</h1>
									<div className="elo-container">
										<h2>Current ELO: {data.games.cs2.faceit_elo}</h2>
										<div className="current-elo">
											<Image
												className="iconLevel"
												src={`https://cdn-frontend.faceit-cdn.net/web/static/media/assets_images_skill-icons_skill_level_${data.games.cs2.skill_level}_svg.svg`}
												alt="ico-level"
												width={40}
												height={40}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<hr />
					<div id="country-list">
						<div className="country-info">
							<i id="country-icon" className={`fi fi-${data.country}`}></i>
							<p id="country">{data.country.toUpperCase()}</p>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return <></>;
	}
}

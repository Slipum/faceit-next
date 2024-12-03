'use client';

import { AnotherStat, Header, Main, Performance } from '@/components';
import { useState } from 'react';

type GameData = {
	cs2: {
		faceit_elo: number;
		skill_level: number;
		region: string;
		game_name: string;
	};
	csgo: {
		faceit_elo: number;
		skill_level: number;
		region: string;
		game_name: string;
	};
};

export default function Home() {
	const [username, setUsername] = useState<string>('');
	const [games, setGames] = useState<GameData | undefined>(undefined);
	return (
		<div>
			<Header setUsername={setUsername} />
			<Main username={username} setGames={setGames} />
			<Performance />
			<AnotherStat games={games} />
		</div>
	);
}

'use client';

import { AnotherStat, Graph, Header, ListMaps, Main, Performance } from '@/components';
import { useCallback, useState } from 'react';

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
	const [userId, setUserId] = useState<string>('');
	const [games, setGames] = useState<GameData | undefined>(undefined);
	const [listElo, setListElo] = useState<number[]>([]);

	const updateListElo = useCallback((elo: number[]) => {
		setListElo(elo);
	}, []);
	return (
		<>
			<Header setUsername={setUsername} />
			<Main username={username} setGames={setGames} setUserId={setUserId} />
			{username && (
				<>
					<Performance />
					<Graph listElo={listElo} />
					<AnotherStat games={games} />
					<ListMaps userId={userId} setListElo={updateListElo} />
				</>
			)}
		</>
	);
}

'use client';

import {
	AnotherStat,
	Graph,
	Header,
	ListMaps,
	Main,
	MapsWin,
	Performance,
} from '@/components';
import { useCallback, useState } from 'react';

type StatType = {
	title: string;
	value: number;
	change: number;
	ranges: {
		red: [number, number];
		yellow: [number, number];
		green: [number, number];
	};
};

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
	const [stats, setStats] = useState<StatType[]>([]); // Состояние для stats

	const updateListElo = useCallback(
		(elo: number[]) => {
			setListElo(elo);
		},
		[setListElo],
	);

	return (
		<>
			<Header setUsername={setUsername} />
			<Main username={username} setGames={setGames} setUserId={setUserId} />
			{username && (
				<>
					<Performance stats={stats} />
					<Graph listElo={listElo} />
					<AnotherStat games={games} />
					<MapsWin winrate={{}} qualityMap={{}} arr={{}} />
					<ListMaps
						userId={userId}
						setListElo={updateListElo}
						setStats={setStats}
					/>
				</>
			)}
		</>
	);
}

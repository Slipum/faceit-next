'use client';

import {
	AnotherStat,
	Graph,
	ListMaps,
	Main,
	MapsWin,
	Performance,
} from '@/components';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useState } from 'react';

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

type winRate = {
	[key: string]: number;
};

type rec = {
	[key: string]: string;
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

function SearchPageContent() {
	const searchParams = useSearchParams();
	const username = searchParams?.get('search') ?? '';

	const [userId, setUserId] = useState<string>('');
	const [games, setGames] = useState<GameData | undefined>(undefined);
	const [listElo, setListElo] = useState<number[]>([]);
	const [stats, setStats] = useState<StatType[]>([]);
	const [winrate, setWinrate] = useState<winRate>({});
	const [qualityMap, setQualityMap] = useState<winRate>({});
	const [arr, setArr] = useState<rec>({});

	const updateListElo = useCallback(
		(elo: number[]) => {
			setListElo(elo);
		},
		[setListElo],
	);

	return (
		<>
			<Link href={'/'} className="undo-main">
				<i className="fa-solid fa-reply fa-2xl"></i>
			</Link>
			{username && (
				<>
					<Main username={username} setGames={setGames} setUserId={setUserId} />
					<Performance stats={stats} />
					<Graph listElo={listElo} />
					<AnotherStat games={games} />
					<MapsWin winrate={winrate} qualityMap={qualityMap} arr={arr} />
					<ListMaps
						userId={userId}
						setListElo={updateListElo}
						setStats={setStats}
						setWin={setWinrate}
						setQual={setQualityMap}
						setArr={setArr}
					/>
				</>
			)}
		</>
	);
}

export default function SearchPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<SearchPageContent />
		</Suspense>
	);
}

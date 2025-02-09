'use client';

import { headers } from '@/constants';
import { useEffect, useState } from 'react';
import StatBlock from './StatBlock';

interface ApiMatchData {
	matchId: string;
	nickname: string;
	date: string;
	i1?: string; // Карта
	i18?: string; // Счет
	i6?: number; // Убийства
	i7?: number; // Ассисты
	i8?: number; // Смерти
	c10?: number; // ADR
	c2?: number; // K/D
	c3?: number; // K/R
	c4?: number; // HS %
	elo?: number; // ELO
	i5?: string; // Team
}

type MatchData = {
	matchId: string;
	nickname: string;
	date: string;
	map: string;
	score: string;
	kills: number;
	assists: number;
	deaths: number;
	adr: number;
	kd: number;
	kr: number;
	hs: number;
	elo: number;
	team: string;
};

type Props = {
	first: string;
	second: string;
};

type MatchProps = {
	maxElo: number;
	winRate: number;
	kills: number;
	deaths: number;
	adr: number;
	kr: number;
	hs: number;
};

type Player = {
	name: string;
	matches: MatchData[];
	maxElo: number;
	winRate: number;
	kills: number;
	deaths: number;
	adr: number;
	kr: number;
	hs: number;
};

type Players = {
	first: Player;
	second: Player;
};

export default function Compare({ first, second }: Props) {
	const [matches, setMatches] = useState<MatchData[]>([]);
	const [matchesT, setMatchesT] = useState<MatchData[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const [players, setPlayers] = useState<Players>();

	useEffect(() => {
		const fetchMatches = async () => {
			try {
				if (!first || !second) return;
				const response = await fetch(
					`/api/proxy?url=https://www.faceit.com/api/stats/v1/stats/time/users/${first}/games/cs2?game_mode=5v5`,
					{
						method: 'GET',
						headers: headers,
					},
				);

				const res = await fetch(
					`/api/proxy?url=https://www.faceit.com/api/stats/v1/stats/time/users/${second}/games/cs2?game_mode=5v5`,
					{
						method: 'GET',
						headers: headers,
					},
				);

				const data = await response.json();
				const formattedMatches = data.map((match: ApiMatchData) => ({
					matchId: match.matchId,
					nickname: match.nickname,
					date: match.date,
					map: match.i1 || 'N/A',
					score: match.i18 || 'N/A',
					kills: match.i6 || 0,
					assists: match.i7 || 0,
					deaths: match.i8 || 0,
					adr: match.c10 || 0,
					kd: match.c2 || 0,
					kr: match.c3 || 0,
					hs: match.c4 || 0,
					elo: match.elo || 0,
					team: match.i5 || '',
				}));

				setMatches(formattedMatches);

				const dataT = await res.json();
				const formattedMatchesT = dataT.map((match: ApiMatchData) => ({
					matchId: match.matchId,
					nickname: match.nickname,
					date: match.date,
					map: match.i1 || 'N/A',
					score: match.i18 || 'N/A',
					kills: match.i6 || 0,
					assists: match.i7 || 0,
					deaths: match.i8 || 0,
					adr: match.c10 || 0,
					kd: match.c2 || 0,
					kr: match.c3 || 0,
					hs: match.c4 || 0,
					elo: match.elo || 0,
					team: match.i5 || '',
				}));

				setMatchesT(formattedMatchesT);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Произошла ошибка');
			} finally {
				setIsLoading(false);
			}
		};
		fetchMatches();
	}, [first, second]);

	useEffect(() => {
		if (matches.length > 0 && matchesT.length > 0) {
			const fr: MatchProps = {
				maxElo: 0,
				winRate: 0,
				kills: 0,
				deaths: 0,
				adr: 0,
				kr: 0,
				hs: 0,
			};

			const sc: MatchProps = {
				maxElo: 0,
				winRate: 0,
				kills: 0,
				deaths: 0,
				adr: 0,
				kr: 0,
				hs: 0,
			};

			matches.map((match, index) => {
				if (match.elo > fr.maxElo) {
					fr.maxElo = match.elo;
				}
				fr.adr += Number(match.adr);
				if (matches[index + 1]) {
					if (matches[index].elo - matches[index + 1].elo > 0) {
						fr.winRate += 1;
					}
				}
				fr.kills += Number(match.kills);
				fr.deaths += Number(match.deaths);
				fr.kr += Number(match.kr);
				fr.hs += Number(match.hs);
			});

			matchesT.map((match, index) => {
				if (match.elo > sc.maxElo) {
					sc.maxElo = match.elo;
				}
				sc.adr += Number(match.adr);
				if (matchesT[index + 1]) {
					if (matchesT[index].elo - matchesT[index + 1].elo > 0) {
						sc.winRate += 1;
					}
				}
				sc.kills += Number(match.kills);
				sc.deaths += Number(match.deaths);
				sc.kr += Number(match.kr);
				sc.hs += Number(match.hs);
			});

			setPlayers({
				first: {
					name: matches[0].nickname,
					matches: matches,
					maxElo: fr.maxElo,
					winRate: fr.winRate,
					kills: fr.kills,
					deaths: fr.deaths,
					adr: fr.adr,
					kr: fr.kr,
					hs: fr.hs,
				},
				second: {
					name: matchesT[0].nickname,
					matches: matchesT,
					maxElo: sc.maxElo,
					winRate: sc.winRate,
					kills: sc.kills,
					deaths: sc.deaths,
					adr: sc.adr,
					kr: sc.kr,
					hs: sc.hs,
				},
			});
		}
	}, [matches, matchesT]);

	if (isLoading) {
		return <p>Загрузка...</p>;
	}

	if (error) {
		return <p>Ошибка: {error}</p>;
	}

	if (!matches.length || !matchesT.length) {
		return <></>;
	}

	if (players) {
		return (
			<div className="comp-wrapper">
				<StatBlock
					title={'Max Elo'}
					firstValue={players.first.maxElo}
					secondValue={players.second.maxElo}
				/>
				<StatBlock
					title={'Winrate %'}
					firstValue={players.first.winRate}
					secondValue={players.second.winRate}
				/>
				<StatBlock
					title={'Real K/D'}
					firstValue={parseFloat(
						(players.first.kills / players.first.deaths).toFixed(2),
					)}
					secondValue={parseFloat(
						(players.second.kills / players.second.deaths).toFixed(2),
					)}
				/>
				<StatBlock
					title={'K/R'}
					firstValue={parseFloat(players.first.kr.toFixed(2))}
					secondValue={parseFloat(players.second.kr.toFixed(2))}
				/>
				<StatBlock
					title={'ADR'}
					firstValue={parseFloat(
						(players.first.adr / players.first.matches.length).toFixed(2),
					)}
					secondValue={parseFloat(
						(players.second.adr / players.second.matches.length).toFixed(2),
					)}
				/>
				<StatBlock
					title={'HS %'}
					firstValue={players.first.hs / players.first.matches.length}
					secondValue={players.second.hs / players.second.matches.length}
				/>
			</div>
		);
	} else {
		return <></>;
	}
}

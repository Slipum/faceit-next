import { getIconMap, headers } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import TitleMatches from './TitleMatches';

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

type winRate = {
	[key: string]: number;
};

type rec = {
	[key: string]: string;
};

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

type ListMapsProps = {
	userId: string;
	setListElo: (elo: number[]) => void;
	setStats: (stats: StatType[]) => void;
	setWin: (winrate: winRate) => void;
	setQual: (qual: winRate) => void;
	setArr: (qual: rec) => void;
};

export function ListMaps({
	userId,
	setListElo,
	setStats,
	setWin,
	setQual,
	setArr,
}: ListMapsProps) {
	const [matches, setMatches] = useState<MatchData[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	// Фильтрация
	const [selectedMaps, setSelectedMaps] = useState<string[]>([]);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const handleMapFilterChange = (map: string) => {
		setSelectedMaps((prev) =>
			prev.includes(map) ? prev.filter((m) => m !== map) : [...prev, map],
		);
	};
	const filteredMatches = selectedMaps.length
		? matches.filter((match) => selectedMaps.includes(match.map))
		: matches;

	let maxElo: number = 0;
	let lastSessionElo: number = 0;
	let wins: number = 0;
	let totalMatchesToday: number = 0;

	useEffect(() => {
		const fetchMatches = async () => {
			try {
				if (!userId) return;

				setIsLoading(true);
				setError(null);

				const response = await fetch(
					`/api/proxy?url=https://www.faceit.com/api/stats/v1/stats/time/users/${userId}/games/cs2?game_mode=5v5`,
					{
						method: 'GET',
						headers: headers,
					},
				);

				if (!response.ok) {
					throw new Error(
						`Ошибка: ${response.status} - ${response.statusText}`,
					);
				}

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
				const eloList = formattedMatches
					.filter((match: ApiMatchData) => match.elo !== 0) // Условие, которое убирает все match.elo со значением 0
					.map((match: ApiMatchData) => match.elo)
					.reverse();
				setListElo(eloList);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Произошла ошибка');
			} finally {
				setIsLoading(false);
			}
		};

		fetchMatches();
	}, [userId, setListElo, setStats]);

	useEffect(() => {
		if (matches.length === 0) return; // Не обновлять, пока нет матчей

		let totalWins = 0;
		let totalKills = 0;
		let totalADR = 0;
		let totalKD = 0;
		let totalKR = 0;
		let totalHS = 0;
		// ---
		let changeWins = 0;
		let changeKills = 0;
		let changeKD = 0;
		let changeADR = 0;
		let changeKR = 0;
		let changeHS = 0;

		const mW: winRate = {
			de_mirage: 0,
			de_vertigo: 0,
			de_ancient: 0,
			de_dust2: 0,
			de_anubis: 0,
			de_nuke: 0,
			de_inferno: 0,
			de_train: 0,
		};

		const mC: winRate = {
			de_mirage: 0,
			de_vertigo: 0,
			de_ancient: 0,
			de_dust2: 0,
			de_anubis: 0,
			de_nuke: 0,
			de_inferno: 0,
			de_train: 0,
		};

		const Arc: rec = {
			de_mirage: '',
			de_vertigo: '',
			de_ancient: '',
			de_dust2: '',
			de_anubis: '',
			de_nuke: '',
			de_inferno: '',
			de_train: '',
		};

		matches.map((match, index) => {
			changeKills += Number(match.kills);
			changeADR += Number(match.adr);
			changeKD += Number(match.kd);
			changeKR += Number(match.kr);
			changeHS += Number(match.hs);
			mC[match.map] += 1;
			if (index < 99) {
				if (
					matches[index + 1] &&
					Number(getEloChange(match.elo, matches[index + 1].elo, 1)) > 0
				) {
					changeWins += 1;
					mW[match.map] += 1;
				}
			}

			if (Arc[match.map].length < 3) {
				if (
					matches[index + 1] &&
					Number(getEloChange(match.elo, matches[index + 1].elo, 1)) > 0
				) {
					Arc[match.map] += '1';
				} else {
					Arc[match.map] += '0';
				}
			}

			if (index < 10) {
				totalKills += Number(match.kills);
				totalADR += Number(match.adr);
				totalKD += Number(match.kd);
				totalKR += Number(match.kr);
				totalHS += Number(match.hs);
				if (Number(getEloChange(match.elo, matches[index + 1].elo, 1)) > 0) {
					totalWins += 10;
				}
			}
		});

		const updatedStats: StatType[] = [
			{
				title: 'Win rate %',
				value: totalWins,
				change: totalWins - changeWins,
				ranges: { red: [0, 39], yellow: [40, 52], green: [53, 70] },
			},
			{
				title: 'AVG kills',
				value: totalKills,
				change: Number((totalKills / 10 - changeKills / 100).toFixed(2)),
				ranges: { red: [0, 11.99], yellow: [12, 15.99], green: [16, 25] },
			},
			{
				title: 'ADR',
				value: totalADR,
				change: Number((totalADR / 10 - changeADR / 100).toFixed(2)),
				ranges: { red: [0, 60], yellow: [60.1, 75], green: [75.1, 105] },
			},
			{
				title: 'K/D',
				value: totalKD,
				change: Number((totalKD / 10 - changeKD / 100).toFixed(2)),
				ranges: { red: [0, 0.79], yellow: [0.8, 1.09], green: [1.1, 1.7] },
			},
			{
				title: 'K/R',
				value: totalKR,
				change: Number((totalKR / 10 - changeKR / 100).toFixed(2)),
				ranges: { red: [0, 0.5], yellow: [0.51, 0.75], green: [0.76, 1.1] },
			},
			{
				title: 'Headshot %',
				value: totalHS,
				change: Number((totalHS / 10 - changeHS / 100).toFixed(2)),
				ranges: { red: [0, 39.99], yellow: [40, 62], green: [63, 75] },
			},
		];

		setWin(mW);
		setQual(mC);
		setArr(Arc);
		setStats(updatedStats);
	}, [matches, setStats, setWin, setQual, setArr]);

	if (isLoading) {
		return <p>Загрузка...</p>;
	}

	if (error) {
		return <p>Ошибка: {error}</p>;
	}

	if (!matches.length) {
		return <></>;
	}

	const day = new Date(matches[0].date).toDateString();
	matches.map((match, index) => {
		if (match.elo > maxElo) {
			maxElo = match.elo;
		}

		if (
			new Date(matches[0].date).toDateString() ==
			new Date(match.date).toDateString()
		) {
			lastSessionElo += Number(
				getEloChange(match.elo, matches[index + 1].elo, 1),
			);

			if (match.team.includes('team_')) {
				totalMatchesToday += 1;
			}

			if (Number(getEloChange(match.elo, matches[index + 1].elo, 1)) > 0) {
				wins += 1;
			}
		}
	});
	return (
		<>
			<TitleMatches
				maxElo={maxElo}
				wins={wins}
				totalMatchesToday={totalMatchesToday}
				lastSessionElo={lastSessionElo}
			/>
			<div className="matches-container">
				<div id="matches">
					<table>
						<thead>
							<tr>
								<th>Match</th>
								<th>Date</th>
								<th>
									Map
									<span
										onClick={() => setIsOpen(!isOpen)}
										className="filter-button">
										<i className="fa-solid fa-filter"></i>
									</span>
									{isOpen && (
										<div
											className={`dropdown-filter  ${
												filteredMatches.length != 0 ? 'f-1' : 'f-2'
											}`}>
											{[
												'de_mirage',
												'de_ancient',
												'de_dust2',
												'de_anubis',
												'de_nuke',
												'de_inferno',
												'de_train',
											].map((map) => (
												<label key={map} className="dropdown-item">
													<input
														type="checkbox"
														checked={selectedMaps.includes(map)}
														onChange={() => handleMapFilterChange(map)}
													/>
													{map.replace('de_', '').toUpperCase()}
												</label>
											))}
										</div>
									)}
								</th>
								<th>Score</th>
								<th>Kills</th>
								<th>Assists</th>
								<th>Deaths</th>
								<th>K/D</th>
								<th>K/R</th>
								<th>HS %</th>
								<th>ADR</th>
								<th>ELO</th>
							</tr>
						</thead>
						<tbody>
							{filteredMatches.map((match, index) => {
								const count = 100 - index;
								return (
									<tr key={match.date}>
										<td>
											{day == new Date(match.date).toDateString() ? (
												<>
													<i
														style={{
															position: 'absolute',
															left: '0',
															marginLeft: '8%',
															marginTop: '10px',
														}}
														className="fa-solid fa-clock-rotate-left fa-lg td-tour"></i>
												</>
											) : (
												<></>
											)}
											<Link
												href={`/${match.matchId}?from=${match.nickname}`}
												rel="noopener noreferrer">
												{count}
												<i
													style={{ paddingLeft: 5, color: '#20557d' }}
													className="fa-solid fa-link"></i>
											</Link>
										</td>
										<td>
											{new Date(match.date).toLocaleDateString()}
											<p>
												(
												{new Date(match.date).toLocaleTimeString([], {
													hour: '2-digit',
													minute: '2-digit',
												})}
												)
											</p>
										</td>
										<td>
											<Image
												src={getIconMap(match.map)}
												alt={match.map}
												width={70}
												height={35}
											/>
										</td>
										<td>{match.score}</td>
										<td>{match.kills}</td>
										<td>{match.assists}</td>
										<td>{match.deaths}</td>
										<td className={getCellClass(match.kd, 1, 1.1, 0.8)}>
											{match.kd}
										</td>
										<td className={getCellClass(match.kr, 0.75, 0.9, 0.5)}>
											{match.kr}
										</td>
										<td className={getCellClass(match.hs, 62, 72, 40)}>
											{match.hs}
										</td>
										<td className={getCellClass(match.adr, 60, 75, 50)}>
											{match.adr}
										</td>
										<td>
											{index < matches.length - 1 && match.elo !== 0 ? (
												getEloChange(match.elo, matches[index + 1].elo)
											) : !match.team.includes('team_') ? (
												<>
													<i className="fa-solid fa-trophy fa-xl td-tour"></i>
												</>
											) : match.elo !== 0 ? (
												`${match.elo}`
											) : (
												<>
													<i className="fa-regular fa-circle-xmark fa-xl elo-negative"></i>
												</>
											)}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

function getEloChange(currentElo: number, previousElo: number, i?: number) {
	const eloChange: number = currentElo - previousElo;
	const changeText =
		eloChange > 0 ? (
			<>
				<p style={{ opacity: 1 }}>(+{eloChange})</p>
				<div style={{ backgroundColor: 'green' }} className="result-indicator">
					W
				</div>
			</>
		) : (
			<>
				<p style={{ opacity: 1 }}>({eloChange})</p>
				<div style={{ backgroundColor: 'red' }} className="result-indicator">
					L
				</div>
			</>
		);
	const changeClass = eloChange > 0 ? 'elo-positive' : 'elo-negative';

	if (i) {
		if (eloChange > 500) {
			return 0;
		} else {
			return eloChange;
		}
	} else {
		if (eloChange > 500) {
			return (
				<span
					style={{ display: 'inline-flex', gap: '5px' }}
					className="td-tour">
					{currentElo} (—)
					<div
						style={{ backgroundColor: '#eca23a', color: '#fff' }}
						className="result-indicator">
						T
					</div>
				</span>
			);
		}
		return (
			<span
				style={{ display: 'inline-flex', gap: '5px' }}
				className={changeClass}>
				{currentElo}
				{changeText}
			</span>
		);
	}
}

function getCellClass(
	value: number,
	greenThreshold: number,
	yelowThreshold: number,
	redThreshold: number,
) {
	if (value >= greenThreshold && value < yelowThreshold) return 'td-green';
	if (value >= yelowThreshold) return 'td-solid-green';
	if (value <= redThreshold) return 'td-solid-red';
	return value > redThreshold && value < greenThreshold ? 'td-green' : 'td-red';
}

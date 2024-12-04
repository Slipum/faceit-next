import { getIconMap, headers } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ApiMatchData {
	matchId: string;
	date: string;
	i1?: string; // Карта
	i18?: string; // Счет
	i6?: number; // Убийства
	i7?: number; // Ассисты
	i8?: number; // Смерти
	c2?: number; // K/D
	c3?: number; // K/R
	c4?: number; // HS %
	elo?: number; // ELO
}

type MatchData = {
	matchId: string;
	date: string;
	map: string;
	score: string;
	kills: number;
	assists: number;
	deaths: number;
	kd: number;
	kr: number;
	hs: number;
	elo: number;
};

type ListMapsProps = {
	userId: string;
	setListElo: (elo: number[]) => void;
};

export function ListMaps({ userId, setListElo }: ListMapsProps) {
	const [matches, setMatches] = useState<MatchData[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

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
					throw new Error(`Ошибка: ${response.status} - ${response.statusText}`);
				}

				const data = await response.json();
				const formattedMatches = data.map((match: ApiMatchData) => ({
					matchId: match.matchId,
					date: match.date,
					map: match.i1 || 'N/A',
					score: match.i18 || 'N/A',
					kills: match.i6 || 0,
					assists: match.i7 || 0,
					deaths: match.i8 || 0,
					kd: match.c2 || 0,
					kr: match.c3 || 0,
					hs: match.c4 || 0,
					elo: match.elo || 0,
				}));

				setMatches(formattedMatches);

				const eloList = formattedMatches.map((match: ApiMatchData) => match.elo).reverse();
				setListElo(eloList);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Произошла ошибка');
			} finally {
				setIsLoading(false);
			}
		};

		fetchMatches();
	}, [userId, setListElo]);

	if (isLoading) {
		return <p>Загрузка...</p>;
	}

	if (error) {
		return <p>Ошибка: {error}</p>;
	}

	if (!matches.length) {
		return <></>;
	}

	return (
		<>
			<div className="title-matches-container">
				<h3 id="title-All-matches" className="title-all">
					Last matches
				</h3>
				<div id="won-matches"></div>
			</div>
			<div className="matches-container">
				<div id="matches">
					<table>
						<thead>
							<tr>
								<th>Match</th>
								<th>Date</th>
								<th>Map</th>
								<th>Score</th>
								<th>Kills</th>
								<th>Assists</th>
								<th>Deaths</th>
								<th>K/D</th>
								<th>K/R</th>
								<th>HS %</th>
								<th>ELO</th>
							</tr>
						</thead>
						<tbody>
							{matches.map((match, index) => {
								const count = 100 - index;
								return (
									<tr key={match.matchId}>
										<td>
											<Link
												href={`https://www.faceit.com/ru/cs2/room/${match.matchId}/scoreboard`}
												target="_blank"
												rel="noopener noreferrer">
												{count}
												<i
													style={{ paddingLeft: 5 }}
													className="fa-solid fa-up-right-from-square"></i>
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
											<Image src={getIconMap(match.map)} alt={match.map} width={70} height={35} />
										</td>
										<td>{match.score}</td>
										<td>{match.kills}</td>
										<td>{match.assists}</td>
										<td>{match.deaths}</td>
										<td className={getCellClass(match.kd, 1, 1.1, 0.8)}>{match.kd}</td>
										<td className={getCellClass(match.kr, 0.75, 0.9, 0.5)}>{match.kr}</td>
										<td className={getCellClass(match.hs, 62, 72, 40)}>{match.hs}</td>
										<td>
											{index < matches.length - 1
												? getEloChange(match.elo, matches[index + 1].elo)
												: `${match.elo}`}
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

function getEloChange(currentElo: number, previousElo: number) {
	const eloChange = currentElo - previousElo;
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

	return (
		<span style={{ display: 'inline-flex', gap: '5px' }} className={changeClass}>
			{currentElo}
			{changeText}
		</span>
	);
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

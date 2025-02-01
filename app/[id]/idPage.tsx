'use client';

import { getIconMap, headers } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import PlayerAvatar from './PlayerAvatar';

type MatchData = {
	id: string;
	finishedAt: string;
	teams: {
		faction1: {
			name: string;
			avatar: string;
			roster: [
				{
					nickname: string;
					avatar: string;
					elo: number;
				},
			];
		};
		faction2: {
			name: string;
			avatar: string;
			roster: [
				{
					nickname: string;
					avatar: string;
					elo: number;
				},
			];
		};
	};
	voting: {
		location: {
			pick: [string];
		};
		map: {
			pick: [string];
		};
	};
	summaryResults: {
		winner: string;
	};
};

type MatchStats = {
	i18: string; // раунды
	teams: [
		{
			players: [
				{
					nickname: string;
					i6: string; // kills
					i8: string; // deaths
					i7: string; // assists
					c10: string; // adr
					c4: string; // headshots
					c2: string; // kd
					c3: string; // kr
				},
			];
		},
		{
			players: [
				{
					nickname: string;
					i6: string; // kills
					i8: string; // deaths
					i7: string; // assists
					c10: string; // adr
					c4: string; // headshots
					c2: string; // kd
					c3: string; // kr
				},
			];
		},
	];
};

type IdPageProps = {
	params: Promise<{ id: string }>;
	fromPar: Promise<{ from: string }>;
};

export default function IdPage({ params, fromPar }: IdPageProps) {
	const [match, setMatch] = useState<MatchData | null>(null);
	const [matchStats, setMatchStats] = useState<MatchStats | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [back, setBack] = useState<string>('');

	useEffect(() => {
		const fetchMatch = async () => {
			try {
				setIsLoading(true);
				setError(null);
				const response = await fetch(
					`/api/proxy?url=https://www.faceit.com/api/match/v2/match/${
						(
							await params
						).id
					}`,
					{
						method: 'GET',
						headers: headers,
					},
				);

				if (!response.ok) {
					throw new Error(`Error: ${response.status} - ${response.statusText}`);
				}

				const Matchdata = await response.json();

				const stateRes = await fetch(
					`/api/proxy?url=https://www.faceit.com/api/stats/v1/stats/matches/${
						(
							await params
						).id
					}`,
					{
						method: 'GET',
						headers: headers,
					},
				);

				if (!stateRes.ok) {
					throw new Error(`Error: ${stateRes.status} - ${stateRes.statusText}`);
				}

				const statsData = await stateRes.json();
				setMatch(Matchdata.payload);
				setMatchStats(statsData[0]);
			} catch (err) {
				setError(err instanceof Error ? err.message : "There's been an error");
			} finally {
				setIsLoading(false);
			}
		};

		const fetchFrom = async () => {
			try {
				const res = await fromPar;
				setBack(res.from);
			} catch (err) {
				setError(err instanceof Error ? err.message : "There's been an error");
			}
		};

		fetchFrom();
		fetchMatch();
	}, [params, fromPar]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		console.error(error);
	}

	if (!match) {
		return <></>;
	}

	if (!params || !fromPar) {
		return <p>Loading...</p>;
	}

	function getFlag(s: string) {
		if (s == 'netherlands') return 'nl';
		if (s == 'finland') return 'fi';
		if (s == 'germany') return 'de';
		if (s == 'moscow') return 'ru';
		if (s == 'yekaterinburg') return 'ru';
		if (s == 'kazakhstan') return 'kz';
		if (s == 'france') return 'fr';
		if (s == 'uk') return 'uk';
		if (s == 'sweden') return 'se';
	}

	function getLVL(lvl: number) {
		if (lvl <= 500) return '1';
		if (lvl <= 750) return '2';
		if (lvl <= 900) return '3';
		if (lvl <= 1050) return '4';
		if (lvl <= 1200) return '5';
		if (lvl <= 1350) return '6';
		if (lvl <= 1530) return '7';
		if (lvl <= 1750) return '8';
		if (lvl <= 2000) return '9';
		return '10';
	}

	const map = match.voting.map.pick[0].slice(3);
	const rounds = matchStats?.i18.split('/');
	return (
		<div className="layout-match">
			<Link href={`/profile?search=${back}`}>
				<i className="fa-solid fa-reply fa-2xl"></i>
			</Link>
			<div className="data">
				<h3>{new Date(match.finishedAt).toDateString()}</h3>
				<span>{new Date(match.finishedAt).toLocaleTimeString()}</span>
			</div>
			<div className="teams">
				<div className="team-one">
					{rounds && (
						<h1
							style={{
								color: `${
									Number(rounds[0]) > Number(rounds[1]) ? '#66bb6a' : '#ff4d4f'
								}`,
								padding: '5px',
								margin: '5px',
								width: 'fit-content',
							}}>
							{rounds[0]}
						</h1>
					)}
					<div className="right r-container">
						<Image
							src={match.teams.faction1.avatar}
							alt={'team1'}
							width={100}
							height={100}
						/>
						<h1>{match.teams.faction1.name}</h1>
					</div>
					<div className="players">
						{match.teams.faction1.roster.map((player) => (
							<div className="player" key={player.nickname}>
								<Link href={`/profile?search=${player.nickname}`}>
									<PlayerAvatar
										avatar={player.avatar}
										nickname={player.nickname}
									/>
									<div className="pl-cont">
										<div className="player-container">
											<div className="left">
												<span>{player.nickname}</span>
											</div>
											<div className="right">
												<span>{player.elo}</span>
												<Image
													src={`https://cdn-frontend.faceit-cdn.net/web/static/media/assets_images_skill-icons_skill_level_${getLVL(
														player.elo,
													)}_svg.svg`}
													alt={getLVL(player.elo)}
													width={32}
													height={32}
												/>
											</div>
										</div>
										<div className="player-stats">
											{matchStats &&
												matchStats.teams[0].players
													.filter((p) => player.nickname == p.nickname)
													.map((p) => (
														<table key={p.nickname}>
															<thead>
																<tr>
																	<th>Kills</th>
																	<th>K/D</th>
																	<th>K/R</th>
																	<th>ADR</th>
																</tr>
															</thead>
															<tbody>
																<tr>
																	<td>{p.i6}</td>
																	<td>{p.c2}</td>
																	<td>{p.c3}</td>
																	<td>{p.c10}</td>
																</tr>
															</tbody>
														</table>
													))}
										</div>
									</div>
								</Link>
							</div>
						))}
					</div>
				</div>
				<div className="">
					<h2 className="team-win">
						Winner is{' '}
						{match.summaryResults.winner == 'faction1'
							? match.teams.faction1.name
							: match.teams.faction2.name}
					</h2>
					<div className="location-container">
						<Image
							src={`https://distribution.faceit-cdn.net/images/flags/v1/${getFlag(
								match.voting.location.pick[0].toLocaleLowerCase(),
							)}.jpg?width=110&height=55`}
							alt={match.voting.location.pick[0]
								.slice(0, 2)
								.toLocaleLowerCase()}
							width={56}
							height={32}
						/>
						<p>{match.voting.location.pick[0]}</p>
					</div>
					<div className="map-container">
						<Image
							src={getIconMap(match.voting.map.pick[0])}
							alt={match.voting.location.pick[0]
								.slice(0, 2)
								.toLocaleLowerCase()}
							width={56}
							height={32}
						/>
						<p>{map.charAt(0).toUpperCase() + map.slice(1)}</p>
					</div>
				</div>
				<div className="team-two">
					{rounds && (
						<h1
							style={{
								color: `${
									Number(rounds[1]) > Number(rounds[0]) ? '#66bb6a' : '#ff4d4f'
								}`,
								padding: '5px',
								width: 'fit-content',
							}}>
							{rounds[1]}
						</h1>
					)}
					<div className="left l-container">
						<Image
							src={match.teams.faction2.avatar}
							alt={'team2'}
							width={100}
							height={100}
						/>
						<h1>{match.teams.faction2.name}</h1>
					</div>
					<div className="players">
						{match.teams.faction2.roster.map((player) => (
							<div className="player" key={player.nickname}>
								<Link href={`/profile?search=${player.nickname}`}>
									<PlayerAvatar
										avatar={player.avatar}
										nickname={player.nickname}
									/>
									<div className="pl-cont">
										<div className="player-container">
											<div className="left">
												<span>{player.nickname}</span>
											</div>
											<div className="right">
												<span>{player.elo}</span>
												<Image
													src={`https://cdn-frontend.faceit-cdn.net/web/static/media/assets_images_skill-icons_skill_level_${getLVL(
														player.elo,
													)}_svg.svg`}
													alt={getLVL(player.elo)}
													width={32}
													height={32}
												/>
											</div>
										</div>
										<div className="player-stats">
											{matchStats &&
												matchStats.teams[1].players
													.filter((p) => player.nickname == p.nickname)
													.map((p) => (
														<table key={p.nickname}>
															<thead>
																<tr>
																	<th>Kills</th>
																	<th>K/D</th>
																	<th>K/R</th>
																	<th>ADR</th>
																</tr>
															</thead>
															<tbody>
																<tr>
																	<td>{p.i6}</td>
																	<td>{p.c2}</td>
																	<td>{p.c3}</td>
																	<td>{p.c10}</td>
																</tr>
															</tbody>
														</table>
													))}
										</div>
									</div>
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

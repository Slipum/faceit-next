'use client';

import { getIconMap, headers } from '@/constants';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import PlayerAvatar from './PlayerAvatar';

type MatchData = {
	id: string;
	finishedAt: string;
	teams: {
		faction1: {
			name: string;
			roster: [
				{
					nickname: string;
					avatar: string;
				},
			];
		};
		faction2: {
			name: string;
			roster: [
				{
					nickname: string;
					avatar: string;
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

export default function IdPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const [match, setMatch] = useState<MatchData | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

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

				const data = await response.json();

				setMatch(data.payload);
			} catch (err) {
				setError(err instanceof Error ? err.message : "There's been an error");
			} finally {
				setIsLoading(false);
			}
		};

		fetchMatch();
	}, [params]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		console.error(error);
	}

	if (!match) {
		return <></>;
	}

	if (!params) {
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
	}

	const map = match.voting.map.pick[0].slice(3);

	return (
		<div className="layout-match">
			<div className="data">
				<h3>{new Date(match.finishedAt).toDateString()}</h3>
				<span>{new Date(match.finishedAt).toLocaleTimeString()}</span>
			</div>
			<div className="location-container">
				<Image
					src={`https://distribution.faceit-cdn.net/images/flags/v1/${getFlag(
						match.voting.location.pick[0].toLocaleLowerCase(),
					)}.jpg?width=110&height=55`}
					alt={match.voting.location.pick[0].slice(0, 2).toLocaleLowerCase()}
					width={56}
					height={32}
				/>
				<p>{match.voting.location.pick[0]}</p>
			</div>
			<div className="map-container">
				<Image
					src={getIconMap(match.voting.map.pick[0])}
					alt={match.voting.location.pick[0].slice(0, 2).toLocaleLowerCase()}
					width={56}
					height={32}
				/>
				<p>{map.charAt(0).toUpperCase() + map.slice(1)}</p>
			</div>
			<div className="teams">
				<div className="team-one">
					<h1>{match.teams.faction1.name}</h1>
					<div className="players">
						{match.teams.faction1.roster.map((player) => (
							<div className="player" key={player.nickname}>
								<div className="player-container">
									<PlayerAvatar
										avatar={player.avatar}
										nickname={player.nickname}
									/>
									<span>{player.nickname}</span>
								</div>
							</div>
						))}
					</div>
				</div>
				<h2 className="team-win">
					Winner is{' '}
					{match.summaryResults.winner == 'faction1'
						? match.teams.faction1.name
						: match.teams.faction2.name}
				</h2>
				<div className="team-two">
					<h1>{match.teams.faction2.name}</h1>
					<div className="players">
						{match.teams.faction2.roster.map((player) => (
							<div className="player" key={player.nickname}>
								<div className="player-container">
									<PlayerAvatar
										avatar={player.avatar}
										nickname={player.nickname}
									/>
									<span>{player.nickname}</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

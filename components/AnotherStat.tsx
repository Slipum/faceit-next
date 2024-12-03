import Image from 'next/image';

type AnotherStatProps = {
	games: GameData | undefined;
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

export function AnotherStat({ games }: AnotherStatProps) {
	if (!games) {
		return <></>;
	}
	const renderGameInfo = (game: GameData['cs2'] | GameData['csgo'], title: string) => (
		<div className="game-info">
			<h2>{title}</h2>
			<p>Steam Name: {game.game_name}</p>
			<p>Faceit Elo: {game.faceit_elo}</p>
			<p>
				Region:{' '}
				{game.region === 'EU' ? <i className={`fi fi-${game.region.toLowerCase()}`}></i> : null}{' '}
				{game.region}
			</p>
			<p>
				Skill Level:{' '}
				<Image
					src={`https://cdn-frontend.faceit-cdn.net/web/static/media/assets_images_skill-icons_skill_level_${game.skill_level}_svg.svg`}
					alt="Skill level icon"
					width={35.2}
					height={35.2}
				/>
			</p>
		</div>
	);
	return (
		<>
			<h3 id="title-All-games" className="title-all">
				Another statistic
			</h3>
			<div className="games-container">
				<div id="games">
					{renderGameInfo(games.cs2, 'CS2 Statistics')}
					{renderGameInfo(games.csgo, 'CSGO Statistics')}
				</div>
			</div>
		</>
	);
}

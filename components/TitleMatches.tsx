type MatchesProps = {
	maxElo: number;
	wins: number;
	totalMatchesToday: number;
	lastSessionElo: number;
};

export default function TitleMatches({
	maxElo,
	wins,
	totalMatchesToday,
	lastSessionElo,
}: MatchesProps) {
	return (
		<div className="title-matches-container">
			<h3 id="title-All-matches" className="title-all">
				Last matches
			</h3>
			<div id="won-matches">
				<p
					style={{
						fontSize: '1.4rem',
						paddingBottom: '10px',
						color: '#e65b24',
					}}>
					Max Elo: {maxElo}
				</p>
				<p>
					Won matches in the last session: {wins}/{totalMatchesToday}
				</p>
				<div style={{ paddingLeft: '15%', display: 'flex' }}>
					ELO for the last session:{' '}
					<span
						style={{ paddingLeft: '1rem' }}
						className={`${
							lastSessionElo > 0 ? 'elo-positive' : 'elo-negative'
						}`}>
						{lastSessionElo > 0 ? '+' + lastSessionElo : lastSessionElo}
					</span>
				</div>
			</div>
		</div>
	);
}

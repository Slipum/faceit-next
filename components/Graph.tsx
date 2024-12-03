export function Graph() {
	return (
		<>
			<h3 id="title-list-games" className="title-list-game">
				Graph elo
			</h3>
			<div className="list-games">
				<div id="li-game"></div>
				<div className="chart-container">
					<canvas id="eloChart"></canvas>
				</div>
			</div>
		</>
	);
}

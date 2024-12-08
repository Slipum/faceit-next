import { useState } from 'react';

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

type PerformanceProps = {
	stats: StatType[];
};

type Range = {
	red: [number, number];
	yellow: [number, number];
	green: [number, number];
};

export function Performance({ stats }: PerformanceProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<>
			<div id="container" className="container">
				<div
					className="info-icon"
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}>
					<i className="fa-solid fa-info"></i>
				</div>
				{isHovered && (
					<div className="tooltip">
						This block shows the average statistics for the last 10 matches. Under each statistic
						there is a comparison with the average statistic for the last 100 matches.
						<br />
						<br />
						<span style={{ color: 'green' }}>Green</span> is your statistic HIGHER than the average
						for the last 100 matches.
						<br />
						<span style={{ color: 'red' }}>Red</span> is your statistic LOWER than the average for
						the last 100 matches.
					</div>
				)}
				<div className="title">Performance in the last 10 matches</div>
				<div className="grid" id="stats-grid">
					{stats.map(
						(stat) => {
							return (
								<div key={stat.title} className="stat-card">
									<div className="stat-title">{stat.title}</div>
									<div className="stat-value-container">
										<div className="stat-value">
											{stat.title == 'Win rate %' ? stat.value : (stat.value / 10).toFixed(2)}
										</div>
										<div
											className={`stat-change ${
												stat.change < 0 ? 'negative' : stat.change === 0 ? 'neutral' : ''
											}`}>
											{stat.change > 0 && <i className="fa-solid fa-arrow-up fa-bounce"></i>}
											{stat.change < 0 && <i className="fa-solid fa-arrow-down fa-bounce"></i>}
											{stat.change == 0 && (
												<i className="fa-solid fa-slash fa-rotate-270 fa-2xs"></i>
											)}
											{Math.abs(stat.change)}
										</div>
									</div>
									<div className="stat-bar-container">
										<div
											className={`stat-bar ${getColor(
												Number(
													stat.title == 'Win rate %' ? stat.value : (stat.value / 10).toFixed(2),
												),
												stat.ranges,
											)}`}
											style={{
												width: `${getBarWidth(
													Number(
														stat.title == 'Win rate %' ? stat.value : (stat.value / 10).toFixed(2),
													),
													stat.ranges,
												)}%`,
											}}></div>
									</div>
								</div>
							);
						},
						[stats],
					)}
				</div>
			</div>
		</>
	);
}

function getColor(value: number, ranges: Range) {
	if (value >= ranges.red[0] && value <= ranges.red[1]) return 'red';
	if (value >= ranges.yellow[0] && value <= ranges.yellow[1]) return 'yellow';
	if (value >= ranges.green[0] && value <= ranges.green[1]) return 'green';
	return 'gray';
}

function getBarWidth(value: number, ranges: Range) {
	if (value >= ranges.red[0] && value <= ranges.red[1]) {
		return ((value - ranges.red[0]) / (ranges.red[1] - ranges.red[0])) * 33;
	} else if (value >= ranges.yellow[0] && value <= ranges.yellow[1]) {
		return ((value - ranges.yellow[0]) / (ranges.yellow[1] - ranges.yellow[0])) * 33 + 33;
	} else if (value >= ranges.green[0] && value <= ranges.green[1]) {
		return ((value - ranges.green[0]) / (ranges.green[1] - ranges.green[0])) * 34 + 66;
	}
	return 0;
}

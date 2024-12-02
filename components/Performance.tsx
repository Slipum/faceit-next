import { useState } from 'react';

export function Performance() {
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
				<div className="grid" id="stats-grid"></div>
			</div>
		</>
	);
}

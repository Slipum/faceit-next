type StatProps = {
	title: string;
	firstValue: number;
	secondValue: number;
};

export default function StatBlock({
	title,
	firstValue,
	secondValue,
}: StatProps) {
	return (
		<>
			<h3>{title}</h3>
			<div className="sol-comp">
				<div className="">{firstValue}</div>
				<div className="stat-bar-container">
					<div
						className={'bar comp'}
						style={{
							left: `${getBar(firstValue, secondValue)}%`,
						}}></div>
				</div>
				<div className="">{secondValue}</div>
			</div>
		</>
	);
}

function getBar(first: number, second: number) {
	if (first > second) {
		return 50 - (Math.abs(first - second) * 100) / (first + second);
	}
	return 50 + (Math.abs(first - second) * 100) / (first + second);
}

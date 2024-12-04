import { Chart, registerables } from 'chart.js';
import { useEffect, useRef } from 'react';

Chart.register(...registerables);

type GraphProps = {
	listElo: number[];
};

export function Graph({ listElo }: GraphProps) {
	const chartRef = useRef<HTMLCanvasElement | null>(null);
	const eloChartRef = useRef<Chart | null>(null);

	useEffect(() => {
		if (!chartRef.current) return;

		if (eloChartRef.current) {
			eloChartRef.current.destroy();
		}

		const ctx = chartRef.current.getContext('2d');
		if (!ctx) return;

		const minElo = Math.min(...listElo);
		const maxElo = Math.max(...listElo);
		const minYAxis = Math.floor(minElo / 100) * 100;
		const maxYAxis = Math.ceil(maxElo / 100) * 100;

		eloChartRef.current = new Chart(ctx, {
			type: 'line',
			data: {
				labels: listElo.map((_, index) => `${listElo.length - index}`).reverse(),
				datasets: [
					{
						label: 'ELO',
						data: listElo.slice(),
						borderColor: 'red',
						backgroundColor: 'red',
						borderWidth: 2,
						fill: false,
						pointHoverBackgroundColor: 'white',
						pointRadius: 5,
						pointHoverRadius: 10,
						pointHitRadius: 20,
						hoverBorderWidth: 3,
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				hover: {
					mode: 'nearest',
					intersect: false,
				},
				scales: {
					y: {
						beginAtZero: false,
						min: minYAxis,
						max: maxYAxis,
						ticks: {
							stepSize: 200,
						},
					},
					x: {
						beginAtZero: true,
					},
				},
				plugins: {
					legend: {
						display: false,
					},
					tooltip: {
						callbacks: {
							label: function (context) {
								return `Elo: ${context.raw}`;
							},
						},
					},
				},
			},
		});

		return () => {
			if (eloChartRef.current) {
				eloChartRef.current.destroy();
				eloChartRef.current = null;
			}
		};
	}, [listElo]);

	if (listElo) {
		return (
			<>
				<h3 id="title-list-games" className="title-list-game">
					Graph elo
				</h3>
				<div className="list-games">
					<div id="li-game"></div>
					<div
						className="chart-container"
						style={{ position: 'relative', height: '400px', width: '80%' }}>
						<canvas ref={chartRef}></canvas>
					</div>
				</div>
			</>
		);
	} else {
		return <></>;
	}
}

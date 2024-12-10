import { getIconMap, getLogoMap } from '@/constants';

type winRate = {
	de_mirage: 0;
	de_vertigo: 0;
	de_ancient: 0;
	de_dust2: 0;
	de_anubis: 0;
	de_nuke: 0;
	de_inferno: 0;
	de_train: 0;
};

type mapsProps = {
	winrate: winRate;
};

const calculateWinRate = (map: string) => {
	const rate = (winrate[map] / qualityMap[map] || 0).toFixed(3) * 100;
	return {
		value: parseFloat(rate.toFixed(1)),
		color: rate > 50 ? 'rgb(56, 199, 89)' : rate > 35 ? 'rgb(255, 207, 123)' : 'red',
	};
};

export function MapsWin({}: mapsProps) {
	const maps: string[] = [
		'de_mirage',
		'de_vertigo',
		'de_ancient',
		'de_dust2',
		'de_anubis',
		'de_nuke',
		'de_inferno',
		'de_train',
	];

	return (
		<>
			<h3 id="title-maps-winning" className="title-all">
				Map Wins
			</h3>
			<div className="maps-winning-container">
				<div id="maps-winnings">
					{maps.map((mapKey: string) => {
						const winRateData = calculateWinRate(mapKey);
						return (
							<div key={mapKey}>
								<div
									className="icon-map"
									style={{
										backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('${getIconMap(
											mapKey,
										)})`,
									}}>
									<div className="winrate-title" style={{ width: '100%' }}>
										<span style={{ color: `${winRateData.color}` }}>{winRateData.value}</span>
										<span
											style={{
												display: 'inline-block',
												width: '100%',
												fontWeight: '500',
												fontSize: '16px',
											}}>
											Win rate %
										</span>
									</div>
									<div className="logo-map-container">
										<p style={mapKey == 'de_ancient' ? { paddingBottom: '0.394rem' } : {}}>
											{getLogoMap(mapKey)}
										</p>
										<span>{mapKey.replace('de_', '').toUpperCase()}</span>
									</div>
									<div>
										<span style={{ display: 'inline-block', width: '100%' }}>Recent results</span>$
										{arr
											.map((result) => {
												let isWin = result === '1';
												return `
								<div style="background-color: ${isWin ? 'green' : 'red'}" class="result-indicator">
									${isWin ? 'W' : 'L'}
								</div>
							`;
											})
											.join('')}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}

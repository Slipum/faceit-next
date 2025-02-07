import { getIconMap, getLogoMap } from '@/constants';
import Image from 'next/image';

type winRate = {
	[key: string]: number;
};

type rec = {
	[key: string]: string;
};

type mapsProps = {
	winrate: winRate;
	qualityMap: winRate;
	arr: rec;
};

const calculateWinRate = (
	map: string,
	winrate: winRate,
	qualityMap: winRate,
) => {
	const wins = winrate[map] || 0;
	const qual = qualityMap[map] || 1;
	const rate: number = (wins / qual) * 100;
	return {
		value: parseFloat(rate.toFixed(1)),
		color:
			rate > 50 ? 'rgb(56, 199, 89)' : rate > 35 ? 'rgb(255, 207, 123)' : 'red',
	};
};

export function MapsWin({ arr, winrate, qualityMap }: mapsProps) {
	const maps: string[] = [
		'de_mirage',
		// 'de_vertigo', // убрал из прогрузки статы за эту карту
		'de_ancient',
		'de_dust2',
		'de_anubis',
		'de_nuke',
		'de_inferno',
		'de_train',
	];

	return (
		<div className="mapWinnings">
			<h3 id="title-maps-winning" className="title-all">
				Map Wins
			</h3>
			<div className="maps-winning-container">
				<div id="maps-winnings">
					{maps.map((mapKey: string) => {
						const winRateData = calculateWinRate(mapKey, winrate, qualityMap);
						return (
							<div
								key={mapKey}
								className="icon-map"
								style={{
									backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('${getIconMap(
										mapKey,
									)}`,
								}}>
								<div className="winrate-title" style={{ width: '100%' }}>
									<span style={{ color: `${winRateData.color}` }}>
										{winRateData.value}
									</span>
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
									<p
										style={
											mapKey == 'de_ancient'
												? { paddingBottom: '0.394rem' }
												: {}
										}>
										<Image
											className="logo-map"
											src={getLogoMap(mapKey) || ''}
											alt="map"
											width={70}
											height={70}
										/>
									</p>
									<span>{mapKey.replace('de_', '').toUpperCase()}</span>
								</div>
								<div>
									<span style={{ display: 'inline-block', width: '100%' }}>
										Recent results
									</span>
									{arr[mapKey] &&
										arr[mapKey].split('').map((char, index) => (
											<div
												key={`${mapKey}-${index}`}
												style={{
													backgroundColor: char == '1' ? 'green' : 'red',
												}}
												className="result-indicator">
												{char == '1' ? 'W' : 'L'}
											</div>
										))}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

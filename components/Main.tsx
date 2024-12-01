import Image from 'next/image';

export function Main() {
	return (
		<div className="main-container">
			<div id="main-c" className="main-info">
				<div id="user-back" className="user-container">
					<div className="overlay"></div>
					<div id="userInfo" className="user-info">
						<Image
							id="avatar"
							src="https://distribution.faceit-cdn.net/images/ba31ba56-fe75-4f56-8eb6-b8c14d8d9226.jpeg"
							alt="avatar"
							width={300}
							height={300}
						/>
						<div className="avg-container">
							<div id="average-kills">Avg Kills</div>
						</div>
					</div>
				</div>
				<hr />
				<div id="country-list">
					<div className="country-info">
						<i id="country-icon"></i>
						<p id="country"></p>
					</div>
				</div>
			</div>
		</div>
	);
}

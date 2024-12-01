'use client';

import Image from 'next/image';
import Link from 'next/link';

export function Header() {
	const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
		if (evt.key === 'Enter') {
			const target = evt.target as HTMLInputElement;
			console.log(target.value);
		}
	};
	return (
		<header className="header-container">
			<div className="h-logo">
				<Link href="/" style={{ display: 'flex' }}>
					<h1>
						<i className="fa-solid fa-chart-simple"></i> Faceit-Next
					</h1>
					<p style={{ fontSize: '24px', padding: '10px 20px', fontWeight: '700' }}>for</p>
					<Image
						style={{ width: '50px', height: 'auto' }}
						width={50}
						height={50}
						src="https://distribution.faceit-cdn.net/images/37c4c8fa-31a2-4a81-8654-cf133ec29856.svg"
						alt="CS2"
					/>
				</Link>
			</div>
			<div className="search-wrapper">
				<div className="search-container">
					<div className="find-container">
						<i className="fa-solid fa-magnifying-glass"></i>
					</div>
					<input
						type="text"
						id="username"
						placeholder="Enter faceit username"
						autoComplete="off"
						onKeyDown={handleKeyDown}
					/>
					<button id="fetchStats"></button>
					<button id="clearStats">
						<i className="fa-regular fa-circle-xmark"></i>
					</button>
				</div>
			</div>
			<div className="h-auth">
				<Link className="github" href="https://github.com/Slipum/faceit-parser">
					<i className="fa-brands fa-github"></i>
				</Link>
			</div>
		</header>
	);
}

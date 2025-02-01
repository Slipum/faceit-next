'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export function Header() {
	const inputRef = useRef<HTMLInputElement>(null);
	const router = useRouter(); // Используем useRouter для навигации

	// Очистка поля ввода
	const handleClear = () => {
		if (inputRef.current) {
			inputRef.current.value = '';
		}
	};

	// Обработка нажатия Enter
	const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
		if (evt.key === 'Enter' && inputRef.current) {
			const username = inputRef.current.value.trim();
			if (username) {
				router.push(`/profile?search=${username}`);
			}
		}
	};

	return (
		<header className="header-container">
			<div className="h-logo">
				<Link href="/" style={{ display: 'flex' }}>
					<h1>
						<i className="fa-solid fa-chart-simple"></i> Faceit-Next
					</h1>
					<p
						style={{
							fontSize: '24px',
							padding: '10px 20px',
							fontWeight: '700',
						}}>
						for
					</p>
					<Image
						style={{ width: '50px', height: 'auto' }}
						priority
						width={50}
						height={58.4}
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
						ref={inputRef}
						onKeyDown={handleKeyDown}
					/>
					<button id="clearStats" onClick={handleClear}>
						<i className="fa-regular fa-circle-xmark"></i>
					</button>
				</div>
			</div>
			<div className="h-auth">
				<Link
					className="github"
					href="https://github.com/Slipum/faceit-next"
					target="_blank">
					<i className="fa-brands fa-github"></i>
				</Link>
			</div>
		</header>
	);
}

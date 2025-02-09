'use client';

import { Main } from '@/components';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type CompProps = {
	player: string;
	compareWith: string;
	setFirst: React.Dispatch<React.SetStateAction<string>>;
	setSecond: React.Dispatch<React.SetStateAction<string>>;
};

export default function ComparisonStatistic({
	player,
	compareWith,
	setFirst,
	setSecond,
}: CompProps) {
	const [profile, setProfile] = useState<string>(player);
	const [comparedPlayer, setComparedPlayer] = useState<string>(compareWith);
	const [error, setError] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const router = useRouter(); // Используем useRouter для навигации

	const [userId, setUserId] = useState<string>('');

	const [userIdT, setUserIdT] = useState<string>('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				setProfile(player);
				setComparedPlayer(compareWith);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Unknown error');
			}
		};

		fetchData();
	}, [player, compareWith]);

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
				router.push(`/comp?player=${player}&with=${username}`);
			}
		}
	};

	useEffect(() => {
		setFirst(userId);
	}, [userId, setFirst]);

	useEffect(() => {
		setSecond(userIdT);
	}, [userIdT, setSecond]);

	if (error) {
		return <></>;
	}

	return (
		<div style={{ width: '100%', margin: '0 auto' }}>
			<h2
				style={{
					fontSize: '32px',
					fontWeight: 'bold',
					marginBottom: '16px',
					margin: '0 auto',
					padding: '2rem 0',
					width: 'fit-content',
				}}>
				Player Comparison
			</h2>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
					gap: '10px',
					padding: '0 20px',
				}}>
				{comparedPlayer ? (
					<>
						<div>
							<h3
								style={{
									fontWeight: '500',
									width: 'fit-content',
									margin: '0 auto',
								}}>
								Main player: {profile || 'Не выбран'}
							</h3>
							<Main username={profile} setUserId={setUserId} comp={1} />
						</div>
						<div
							style={{
								position: 'relative',
							}}>
							<div className="rt-comp comp-pl" style={{}}>
								<h3
									style={{
										fontWeight: '500',
										width: 'fit-content',
										margin: '0 auto',
									}}>
									Comparison with: {comparedPlayer || 'Не выбран'}
								</h3>
								<Main
									username={comparedPlayer}
									setUserId={setUserIdT}
									comp={1}
								/>
							</div>
						</div>
					</>
				) : (
					<div className="search-wrapper">
						<div className="search-container">
							<div className="find-container">
								<i className="fa-solid fa-magnifying-glass"></i>
							</div>
							<input
								type="text"
								id="username"
								placeholder="Enter second faceit username"
								autoComplete="off"
								ref={inputRef}
								onKeyDown={handleKeyDown}
							/>
							<button id="clearStats" onClick={handleClear}>
								<i className="fa-regular fa-circle-xmark"></i>
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

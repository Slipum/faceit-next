'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Compare from './Compare';
import ComparisonStatistic from './ComparisonStatistic';

export default function CompPage() {
	const searchParams = useSearchParams();
	const player = searchParams?.get('player') || '';
	const compareWith = searchParams?.get('with') || '';

	const [first, setFirst] = useState<string>('');
	const [second, setSecond] = useState<string>('');

	return (
		<>
			<Link href={`/profile?search=${player}`} className="undo-main">
				<i className="fa-solid fa-reply fa-2xl"></i>
			</Link>
			<ComparisonStatistic
				player={player}
				compareWith={compareWith}
				setFirst={setFirst}
				setSecond={setSecond}
			/>
			<Compare first={first} second={second} />
		</>
	);
}

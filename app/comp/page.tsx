'use client';

import Link from 'next/link';
import { useState } from 'react';
import Compare from './Compare';
import ComparisonStatistic from './ComparisonStatistic';

export default function CompPage({
	searchParams,
}: {
	searchParams: { player?: string; with?: string };
}) {
	const [first, setFirst] = useState<string>('');
	const [second, setSecond] = useState<string>('');

	return (
		<>
			<Link
				href={`/profile?search=${searchParams.player}`}
				className="undo-main">
				<i className="fa-solid fa-reply fa-2xl"></i>
			</Link>
			<ComparisonStatistic
				player={searchParams?.player || ''}
				compareWith={searchParams?.with || ''}
				setFirst={setFirst}
				setSecond={setSecond}
			/>
			<Compare first={first} second={second} />
		</>
	);
}

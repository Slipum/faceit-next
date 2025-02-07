import Link from 'next/link';
import ComparisonStatistic from './ComparisonStatistic';

export default function CompPage({
	searchParams,
}: {
	searchParams: { player?: string; with?: string };
}) {
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
			/>
		</>
	);
}

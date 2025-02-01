import IdPage from './idPage';

export default async function MatchLayout({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	return <IdPage params={params} />;
}

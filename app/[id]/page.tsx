import IdPage from './idPage';

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	return {
		title: `${(await params).id}`,
		description: `This is the page for match: ${(await params).id}`,
	};
}

export default async function MatchLayout({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	return <IdPage params={params} />;
}

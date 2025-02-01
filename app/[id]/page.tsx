import IdPage from './idPage';

export async function generateMetadata({
	params,
	searchParams,
}: {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ from?: string }>;
}) {
	return {
		title: `${(await params).id}`,
		description: `This is the page for match: ${(await params).id} (from: ${
			(await searchParams).from || 'unknown'
		})`,
	};
}

export default async function MatchLayout({
	params,
	searchParams,
}: {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ from: string }>;
}) {
	return <IdPage params={params} fromPar={searchParams} />;
}

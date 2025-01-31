import { Metadata } from 'next';
import IdPage from './idPage';

interface IdPageProps {
	params: {
		id: string;
	};
}

export async function generateMetadata({
	params,
}: IdPageProps): Promise<Metadata> {
	return {
		title: `${params.id}`,
		description: `This is the page for match: ${params.id}`,
	};
}

export default function MatchLayout({ params }: IdPageProps) {
	const { id } = params;

	return (
		<>
			<IdPage params={{ id }} />
		</>
	);
}

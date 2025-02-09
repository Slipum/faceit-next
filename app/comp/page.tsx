import { Suspense } from 'react';
import CompPage from './CompPage';

export default function PageWrapper() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<CompPage />
		</Suspense>
	);
}

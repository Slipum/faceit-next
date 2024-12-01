'use client';

import { Header, Main } from '@/components';
import { useState } from 'react';

export default function Home() {
	const [username, setUsername] = useState<string>('');
	return (
		<div>
			<Header setUsername={setUsername} />
			<Main username={username} />
		</div>
	);
}

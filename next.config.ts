import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		domains: [
			'distribution.faceit-cdn.net',
			'cdn-frontend.faceit-cdn.net',
			'assets.faceit-cdn.net',
		],
	},
};

export default nextConfig;

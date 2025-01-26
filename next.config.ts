import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'distribution.faceit-cdn.net',
			},
			{
				protocol: 'https',
				hostname: 'cdn-frontend.faceit-cdn.net',
			},
			{
				protocol: 'https',
				hostname: 'assets.faceit-cdn.net',
			},
			{
				protocol: 'https',
				hostname: 'tiermaker.com',
			},
		],
	},
};

export default nextConfig;

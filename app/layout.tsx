import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Faceit Next',
	description: 'Create by Slipum',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css"
				/>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
				/>
			</head>
			<body>{children}</body>
		</html>
	);
}

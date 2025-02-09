type Props = {
	first: string;
	second: string;
};

export default function Compare({ first, second }: Props) {
	return (
		<>
			<div className="">{first}</div>
			<div className="">{second}</div>
		</>
	);
}

// Разработка

type BtnProps = {
	onToggle: () => void;
	isToggle: boolean;
	isActive: boolean;
};

export default function InfoBtn({ onToggle, isToggle, isActive }: BtnProps) {
	return (
		<button
			style={{
				border: 'none',
				background: 'transparent',
				color: 'white',
			}}
			onClick={onToggle}>
			<i
				className={`fa-solid fa-arrow-${
					isToggle && isActive ? 'down-wide-short' : 'up-short-wide'
				}`}></i>
		</button>
	);
}

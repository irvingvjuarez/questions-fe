type ButtonsContainerProps = {
	children: JSX.Element | JSX.Element[]
}

export const ButtonsContainer: React.FC<ButtonsContainerProps> = ({ children }) => {
	return (
		<div>
			{children}
		</div>
	)
}
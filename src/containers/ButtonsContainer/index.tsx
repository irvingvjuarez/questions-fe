type ButtonsContainerProps = {
	children: JSX.Element | JSX.Element[]
}

export const ButtonsContainer: React.FC<ButtonsContainerProps> = ({ children }) => {
	return (
		<div className="flex flex-col space-y-3 items-center">
			{children}
		</div>
	)
}
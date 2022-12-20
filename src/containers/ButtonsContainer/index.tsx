type ButtonsContainerProps = {
	children: JSX.Element | JSX.Element[]
}

export const ButtonsContainer: React.FC<ButtonsContainerProps> = ({ children }) => {
	const moreThanOneChildren = Array.isArray(children)
	const containerStyles = moreThanOneChildren ? "flex flex-col space-y-3 items-center" : ""

	return (
		<div className={containerStyles}>
			{children}
		</div>
	)
}
type ButtonsContainerProps = {
	children: JSX.Element | JSX.Element[]
}

export const ButtonsContainer: React.FC<ButtonsContainerProps> = ({ children }) => {
	const moreThanOneChildren = Array.isArray(children)
	const containerStyles = moreThanOneChildren
		? "flex flex-col space-y-3 items-center sm:flex-row sm:justify-center sm:items-center sm:space-y-0 sm:space-x-3"
		: ""

	return (
		<div className={`w-[90%] max-w-lg mx-auto ${containerStyles}`}>
			{children}
		</div>
	)
}
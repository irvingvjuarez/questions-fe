type ButtonsContainerProps = {
	children: JSX.Element | JSX.Element[]
}

export const ButtonsContainer: React.FC<ButtonsContainerProps> = ({ children }) => {
	const moreThanOneChildren = Array.isArray(children)
	const containerStyles = moreThanOneChildren
		? "grid grid-cols-1 items-center gap-3 sm:grid-cols-2"
		: ""

		//  "flex flex-col space-y-3 items-center sm:flex-row sm:justify-center sm:items-center sm:space-y-0 sm:space-x-3"

	return (
		<div className={`w-full mx-auto ${containerStyles}`}>
			{children}
		</div>
	)
}
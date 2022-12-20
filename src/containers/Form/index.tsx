type FormProps = {
	children: JSX.Element | JSX.Element[]
}

export const Form: React.FC<FormProps> = ({ children }) => {
	return (
		<form className="w-input">
			{children}
		</form>
	)
}
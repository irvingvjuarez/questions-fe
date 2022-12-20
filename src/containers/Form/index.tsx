type FormProps = {
	children: JSX.Element | JSX.Element[]
}

export const Form: React.FC<FormProps> = ({ children }) => {
	return (
		<form className="w-input mx-auto mb-9 flex flex-col space-y-3">
			{children}
		</form>
	)
}
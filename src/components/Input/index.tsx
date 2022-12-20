type InputProps = {
	children: string;
}

export const Input: React.FC<InputProps> = ({ children }) => {
	const inputID = children.split(" ").join("-")

	return (
		<div>
			<label htmlFor={inputID}>{children}</label>
			<input type="text" id={inputID} />
		</div>
	)
}
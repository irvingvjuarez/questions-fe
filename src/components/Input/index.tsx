type InputProps = {
	children: string;
}

export const Input: React.FC<InputProps> = ({ children }) => {
	const inputID = children.split(" ").join("-")

	return (
		<div className="text-left tracking-wide text-lg flex flex-col space-y-1">
			<label className="text-white" htmlFor={inputID}>
				{children}
			</label>

			<input
				type="text"
				id={inputID}
				className="w-full rounded-md p-1 bg-background border-2 border-white outline-none text-white"
			/>
		</div>
	)
}
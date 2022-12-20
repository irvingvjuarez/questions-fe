type ButtonProps = {
	children: string;
}

export const Button: React.FC<ButtonProps> = ({ children }) => {
	return (
		<button className="text-white font-medium text-lg bg-logo-clear">
			{children}
		</button>
	)
}
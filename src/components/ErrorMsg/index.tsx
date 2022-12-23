type ErrorMsgProps = {
	children: string;
}

export const ErrorMsg: React.FC<ErrorMsgProps> = ({ children }) => {
	return (
		<span className="error-msg">
			{children}
		</span>
	)
}
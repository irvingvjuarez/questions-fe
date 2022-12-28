import { ErrorMsg } from "@app/components/ErrorMsg";

type ErrorMsgListProps = {
	list: string[];
	className?: string;
}

export const ErrorMsgList: React.FC<ErrorMsgListProps> = ({ list, className = "" }) => {
	if (list.length === 0) {
		return null;
	}

	return (
		<div className={`text-start ${className}`}>
			{list.map(msg =>
				<ErrorMsg key={msg}>
					{msg}
				</ErrorMsg>
			)}
		</div>
	)
}
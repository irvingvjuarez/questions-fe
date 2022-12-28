import { ErrorMsg } from "@app/components/ErrorMsg";

type ErrorMsgListProps = {
	list: string[];
}

export const ErrorMsgList: React.FC<ErrorMsgListProps> = ({ list }) => {
	if (list.length === 0) {
		return null;
	}

	return (
		<div className="text-start">
			{list.map(msg =>
				<ErrorMsg key={msg}>
					{msg}
				</ErrorMsg>
			)}
		</div>
	)
}
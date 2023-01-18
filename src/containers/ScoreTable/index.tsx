import { questionsContext } from "@app/contexts/questions.context"
import { Questions } from "@app/types"
import { useContext } from "react"

export const ScoreTable = () => {
	const { score } = useContext(questionsContext) as Questions

	return (
		<table className="w-full text-lg">
			<tbody>
				<tr>
					<th>Postion</th>
					<th>User</th>
					<th>Points</th>
				</tr>

				{score?.map((user, index) => (
					<tr
						key={user.nickname}
						className={`${index % 2 === 0 && "bg-background-dark"}`}
					>
						<td className="py-1">
							#{index + 1}
						</td>
						<td className="highlighted max-w-[50px] overflow-hidden">
							{user.nickname}
						</td>
						<td>{user.score}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
import { questionsContext } from "@app/contexts/questions.context"
import { Questions } from "@app/types"
import { useContext } from "react"

import place1 from "@app/assets/first-place.png"
import place2 from "@app/assets/second-place.png"
import place3 from "@app/assets/third-place.png"

type ScoreTableProps = {
	finalScore?: boolean
}

export const ScoreTable: React.FC<ScoreTableProps> = ({ finalScore }) => {
	const { score } = useContext(questionsContext) as Questions
	const diplayedScore = finalScore ? score?.filter((_item, index) => index <= 2) : score

	const getMedal = (index: number) => {
		switch(index) {
			case 0:
				return place1
			case 1:
				return place2
			default:
				return place3
		}
	}

	return (
		<table className="w-full text-lg">
			<tbody>
				<tr>
					<th>Postion</th>
					<th>User</th>
					<th>Points</th>
				</tr>

				{diplayedScore?.map((user, index) => (
					<tr
						key={user.nickname}
						className={`${index % 2 === 0 && "bg-background-dark"}`}
					>
						<td className="py-1">
							{finalScore ? (
								<img
									className="mx-auto py-2"
									src={getMedal(index)}
									alt="Medal"
									width={35}
								/>
							) : (
								`#${index + 1}`
							)}
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
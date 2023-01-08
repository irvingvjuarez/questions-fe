import { Button } from "@app/components/Button"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { questionsContext } from "@app/contexts/questions.context"
import { useErrorValidation } from "@app/hooks/useErrorValidation"
import { Questions } from "@app/types"
import { useContext, useEffect } from "react"

export const CurrentScore = () => {
	const validation = useErrorValidation()
	const { score } = useContext(questionsContext) as Questions

	console.log({ score })

	useEffect(() => {
		validation()
	}, [])

	return (
		<section className="page-container min-h-[75vh] flex flex-col justify-between">
			<table className="w-full text-lg">
				<tr>
					<th>Postion</th>
					<th>User</th>
					<th>Points</th>
				</tr>

				{score.map((user, index) => (
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
			</table>

			<ButtonsContainer>
				<Button variant="active">
					Next Question
				</Button>
			</ButtonsContainer>
		</section>
	)
}
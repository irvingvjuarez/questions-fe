import { questionsContext } from "@app/contexts/questions.context"
import { Questions } from "@app/types"
import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const CurrentQuestion = () => {
	const navigate = useNavigate()

	const { questions, gameCode } = useContext(questionsContext) as Questions
	const { gameCode: paramGameCode } = useParams()
	const currentQuestion = questions[0]

	useEffect(() => {
		if (gameCode !== Number(paramGameCode)) {
			navigate("/")
		}
	}, [])

	return (
		<section>
			<h2 className="subtitle">
				{currentQuestion.content}
			</h2>

			<article>
				{currentQuestion.answers.map((answer, answerIndex) => (
					<div key={answer.id}>
						{answer.content}
					</div>
				))}
			</article>
		</section>
	)
}
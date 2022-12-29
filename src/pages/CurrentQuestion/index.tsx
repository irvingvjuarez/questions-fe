import { questionsContext } from "@app/contexts/questions.context"
import { Questions } from "@app/types"
import { useContext } from "react"

export const CurrentQuestion = () => {
	const { questions } = useContext(questionsContext) as Questions
	const currentQuestion = questions[0]

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
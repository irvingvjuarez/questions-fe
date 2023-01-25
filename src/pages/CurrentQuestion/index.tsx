import { AnswerOptions } from "@app/containers/AnswerOptions"
import { useCurrentQuestion } from "@app/hooks/useCurrentQuestion"
import { Answer } from "@app/types"

export const CurrentQuestion = () => {
	const { currentQuestion, answerQuestion } = useCurrentQuestion()
	const options = currentQuestion?.answers as Answer[]

	return (
		<section className="page-container">
			<h2 className="subtitle text-start">
				{currentQuestion?.content}
			</h2>

			<article className="mt-3 grid grid-cols-2 gap-3">
				<AnswerOptions
					answers={options}
					answerQuestion={answerQuestion}
				/>
			</article>
		</section>
	)
}
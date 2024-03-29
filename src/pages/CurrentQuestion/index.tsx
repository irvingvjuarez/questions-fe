import { AnswerOptions } from "@app/containers/AnswerOptions"
import { LoaderFallback } from "@app/containers/LoaderFallback"
import { useCurrentQuestion } from "@app/hooks/useCurrentQuestion"
import { Answer } from "@app/types"
import { Helmet } from "react-helmet-async"

export const CurrentQuestion = () => {
	const { currentQuestion, answerQuestion } = useCurrentQuestion()
	const options = currentQuestion?.answers as Answer[]

	return (
		<>
			<Helmet>
				<title>Current Question | Questions</title>
			</Helmet>

			<LoaderFallback>
				<h2 className="subtitle text-start">
					{currentQuestion?.content}
				</h2>

				<article className="mt-3 grid grid-cols-2 gap-3">
					<AnswerOptions
						answers={options}
						answerQuestion={answerQuestion}
					/>
				</article>
			</LoaderFallback>
		</>
	)
}
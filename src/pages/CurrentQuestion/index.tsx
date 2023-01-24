import { useCurrentQuestion } from "@app/hooks/useCurrentQuestion"
import { getOptionImg } from "@app/services/getOptionImg"

export const CurrentQuestion = () => {
	const { currentQuestion, answerQuestion, user } = useCurrentQuestion()

	return (
		<section className="page-container">
			<h2 className="subtitle text-start">
				{currentQuestion?.content}
			</h2>

			<article className="mt-3 grid grid-cols-2 gap-3">
				{currentQuestion?.answers.map((answer, answerIndex) => (
					<button
						key={answer.id}
						className={`option-${answerIndex} rounded-lg text-start p-2 font-semibold text-lg ${user.isUser && "flex items-center justify-center cursor-pointer"}`}
						onClick={answerQuestion(answer.id, answerIndex, getOptionImg(answerIndex))}
					>
						<img
							src={getOptionImg(answerIndex)}
							alt="option identifier"
							width={user.isUser ? 90 : 50}
							className={`mb-3 ${user.isUser && "mt-3"}`}
						/>

						{!user.isUser && (
							<p>{answer.content}</p>
						)}
					</button>
				))}
			</article>
		</section>
	)
}
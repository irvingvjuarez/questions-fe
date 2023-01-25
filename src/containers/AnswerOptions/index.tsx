import { questionsContext } from "@app/contexts/questions.context"
import { getOptionImg } from "@app/services/getOptionImg"
import { Questions } from "@app/types"
import { Fragment, useContext } from "react"

export const AnswerOptions: React.FC<AnswerOptionsProps> = ({ answers, answerQuestion }) => {
	const { user: { isUser } } = useContext(questionsContext) as Questions

	return (
		<Fragment>
			{answers?.map((answer, answerIndex) => (
				<button
					key={answer.id}
					className={`option-${answerIndex} rounded-lg text-start p-2 font-semibold text-lg ${isUser && "flex items-center justify-center cursor-pointer"}`}
					onClick={answerQuestion(answer.id, answerIndex, getOptionImg(answerIndex))}
				>
					<img
						src={getOptionImg(answerIndex)}
						alt="option identifier"
						width={isUser ? 90 : 50}
						className={`mb-3 ${isUser && "mt-3"}`}
					/>

					{!isUser && <p>{answer.content}</p>}
				</button>
			))}
		</Fragment>
	)
}
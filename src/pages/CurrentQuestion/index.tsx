import { questionsContext } from "@app/contexts/questions.context"
import { Questions } from "@app/types"
import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import option0 from "@app/assets/option-0.png"
import option1 from "@app/assets/option-1.png"
import option2 from "@app/assets/option-2.png"
import option3 from "@app/assets/option-3.png"

export const CurrentQuestion = () => {
	const navigate = useNavigate()

	const { questions, gameCode } = useContext(questionsContext) as Questions
	const { gameCode: paramGameCode } = useParams()
	const currentQuestion = questions[0]

	const getOptionImg = (numberId: number) => {
		switch (numberId) {
			case 0: return option0
			case 1: return option1
			case 2: return option2
			case 3: return option3
		}
	}

	useEffect(() => {
		if (gameCode !== Number(paramGameCode)) {
			navigate("/")
		}
	}, [])

	return (
		<section className="page-container">
			<h2 className="subtitle text-start">
				{currentQuestion.content}
			</h2>

			<article className="mt-3 grid grid-cols-2 gap-3">
				{currentQuestion.answers.map((answer, answerIndex) => (
					<div
						key={answer.id}
						className={`option-${answerIndex} rounded-lg text-start p-2 font-semibold text-lg`}
					>
						<img
							src={getOptionImg(answerIndex)}
							alt="option identifier"
							width={50}
							className="mb-3"
						/>
						<p>
							{answer.content} option
						</p>
					</div>
				))}
			</article>
		</section>
	)
}
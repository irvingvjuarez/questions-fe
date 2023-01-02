import { questionsContext } from "@app/contexts/questions.context"
import { Question, Questions } from "@app/types"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import option0 from "@app/assets/option-0.png"
import option1 from "@app/assets/option-1.png"
import option2 from "@app/assets/option-2.png"
import option3 from "@app/assets/option-3.png"
import { API_ROOT } from "@app/globals"

export const CurrentQuestion = () => {
	const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
	const navigate = useNavigate()

	const { questions, gameCode } = useContext(questionsContext) as Questions
	const { gameCode: paramGameCode } = useParams()

	const getOptionImg = (numberId: number) => {
		switch (numberId) {
			case 0: return option0
			case 1: return option1
			case 2: return option2
			case 3: return option3
		}
	}

	useEffect(() => {
		const api = `${API_ROOT}/game/${gameCode}/current/question/full/status`

		if (gameCode !== Number(paramGameCode)) {
			navigate("/")
		}

		fetch(api)
			.then(res => {
				if (res.ok) {
					return res.json()
				}
				throw new Error()
			})
			.then(data => {
				if (data.isGameOver) {
					navigate("/game/over")
				}

				setCurrentQuestion(data.status.currentQuestion)
			})
			.catch(() => {
				navigate("/")
			})
	}, [])

	return (
		<section className="page-container">
			<h2 className="subtitle text-start">
				{currentQuestion?.content}
			</h2>

			<article className="mt-3 grid grid-cols-2 gap-3">
				{currentQuestion?.answers.map((answer, answerIndex) => (
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
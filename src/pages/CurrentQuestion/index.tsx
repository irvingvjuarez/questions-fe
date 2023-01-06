import { questionsContext } from "@app/contexts/questions.context"
import { Action, Question, Questions } from "@app/types"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import option0 from "@app/assets/option-0.png"
import option1 from "@app/assets/option-1.png"
import option2 from "@app/assets/option-2.png"
import option3 from "@app/assets/option-3.png"
import { API_ROOT, Q_TYPES } from "@app/globals"

export const CurrentQuestion = () => {
	// const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
	const navigate = useNavigate()
	let fetchStatusInterval: number

	const { gameCode, questionsDispatch, user, questions } = useContext(questionsContext) as Questions
	const { gameCode: paramGameCode, questionID } = useParams()
	const dispatch = questionsDispatch as React.Dispatch<Action>

	const currentQuestion = questions.find(question => question.id == questionID)

	console.log({ currentQuestion })

	const getOptionImg = (numberId: number) => {
		switch (numberId) {
			case 0: return option0
			case 1: return option1
			case 2: return option2
			case 3: return option3
		}
	}

	const fetchStatus = () => {
		const api = `${API_ROOT}/game/${gameCode}/current/question/full/status`

		fetch(api)
			.then(res => {
				if (res.ok) {
					return res.json()
				}
				throw new Error()
			})
			.then(data => {
				// console.log({ data })

				if (data.status.counterActive === false) {
					dispatch({
						type: Q_TYPES.setScore,
						payload: data.sortedScore
					});

					navigate(`/game/${gameCode}/score/current`)
				} else if (data.isGameOver) {
					navigate("/game/over")
				}

				if (currentQuestion === null) {
					setCurrentQuestion(data.status.currentQuestion)
				}
			})
			.catch(() => {
				navigate("/")
			})
	}

	useEffect(() => {
		if (gameCode !== Number(paramGameCode)) {
			navigate("/")
		}

		// fetchStatusInterval = setInterval(fetchStatus, 1000)
	}, [])

	return (
		<section className="page-container">
			<h2>I am the current question page</h2>
			{/* <h2 className="subtitle text-start">
				{currentQuestion?.content}
			</h2>

			<article className="mt-3 grid grid-cols-2 gap-3">
				{currentQuestion?.answers.map((answer, answerIndex) => (
					<div
						key={answer.id}
						className={`option-${answerIndex} rounded-lg text-start p-2 font-semibold text-lg ${user.isUser && "flex items-center justify-center"}`}
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
					</div>
				))}
			</article> */}
		</section>
	)
}
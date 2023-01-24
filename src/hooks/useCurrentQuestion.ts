import { questionsContext } from "@app/contexts/questions.context"
import { API_ROOT, Q_TYPES } from "@app/globals"
import { getPostConfig } from "@app/services/getPostConfig"
import { SetFetch, setFetch } from "@app/services/setFetch"
import { Question, Questions, User } from "@app/types"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useErrorValidation } from "./useErrorValidation"

type UseCurrentQuestion = {
	currentQuestion: Question | null,
	answerQuestion(answerId: string, optionIndex: number, optionImg: string | undefined): undefined,
	user: Questions["user"]
}

export const useCurrentQuestion = (): UseCurrentQuestion => {
	const validation = useErrorValidation()
	const navigate = useNavigate()

	const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
	let fetchStatusInterval: number

	const { gameCode, questionsDispatch, user } = useContext(questionsContext) as Questions

	const fetchStatus = () => {
		const api = `${API_ROOT}/game/${gameCode}/current/question/full/status`

		fetch(api)
			.then(res => {
				if (res.ok) return res.json()
				throw new Error()
			})
			.then(data => {
				if (data.status.counterActive === false) {
					questionsDispatch({
						type: Q_TYPES.setScore,
						payload: data.sortedScore
					});

					clearInterval(fetchStatusInterval)
					const navigationEndpoint = user.isUser
						? `/game/${gameCode}/user/${user.nickname}/current/score`
						: `/game/${gameCode}/current/score`;

					if (user.isUser) {
						questionsDispatch({
							type: Q_TYPES.userDidntAnswer
						})
					}

					navigate(navigationEndpoint)
				} else if (data.isGameOver) {
					navigate(`/game/${gameCode}/over`)
				}

				if (currentQuestion === null) {
					setCurrentQuestion(data.status.currentQuestion)
				}
			})
			.catch(() => {
				navigate("/")
			})
	}

	const answerQuestion = (answerId: string, optionIndex: number, optionImg: string | undefined) => async () => {
		if (!user.isUser) return

		const config = getPostConfig({ answer: { answerId } })
		try {
			setFetch({
				endpoint: `${API_ROOT}/user/${user.nickname}/answer/${gameCode}`,
				config,
				callback: (data) => {
					questionsDispatch({
						type: Q_TYPES.userAnswers,
						payload: {
							...data.answeredQuestion,
							optionIndex,
							optionImg
						}
					})

					navigate(`/game/${gameCode}/user/${user.nickname}/current/score`)
				}
			})
		}catch(err) {
			navigate("/")
		}

		return undefined
	}

	useEffect(() => {
		validation()
		fetchStatusInterval = setInterval(fetchStatus, 1000)

		return () => clearInterval(fetchStatusInterval)
	}, [])

	return {
		currentQuestion,
		answerQuestion,
		user
	}
}
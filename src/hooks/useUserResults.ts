import { questionsContext } from "@app/contexts/questions.context"
import { API_ROOT, Q_TYPES } from "@app/globals"
import { Questions } from "@app/types"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useErrorValidation } from "./useErrorValidation"
import { useFetch } from "./useFetch"

export const useUserResults = () => {
	const setFetch = useFetch()
	const validation = useErrorValidation()
	const navigate = useNavigate()
	let gameRestartedInterval: NodeJS.Timer

	const { answeredQuestion, user: {nickname}, questionsDispatch, gameCode } = useContext(questionsContext) as Questions

	const isUserRight = answeredQuestion?.isUserCorrect

	const userData = answeredQuestion?.answeredBy.find(user => user.userNickname == nickname)

	const isGameRestarted = () => {
		try {
			setFetch({
				endpoint: API_ROOT + `/game/${gameCode}/current/question/full/status`,
				callback: (data) => {
					let navigateEndpoint

					if (data.isGameOver) navigateEndpoint = `/game/${gameCode}/over`
					if (data.status.counterActive) navigateEndpoint = `/game/${gameCode}/current/question`

					if (navigateEndpoint) {
						questionsDispatch({
							type: Q_TYPES.clearAnsweredQuestion,
							payload: { score: data.sortedScore }
						})

						clearInterval(gameRestartedInterval)
						navigate(navigateEndpoint)
					}
				}
			})
		} catch(err) {
			navigate("/")
		}
	}

	useEffect(() => {
		validation()
		gameRestartedInterval = setInterval(isGameRestarted, 1000)

		return () => clearInterval(gameRestartedInterval)
	}, [])

	return { isUserRight, userData }
}
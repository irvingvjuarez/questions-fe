import { questionsContext } from "@app/contexts/questions.context"
import { API_ROOT } from "@app/globals"
import { Questions } from "@app/types"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useErrorValidation } from "./useErrorValidation"
import { useFetch } from "./useFetch"

export const useUserScore = () => {
	let questionResolvedInterval: NodeJS.Timer

	const setFetch = useFetch()
	const navigate = useNavigate()
	const validation = useErrorValidation()
	const { answeredQuestion, gameCode } = useContext(questionsContext) as Questions

	const showResults = () => {
		try {
			setFetch({
				endpoint: API_ROOT + `/game/${gameCode}/current/question/resolved`,
				callback: (data) => {
					let navigateTo: string = ""

					if (data.isGameOver) {
						navigateTo = `/game/${gameCode}/over`
					} else if (data.isQuestionResolved) {
						navigateTo = `/game/${gameCode}/user/current/results`
					}

					if (Boolean(navigateTo)) navigate(navigateTo)
				}
			})
		} catch(err) {
			navigate("/")
		}
	}

	useEffect(() => {
		validation()
		questionResolvedInterval = setInterval(showResults, 1000)

		return () => clearInterval(questionResolvedInterval)
	}, [])

	return { answeredQuestion }
}
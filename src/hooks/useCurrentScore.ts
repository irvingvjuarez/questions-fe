import { questionsContext } from "@app/contexts/questions.context"
import { API_ROOT } from "@app/globals"
import { getPostConfig } from "@app/services/getPostConfig"
import { setFetch } from "@app/services/setFetch"
import { Questions } from "@app/types"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useErrorValidation } from "./useErrorValidation"

export const useCurrentScore = () => {
	const validation = useErrorValidation()
	const navigate = useNavigate()

	const { gameCode } = useContext(questionsContext) as Questions

	const restartGame = () => {
		const config = getPostConfig()

		try {
			setFetch({
				endpoint: API_ROOT + `/game/${gameCode}/next/question/start`,
				config,
				callback: (data) => {
					const pageEndpoint = data.isGameOver
						? `/game/${gameCode}/over`
						: `/game/${gameCode}/current/question`

					navigate(pageEndpoint)
				}
			})
		} catch(err) {
			navigate("/")
		}
	}

	useEffect(() => {
		validation()
	}, [])

	return restartGame
}
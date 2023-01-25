import { Button } from "@app/components/Button"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { ScoreTable } from "@app/containers/ScoreTable"
import { questionsContext } from "@app/contexts/questions.context"
import { API_ROOT } from "@app/globals"
import { useErrorValidation } from "@app/hooks/useErrorValidation"
import { getPostConfig } from "@app/services/getPostConfig"
import { setFetch } from "@app/services/setFetch"
import { Questions } from "@app/types"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const CurrentScore = () => {
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

	return (
		<section className="page-container min-h-[75vh] flex flex-col justify-between">
			<ScoreTable />

			<ButtonsContainer>
				<Button variant="active" handleClick={restartGame}>
					Next Question
				</Button>
			</ButtonsContainer>
		</section>
	)
}
import { Button } from "@app/components/Button"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { ScoreTable } from "@app/containers/ScoreTable"
import { questionsContext } from "@app/contexts/questions.context"
import { API_ROOT, Q_TYPES } from "@app/globals"
import { useErrorValidation } from "@app/hooks/useErrorValidation"
import { Action, Questions } from "@app/types"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const CurrentScore = () => {
	const validation = useErrorValidation()
	const navigate = useNavigate()
	const { score, gameCode, questionsDispatch } = useContext(questionsContext) as Questions
	const dispatch = questionsDispatch as React.Dispatch<Action>

	const restartGame = () => {
		const fetchConfig = {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST"
		}

		fetch(API_ROOT + `/game/${gameCode}/next/question/start`, fetchConfig)
			.then(res => {
				if(!res.ok) throw new Error()
				return res.json()
			})
			.then(data => {
				if (data.isGameOver) {
					navigate(`/game/${gameCode}/over`)
				} else {
					navigate(`/game/${gameCode}/current/question`)
				}
			})
			.catch(() => navigate("/"))
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
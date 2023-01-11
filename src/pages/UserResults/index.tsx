import { questionsContext } from "@app/contexts/questions.context"
import { Action, Questions } from "@app/types"
import { useContext, useEffect } from "react"

import right from "@app/assets/right.png"
import wrong from "@app/assets/wrong.png"
import { useErrorValidation } from "@app/hooks/useErrorValidation"
import { API_ROOT, Q_TYPES } from "@app/globals"
import { useNavigate } from "react-router-dom"

export const UserResults = () => {
	const validation = useErrorValidation()
	const navigate = useNavigate()
	let gameRestartedInterval: number

	const { answeredQuestion, user: {nickname}, questionsDispatch, gameCode } = useContext(questionsContext) as Questions
	const dispatch = questionsDispatch as React.Dispatch<Action>

	const isUserRight = answeredQuestion?.isUserCorrect
	const userData = answeredQuestion?.answeredBy.find(user => user.userNickname == nickname)

	const isGameRestarted = () => {
		fetch(API_ROOT + `/user/${gameCode}/current/question/status`)
			.then(res => {
				if (!res.ok) throw new Error()
				return res.json()
			})
			.then(data => {
				let navigateEndpoint

				if (data.isGameOver) navigateEndpoint = "/game/over"
				if (data.status.counterActive) navigateEndpoint = `/game/${gameCode}/current/question`

				if (navigateEndpoint) {
					dispatch({ type: Q_TYPES.clearAnsweredQuestion })
					clearInterval(gameRestartedInterval)
					navigate(navigateEndpoint)
				}
			})
			.catch(() => navigate("/"))
	}

	useEffect(() => {
		validation()
		gameRestartedInterval = setInterval(isGameRestarted, 1000)

		return () => clearInterval(gameRestartedInterval)
	}, [])

	return(
		<section className="page-container h-[70vh] flex flex-col justify-between">
			<h2 className="subtitle font-bold text-xl tracking-wider">
				You got it {isUserRight ? "right" : "wrong"}
			</h2>

			<div className="w-full grid place-content-center">
				<img
					className="block w-[150px]"
					src={isUserRight ? right : wrong}
					alt=""
				/>
			</div>

			<p>
				Current points:
				<span className="highlighted">
					{userData?.userScore}
				</span>
			</p>
		</section>
	)
}
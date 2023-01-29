import { questionsContext } from "@app/contexts/questions.context"
import { Action, Questions } from "@app/types"
import { useContext, useEffect } from "react"

import right from "@app/assets/right.png"
import wrong from "@app/assets/wrong.png"
import { useErrorValidation } from "@app/hooks/useErrorValidation"
import { API_ROOT, Q_TYPES } from "@app/globals"
import { useNavigate } from "react-router-dom"
import { useFetch } from "@app/hooks/useFetch"

export const UserResults = () => {
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

	return(
		<section className="page-container h-[70vh] flex flex-col justify-between">
			<h2 className="subtitle font-bold text-xl tracking-wider">
				You got it {isUserRight ? "right" : "wrong"}
			</h2>

			<div className="w-full grid place-content-center">
				<img
					className="block w-[150px]"
					src={isUserRight ? right : wrong}
					alt="User Result"
				/>
			</div>

			<p>
				Current points:
				<span className="highlighted">
					{userData?.userScore || 0}
				</span>
			</p>
		</section>
	)
}
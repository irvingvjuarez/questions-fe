import { questionsContext } from "@app/contexts/questions.context"
import { Action, Questions } from "@app/types"
import { useContext, useEffect } from "react"

import right from "@app/assets/right.png"
import wrong from "@app/assets/wrong.png"
import { useErrorValidation } from "@app/hooks/useErrorValidation"
import { Q_TYPES } from "@app/globals"

export const UserResults = () => {
	const validation = useErrorValidation()
	const { answeredQuestion, user: {nickname}, questionsDispatch } = useContext(questionsContext) as Questions
	const dispatch = questionsDispatch as React.Dispatch<Action>

	const isUserRight = answeredQuestion?.isUserCorrect
	const userData = answeredQuestion?.answeredBy.find(user => user.userNickname == nickname)

	useEffect(() => {
		validation()
		dispatch({ type: Q_TYPES.clearAnsweredQuestion })
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
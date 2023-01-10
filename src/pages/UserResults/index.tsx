import { questionsContext } from "@app/contexts/questions.context"
import { Questions } from "@app/types"
import { useContext, useEffect } from "react"

import right from "@app/assets/right.png"
import wrong from "@app/assets/wrong.png"
import { useErrorValidation } from "@app/hooks/useErrorValidation"

export const UserResults = () => {
	const validation = useErrorValidation()
	const { answeredQuestion, user: {nickname} } = useContext(questionsContext) as Questions
	const isUserRight = answeredQuestion?.isUserCorrect
	const userData = answeredQuestion?.answeredBy.find(user => user.userNickname == nickname)

	// console.log({ answeredQuestion })

	useEffect(() => {
		validation()
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
import { questionsContext } from "@app/contexts/questions.context"
import { API_ROOT } from "@app/globals"
import { useErrorValidation } from "@app/hooks/useErrorValidation"
import { Questions } from "@app/types"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const UserScore = () => {
	let questionResolvedInterval: number

	const navigate = useNavigate()
	const validation = useErrorValidation()
	const { answeredQuestion, gameCode } = useContext(questionsContext) as Questions

	const showResults = () => {
		fetch(API_ROOT + `/game/${gameCode}/current/question/resolved`)
			.then(res => res.json())
			.then(data => {
				if (data.isGameOver) {
					navigate("/game/over")
				}else if (data.isQuestionResolved) {
					navigate(`/game/user/current/results`)
				}
			})
	}

	useEffect(() => {
		validation()
		questionResolvedInterval = setInterval(showResults, 1000)

		return () => clearInterval(questionResolvedInterval)
	}, [])

	return (
		<section className="page-container flex flex-col h-[70vh] justify-between">
			<h2 className="subtitle">
				You Chose
			</h2>

			<div className={`w-[90%] max-w-[200px] mx-auto grid place-content-center rounded-lg py-4 option-${answeredQuestion?.optionIndex}`}>
				<img className="w-[115px]" src={answeredQuestion?.optionImg} alt="" />
			</div>

			<span className="subtitle">
				Waiting the other game members to answer...
			</span>
		</section>
	)
}
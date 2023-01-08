import { questionsContext } from "@app/contexts/questions.context"
import { useErrorValidation } from "@app/hooks/useErrorValidation"
import { Questions } from "@app/types"
import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const UserScore = () => {
	const validation = useErrorValidation()
	const navigate = useNavigate()
	const { answeredQuestion, gameCode } = useContext(questionsContext) as Questions
	const { gameCode: paramGameCode } = useParams()

	useEffect(() => {
		validation()
		// if (gameCode !== Number(paramGameCode)) {
		// 	navigate("/")
		// }
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
import { questionsContext } from "@app/contexts/questions.context"
import { useErrorValidation } from "@app/hooks/useErrorValidation"
import { Questions } from "@app/types"
import { useContext, useEffect } from "react"

export const UserScore = () => {
	const validation = useErrorValidation()
	const { answeredQuestion } = useContext(questionsContext) as Questions

	useEffect(() => {
		validation()
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
import { questionsContext } from "@app/contexts/questions.context"
import { Questions } from "@app/types"
import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const CurrentScore = () => {
	const navigate = useNavigate()

	const { answeredQuestion, gameCode } = useContext(questionsContext) as Questions
	const { gameCode: paramGameCode } = useParams()
	// console.log({ answeredQuestion })

	return (
		<section className="page-container">
			<h2>Hi</h2>
		</section>
	)
}
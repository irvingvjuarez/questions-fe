import { questionsContext } from "@app/contexts/questions.context"
import { Questions } from "@app/types"
import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const Options = () => {
	const navigate = useNavigate()

	const {questionId} = useParams()
	const {questions} = useContext(questionsContext) as Questions
	const currentQuestion = questions.find(question => question.id == questionId)

	useEffect(() => {
		if (!currentQuestion) {
			// TODO: send to a 404 page
			navigate("/")
		}
	}, [])

	return (
		<section>
			<h2>Choose the correct option for the question:</h2>

			<span>{`[Question]`}</span>
		</section>
	)
}
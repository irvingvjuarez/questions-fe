import { questionsContext } from "@app/contexts/questions.context"
import { Questions } from "@app/types"
import { useContext } from "react"

export const UserResults = () => {
	const { answeredQuestion } = useContext(questionsContext) as Questions

	return(
		<section className="page-container">
			<h2>Is user correct: {answeredQuestion?.isUserCorrect ? "YES" : "NO"}</h2>
		</section>
	)
}
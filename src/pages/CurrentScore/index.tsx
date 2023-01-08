import { questionsContext } from "@app/contexts/questions.context"
import { Questions } from "@app/types"
import { useContext } from "react"

export const CurrentScore = () => {
	const { answeredQuestion } = useContext(questionsContext) as Questions
	console.log({ answeredQuestion })

	return (
		<h2>I am the current score page</h2>
	)
}
import { questionsContext } from "@app/contexts/questions.context"
import { Questions } from "@app/types"
import { useContext } from "react"

export const UserScore = () => {
	const { answeredQuestion } = useContext(questionsContext) as Questions

	console.log({ answeredQuestion })

	return (
		<section className="page-container">
			<h2>I am the User Score page</h2>
		</section>
	)
}
import { questionsContext } from "@app/contexts/questions.context"
import { Questions } from "@app/types"
import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const CurrentScore = () => {
	const navigate = useNavigate()

	const { answeredQuestion, gameCode } = useContext(questionsContext) as Questions
	const { gameCode: paramGameCode } = useParams()
	// console.log({ answeredQuestion })

	useEffect(() => {
		if (gameCode !== Number(paramGameCode)) {
			navigate("/")
		}
	}, [])

	return (
		<h2>I am the current score page</h2>
	)
}
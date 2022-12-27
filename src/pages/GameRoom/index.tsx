import { questionsContext } from "@app/contexts/questions.context"
import { Questions } from "@app/types"
import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const GameRoom = () => {
	const navigate = useNavigate()

	const { gameCode: gameCodeParam } = useParams()
	const { gameCode: createdGameCode } = useContext(questionsContext) as Questions;

	useEffect(() => {
		if(Number(gameCodeParam) !== createdGameCode) {
			navigate("/")
		}
	}, [])

	return (
		<section>
			<h2>I am the GameRoom page</h2>
		</section>
	)
}
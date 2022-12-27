import { questionsContext } from "@app/contexts/questions.context"
import { Q_TYPES } from "@app/globals"
import { Action, Questions } from "@app/types"
import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const GameRoom = () => {
	const navigate = useNavigate()
	const { gameCode: contextGameCode } = useContext(questionsContext) as Questions
	const { gameCode: paramGameCode } = useParams()

	useEffect(() => {
		if (Number(paramGameCode) !== contextGameCode) {
			navigate("/")
		}
	}, [])

	return (
		<section>
			<h2 className="subtitle">
				Share the following code:
			</h2>

			<span className="highlighted">
				{paramGameCode}
			</span>
		</section>
	)
}
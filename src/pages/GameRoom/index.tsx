import { questionsContext } from "@app/contexts/questions.context"
import { Q_TYPES } from "@app/globals"
import { Action, Questions } from "@app/types"
import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const GameRoom = () => {
	const navigate = useNavigate()
	const questionsValue = useContext(questionsContext) as Questions

	useEffect(() => {
		console.log({ questionsValue })
	}, [])

	return (
		<section>
			<h2>I am the GameRoom page</h2>
		</section>
	)
}
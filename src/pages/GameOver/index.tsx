import { questionsContext } from "@app/contexts/questions.context"
import { useErrorValidation } from "@app/hooks/useErrorValidation"
import { Questions } from "@app/types"
import { useContext, useEffect } from "react"
import { GameOverAdmin } from "./Admin"
import { GameOverUser } from "./User"

export const GameOver = () => {
	const validation = useErrorValidation()
	const { user } = useContext(questionsContext) as Questions

	useEffect(() => validation(), [])

	return (
		<section className="page-container h-[70vh] flex flex-col justify-between">
			{user.isUser ?
				<GameOverUser />
				:
				<GameOverAdmin />
			}
		</section>
	)
}
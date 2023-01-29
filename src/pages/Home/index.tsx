import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { Button } from "@app/components/Button"
import { useContext, useEffect } from "react"
import { questionsContext } from "@app/contexts/questions.context"
import { Questions } from "@app/types"
import { Q_TYPES } from "@app/globals"

export const Home = () => {
	const { questionsDispatch } = useContext(questionsContext) as Questions;
	useEffect(() => questionsDispatch({ type: Q_TYPES.clearQuestions }), [])

	return (
		<main className="h-[76vh] flex flex-col justify-between">
			<h3 className="subtitle">
				Create questionnaries easily, quickly and for free.
			</h3>

			<ButtonsContainer>
				<Button linkUrl="/game/new" variant="standard">
					Create New Game Room
				</Button>

				<Button linkUrl="/game/code" variant="standard">
					Enter Game Code
				</Button>
			</ButtonsContainer>
		</main>
	)
}
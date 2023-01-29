import { useGameOver } from "@app/hooks/useGameOver"
import { GameOverAdmin } from "./Admin"
import { GameOverUser } from "./User"

export const GameOver = () => {
	const { user } = useGameOver()

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
import { useGameOver } from "@app/hooks/useGameOver"
import { GameOverAdmin } from "./Admin"
import { GameOverUser } from "./User"

export const GameOver = () => {
	const { user } = useGameOver()

	return (
		<section className="page-container h-[70vh] flex flex-col justify-between">
			{!user.isUser && (
				<h2 className="subtitle">
					Final Positions: First 3 positions.
				</h2>
			)}

			{user.isUser ?
				<GameOverUser />
				:
				<GameOverAdmin />
			}
		</section>
	)
}
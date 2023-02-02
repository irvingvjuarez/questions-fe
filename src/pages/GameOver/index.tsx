import { useGameOver } from "@app/hooks/useGameOver"
import { GameOverAdmin } from "./Admin"
import { GameOverUser } from "./User"
import { Helmet } from "react-helmet-async"

export const GameOver = () => {
	const { user } = useGameOver()

	return (
		<>
			<Helmet>
				<title>Game Over | Questions</title>
			</Helmet>

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
		</>
	)
}
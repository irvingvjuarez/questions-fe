import { Button } from "@app/components/Button"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { GameRoomList } from "@app/containers/GameRoomList"
import { LoaderFallback } from "@app/containers/LoaderFallback"
import { useGameRoom } from "@app/hooks/useGameRoom"
import { Fragment } from "react"

export const GameRoom = () => {
	const { user, paramGameCode, currentUsers, startGame } = useGameRoom()

	return (
		<LoaderFallback>
			{user.isUser ? (
				<h2 className="subtitle">
					Waiting the owner to start the game...
				</h2>
			) : (
				<>
					<h2 className="subtitle">
						Share the following code:
					</h2>

					<span className="highlighted">
						{paramGameCode}
					</span>
				</>
			)}

			<article className="border-2 border-white w-[90%] mx-auto h-[60vh] my-3 flex justify-center items-center p-3">
				{currentUsers.length < 1 ? (
					<span>
						This game room is currently empty.
					</span>
				) : (
					<GameRoomList list={currentUsers} />
				)}
			</article>

			<Fragment>
				{!user.isUser && (
					<ButtonsContainer>
						<Button
							variant="active"
							handleClick={startGame}
							disabled={currentUsers.length < 1}
						>
							Start Game!
						</Button>
					</ButtonsContainer>
				)}
			</Fragment>
		</LoaderFallback>
	)
}
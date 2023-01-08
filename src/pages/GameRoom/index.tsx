import { Button } from "@app/components/Button"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { questionsContext } from "@app/contexts/questions.context"
import { API_ROOT, Q_TYPES } from "@app/globals"
import { useErrorValidation } from "@app/hooks/useErrorValidation"
import { Action, Questions, User } from "@app/types"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const GameRoom = () => {
	const validation = useErrorValidation()
	let getUsersInterval: number

	const navigate = useNavigate()
	const { gameCode: contextGameCode, gameUsers = [], user } = useContext(questionsContext) as Questions
	const { gameCode: paramGameCode } = useParams();

	const [currentUsers, setCurrentUsers] = useState<User[]>(gameUsers)

	const fetchUsers = () => {
		const apiTail = user.isUser
			? `/game/${contextGameCode}/users/${user.nickname}`
			: `/game/${contextGameCode}/users`;

		fetch(API_ROOT + apiTail)
			.then(res => res.json())
			.then(data => {
				const newUsers = data.users.map((user: User) => ({
					nickname: user.nickname
				}))


				if (data.gameStarted) {
					navigate(`/game/${contextGameCode}/current/question`)
				}

				setCurrentUsers(newUsers)
			})
	}

	const startGame = () => {
		const fetchConfig = {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST"
		}

		fetch(API_ROOT + `/game/${contextGameCode}/start`, fetchConfig)
			.then(res => res.json())
			.then(data => {
				if (data.game.started) {
					clearInterval(getUsersInterval)
					navigate(`/game/${contextGameCode}/current/question`);
				}
			})
	}

	useEffect(() => {
		validation()
		getUsersInterval = setInterval(fetchUsers, 1000)

		return () => {
			clearInterval(getUsersInterval)
		}
	}, [])

	return (
		<section>
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
					<div className="w-full flex h-[inherit] py-2 space-x-1">
						{currentUsers.map(user => (
							<span
								key={user.nickname}
								className="bg-white text-background-dark font-semibold p-1 rounded-xl h-fit"
							>
								{user.nickname}
							</span>
						))}
					</div>
				)}
			</article>

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
		</section>
	)
}
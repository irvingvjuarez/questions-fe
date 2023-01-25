import { Button } from "@app/components/Button"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { LoaderFallback } from "@app/containers/LoaderFallback"
import { questionsContext } from "@app/contexts/questions.context"
import { API_ROOT, Q_TYPES } from "@app/globals"
import { useErrorValidation } from "@app/hooks/useErrorValidation"
import { useFetch } from "@app/hooks/useFetch"
import { getPostConfig } from "@app/services/getPostConfig"
import { Action, Questions, User } from "@app/types"
import { Fragment, useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const GameRoom = () => {
	const validation = useErrorValidation()
	const setFetch = useFetch()
	let getUsersInterval: number

	const navigate = useNavigate()
	const { gameCode: contextGameCode, gameUsers = [], user, questionsDispatch } = useContext(questionsContext) as Questions
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
		const config = getPostConfig()

		try {
			setFetch({
				endpoint: API_ROOT + `/game/${contextGameCode}/start`,
				config,
				callback: (data) => {
					if (data.game.started) {
						clearInterval(getUsersInterval)
						questionsDispatch({ type: Q_TYPES.removeLoading })

						navigate(`/game/${contextGameCode}/current/question`);
					}
				}
			})
		} catch (err) {
			navigate("/")
		}
	}

	useEffect(() => {
		validation()
		getUsersInterval = setInterval(fetchUsers, 1000)

		return () => {
			clearInterval(getUsersInterval)
		}
	}, [])

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
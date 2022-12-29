import { Button } from "@app/components/Button"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { questionsContext } from "@app/contexts/questions.context"
import { API_ROOT, Q_TYPES } from "@app/globals"
import { Action, Questions, User } from "@app/types"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const GameRoom = () => {
	const navigate = useNavigate()
	const { gameCode: contextGameCode, gameUsers = [], questions, isUser } = useContext(questionsContext) as Questions
	const { gameCode: paramGameCode } = useParams();

	const [currentUsers, setCurrentUsers] = useState<User[]>(gameUsers)

	const fetchUsers = () => {
		fetch(API_ROOT + `/game/${contextGameCode}/users`)
			.then(res => res.json())
			.then(data => {
				const newUsers = data.users.map((user: User) => ({
					nickname: user.nickname
				}))

				setCurrentUsers(newUsers)
			})
	}

	useEffect(() => {
		if (Number(paramGameCode) !== contextGameCode) {
			navigate("/")
		} else {
			const getUsersInterval = setInterval(fetchUsers, 1000)
		}
	}, [])

	return (
		<section>
			{isUser ? (
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

			{!isUser && (
				<ButtonsContainer>
					<Button variant="active">
						Start Game!
					</Button>
				</ButtonsContainer>
			)}
		</section>
	)
}